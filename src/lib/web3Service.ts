import { ethers } from 'ethers';

// Smart Contract ABI for PrescriptionRecords
const PRESCRIPTION_CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "string", "name": "ipfsCid", "type": "string" },
      { "internalType": "address", "name": "doctorWallet", "type": "address" },
      { "internalType": "address", "name": "patientWallet", "type": "address" }
    ],
    "name": "createPrescription",
    "outputs": [{ "internalType": "bytes32", "name": "", "type": "bytes32" }],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes32", "name": "prescriptionId", "type": "bytes32" }],
    "name": "getPrescription",
    "outputs": [
      { "internalType": "string", "name": "ipfsCid", "type": "string" },
      { "internalType": "address", "name": "doctorWallet", "type": "address" },
      { "internalType": "address", "name": "patientWallet", "type": "address" },
      { "internalType": "uint256", "name": "timestamp", "type": "uint256" },
      { "internalType": "bool", "name": "isActive", "type": "bool" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "doctorWallet", "type": "address" }],
    "name": "getDoctorPrescriptions",
    "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "patientWallet", "type": "address" }],
    "name": "getPatientPrescriptions",
    "outputs": [{ "internalType": "bytes32[]", "name": "", "type": "bytes32[]" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getTotalPrescriptions",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "bytes32", "name": "prescriptionId", "type": "bytes32" }],
    "name": "isPrescriptionValid",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "bytes32", "name": "prescriptionId", "type": "bytes32" },
      { "indexed": true, "internalType": "address", "name": "doctorWallet", "type": "address" },
      { "indexed": true, "internalType": "address", "name": "patientWallet", "type": "address" },
      { "indexed": false, "internalType": "string", "name": "ipfsCid", "type": "string" },
      { "indexed": false, "internalType": "uint256", "name": "timestamp", "type": "uint256" }
    ],
    "name": "PrescriptionCreated",
    "type": "event"
  }
];

// Contract configuration
export interface ContractConfig {
  address: string;
  chainId: number;
  rpcUrl: string;
}

export interface PrescriptionBlockchainResult {
  success: boolean;
  prescriptionId?: string;
  transactionHash?: string;
  blockNumber?: number;
  error?: string;
}

export interface PrescriptionData {
  ipfsCid: string;
  doctorWallet: string;
  patientWallet: string;
  timestamp?: number;
  isActive?: boolean;
}

class Web3Service {
  private contract: ethers.Contract | null = null;
  private provider: ethers.Provider | null = null;
  private signer: ethers.Signer | null = null;

  constructor() {
    this.initializeProvider();
  }

  private initializeProvider() {
    try {
      // Initialize with environment variables
      const contractAddress = process.env.NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS;
      const rpcUrl = process.env.NEXT_PUBLIC_RPC_URL || 'https://bsc-testnet.publicnode.com';
      
      if (!contractAddress) {
        console.warn('⚠️ Contract address not configured in environment variables');
        return;
      }

      // Create provider
      this.provider = new ethers.JsonRpcProvider(rpcUrl);
      
      console.log('✅ Web3 provider initialized');
      console.log('Contract Address:', contractAddress);
      console.log('RPC URL:', rpcUrl);
      
    } catch (error) {
      console.error('❌ Failed to initialize Web3 provider:', error);
    }
  }

  /**
   * Initialize contract with wallet connection
   */
  async initializeWithWallet(): Promise<boolean> {
    try {
      if (typeof window === 'undefined' || !window.ethereum) {
        throw new Error('MetaMask not detected');
      }

      // Request wallet connection
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Create Web3 provider from MetaMask
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      
      const contractAddress = process.env.NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS;
      if (!contractAddress) {
        throw new Error('Contract address not configured');
      }

      // Initialize contract with signer
      this.contract = new ethers.Contract(contractAddress, PRESCRIPTION_CONTRACT_ABI, signer);
      this.provider = provider;
      this.signer = signer;

      console.log('✅ Web3 service initialized with wallet');
      console.log('Signer address:', await signer.getAddress());
      
      return true;
    } catch (error: any) {
      console.error('❌ Failed to initialize Web3 with wallet:', error);
      return false;
    }
  }

