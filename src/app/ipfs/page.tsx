import { useSigner, useAccount } from 'wagmi';
import { ethers } from 'ethers';
import { ipfsClient } from '@/lib/ipfsClient';

const CONTRACT_ABI = [
  "function addRecord(string ipfsCid) external returns (bytes32)",
  "event RecordAdded(address indexed signer, bytes32 indexed prescriptionId, string cid, uint256 timestamp)"
];
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!;

export default function SignAndStore({ patient, prescriptions, advice }) {
  const { data: signer } = useSigner();
  const { address, isConnected } = useAccount();

  const handle = async () => {
    if (!signer) throw new Error("Connect wallet");

    // build payload
    const payload = { patient, prescriptions, advice, createdAt: new Date().toISOString() };

    // 1) upload to IPFS
    const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
    const file = new File([blob], `prescription-${Date.now()}.json`);
    const addResult = await ipfsClient.add(file);
    const cid = addResult.cid.toString();

    // 2) call contract
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
    const tx = await contract.addRecord(cid);
    const receipt = await tx.wait();

    // extract emitted prescriptionId from event (RecordAdded)
    const event = receipt.events?.find(e => e.event === "RecordAdded");
    const prescriptionId = event?.args ? event.args[1] : null; // bytes32
    console.log("CID:", cid, "prescriptionId:", prescriptionId);
  };

  return (
    <div>
      {/* connect button (RainbowKit) elsewhere */}
      <button disabled={!isConnected} onClick={handle}>Upload & Store on Avalanche</button>
    </div>
  );
}
