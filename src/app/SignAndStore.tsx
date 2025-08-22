'use client';

import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useWalletClient, useSignMessage } from 'wagmi';
import { ethers } from 'ethers';
import { create } from 'ipfs-http-client';

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;
const CONTRACT_ABI = [
  "function addRecord(string ipfsCid) external returns (bytes32)",
  "event RecordAdded(address indexed signer, bytes32 indexed prescriptionId, string cid, uint256 timestamp)"
];

// Initialize IPFS client — customize your Infura or public gateway URL
const ipfsClient = create({ url: 'https://ipfs.infura.io:5001/api/v0' });

type PrescriptionItem = {
  name: string;
  quantity?: string;
  shift?: string;
  intake?: number;
};

export default function SignAndStore({
  patient,
  prescriptions,
  advice,
  onStored,
}: {
  patient: { name?: string; phone?: string; email?: string; dob?: string; otherDetails?: string };
  prescriptions: PrescriptionItem[];
  advice?: string;
  onStored?: (info: { cid: string; txHash: string; prescriptionId: string }) => void;
}) {
  const { address, isConnected } = useAccount();
  const { data: signer } = useWalletClient();
  const { signMessageAsync } = useSignMessage();
  const [loading, setLoading] = useState(false);
  const [cid, setCid] = useState<string | null>(null);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [prescriptionId, setPrescriptionId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSignAndStore = async () => {
    setError(null);
    setCid(null);
    setTxHash(null);
    setPrescriptionId(null);

    if (!prescriptions?.length) {
      setError('Add at least one medicine.');
      return;
    }
    if (!isConnected || !signer) {
      setError('Connect wallet first.');
      return;
    }

    try {
      setLoading(true);

      // Canonical payload for signing & storage
      const basePayload = {
        patient,
        prescriptions,
        advice: advice ?? '',
        createdAt: new Date().toISOString(),
        app: 'YourAppName',
      };

      const message = `I authorize storing this prescription on IPFS:\n\n${JSON.stringify(basePayload, null, 2)}`;
      const signature = await signMessageAsync({ message });

      const finalPayload = { ...basePayload, wallet: address ?? null, signature };

      // Upload JSON to IPFS
      const blob = new Blob([JSON.stringify(finalPayload)], { type: 'application/json' });
      const file = new File([blob], `prescription-${Date.now()}.json`);
      const addResult = await ipfsClient.add(file);
      const ipfsCid = addResult.cid.toString();
      setCid(ipfsCid);

      // Interact with contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const tx = await contract.addRecord(ipfsCid);
      const receipt = await tx.wait();
      setTxHash(receipt.transactionHash);

      // Extract prescriptionId from event args safely
      const event = receipt.events?.find(e => e.event === 'RecordAdded');
      let pIdHex = null;
      if (event?.args && event.args.length >= 2) {
        const pId = event.args[1];
        // ethers.utils.hexlify handles bytes32 correctly
        pIdHex = ethers.utils.hexlify(pId);
      }
      setPrescriptionId(pIdHex);

      onStored?.({ cid: ipfsCid, txHash: receipt.transactionHash, prescriptionId: pIdHex ?? '' });
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Failed to sign/upload/store');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <div className="flex items-center gap-4">
        <ConnectButton />
        {isConnected && (
          <button
            onClick={handleSignAndStore}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? 'Signing / Uploading / Tx...' : 'Sign & Store (IPFS → Avalanche)'}
          </button>
        )}
      </div>

      {cid && (
        <p className="mt-2">
          CID:{' '}
          <a
            className="text-blue-600 underline"
            href={`https://ipfs.io/ipfs/${cid}`}
            target="_blank"
            rel="noreferrer"
          >
            {cid}
          </a>
        </p>
      )}
      {prescriptionId && (
        <p className="mt-1">
          Prescription ID (bytes32): <code>{prescriptionId}</code>
        </p>
      )}
      {txHash && (
        <p className="mt-1">
          Tx:{' '}
          <a
            className="text-blue-600 underline"
            href={`https://testnet.snowtrace.io/tx/${txHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {txHash}
          </a>
        </p>
      )}
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
}