  /**
   * Store prescription on blockchain after IPFS upload
   */
  async storePrescriptionOnBlockchain(
    ipfsCid: string,
    doctorWallet: string,
    patientWallet: string
  ): Promise<PrescriptionBlockchainResult> {
    try {
      console.log('🔗 Starting blockchain storage process...');
      console.log('IPFS CID:', ipfsCid);
      console.log('Doctor Wallet:', doctorWallet);
      console.log('Patient Wallet:', patientWallet);

      if (!this.contract || !this.signer) {
        const initialized = await this.initializeWithWallet();
        if (!initialized) {
          return { success: false, error: 'Failed to initialize Web3 connection' };
        }
      }

      // Validate inputs
      if (!ipfsCid || !ethers.isAddress(doctorWallet) || !ethers.isAddress(patientWallet)) {
        return { success: false, error: 'Invalid input parameters' };
      }

      // Estimate gas
      console.log('⛽ Estimating gas for transaction...');
      const estimatedGas = await this.contract!.createPrescription.estimateGas(
        ipfsCid,
        doctorWallet,
        patientWallet
      );
      
      console.log('Estimated Gas:', estimatedGas.toString());

      // Execute transaction
      console.log('📝 Creating prescription on blockchain...');
      const transaction = await this.contract!.createPrescription(
        ipfsCid,
        doctorWallet,
        patientWallet,
        {
          gasLimit: estimatedGas * 120n / 100n // Add 20% buffer
        }
      );

      console.log('Transaction sent:', transaction.hash);
      console.log('⏳ Waiting for confirmation...');

      // Wait for transaction confirmation
      const receipt = await transaction.wait();
      
      if (!receipt) {
        return { success: false, error: 'Transaction failed to confirm' };
      }

      console.log('✅ Transaction confirmed!');
      console.log('Block Number:', receipt.blockNumber);
      console.log('Gas Used:', receipt.gasUsed.toString());

      // Extract prescription ID from transaction logs
      let prescriptionId = '';
      for (const log of receipt.logs) {
        try {
          const parsedLog = this.contract!.interface.parseLog({
            topics: log.topics,
            data: log.data
          });
          
          if (parsedLog && parsedLog.name === 'PrescriptionCreated') {
            prescriptionId = parsedLog.args.prescriptionId;
            console.log('🆔 Generated Prescription ID:', prescriptionId);
            break;
          }
        } catch (parseError) {
          // Skip non-matching logs
          continue;
        }
      }

      return {
        success: true,
        prescriptionId: prescriptionId,
        transactionHash: receipt.hash,
        blockNumber: receipt.blockNumber
      };

    } catch (error: any) {
      console.error('❌ Blockchain storage failed:', error);
      
      // Parse common error messages
      let errorMessage = error.message || 'Unknown blockchain error';
      if (error.code === 'INSUFFICIENT_FUNDS') {
        errorMessage = 'Insufficient funds for gas fees';
      } else if (error.code === 'USER_REJECTED') {
        errorMessage = 'Transaction rejected by user';
      } else if (error.message.includes('revert')) {
        errorMessage = 'Smart contract execution failed';
      }

      return { success: false, error: errorMessage };
    }
  }

  /**
   * Retrieve prescription data from blockchain
   */
  async getPrescriptionFromBlockchain(prescriptionId: string): Promise<PrescriptionData | null> {
    try {
      if (!this.contract) {
        await this.initializeWithWallet();
      }

      const result = await this.contract!.getPrescription(prescriptionId);
      
      return {
        ipfsCid: result.ipfsCid,
        doctorWallet: result.doctorWallet,
        patientWallet: result.patientWallet,
        timestamp: Number(result.timestamp),
        isActive: result.isActive
      };
    } catch (error) {
      console.error('❌ Failed to retrieve prescription from blockchain:', error);
      return null;
    }
  }

  /**
   * Get all prescriptions for a doctor
   */
  async getDoctorPrescriptions(doctorWallet: string): Promise<string[]> {
    try {
      if (!this.contract) {
        await this.initializeWithWallet();
      }

      const prescriptionIds = await this.contract!.getDoctorPrescriptions(doctorWallet);
      return prescriptionIds.map((id: any) => id.toString());
    } catch (error) {
      console.error('❌ Failed to get doctor prescriptions:', error);
      return [];
    }
  }

  /**
   * Get all prescriptions for a patient
   */
  async getPatientPrescriptions(patientWallet: string): Promise<string[]> {
    try {
      if (!this.contract) {
        await this.initializeWithWallet();
      }

      const prescriptionIds = await this.contract!.getPatientPrescriptions(patientWallet);
      return prescriptionIds.map((id: any) => id.toString());
    } catch (error) {
      console.error('❌ Failed to get patient prescriptions:', error);
      return [];
    }
  }

  /**
   * Verify if prescription exists and is valid
   */
  async verifyPrescription(prescriptionId: string): Promise<boolean> {
    try {
      if (!this.contract) {
        await this.initializeWithWallet();
      }

      return await this.contract!.isPrescriptionValid(prescriptionId);
    } catch (error) {
      console.error('❌ Failed to verify prescription:', error);
      return false;
    }
  }

  /**
   * Get total number of prescriptions on blockchain
   */
  async getTotalPrescriptions(): Promise<number> {
    try {
      if (!this.contract) {
        await this.initializeWithWallet();
      }

      const total = await this.contract!.getTotalPrescriptions();
      return Number(total);
    } catch (error) {
      console.error('❌ Failed to get total prescriptions:', error);
      return 0;
    }
  }
}

// Export singleton instance
export const web3Service = new Web3Service();

// Export types and service
export default Web3Service;
