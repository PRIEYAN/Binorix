# 🚀 Prescription Blockchain Integration - Deployment Guide

## 📋 Overview

This guide will help you deploy the PrescriptionRecords smart contract and configure the complete IPFS + Blockchain integration.

## 🔧 Prerequisites

1. **MetaMask Wallet** with BSC Testnet configured
2. **BNB Testnet Tokens** for deployment and transactions
3. **Lighthouse API Key** (already configured)
4. **Hardhat** or **Remix IDE** for contract deployment

## 📝 Step 1: Environment Configuration

Add these variables to your `.env` file:

```env
# Lighthouse Storage (Already configured)
NEXT_PUBLIC_LIGHTHOUSE_API_KEY=your_lighthouse_api_key_here

# Smart Contract Configuration (Add these)
NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS=your_contract_address_after_deployment
NEXT_PUBLIC_RPC_URL=https://bsc-testnet.publicnode.com
NEXT_PUBLIC_CHAIN_ID=97
```

## 🚀 Step 2: Deploy Smart Contract

### Option A: Using Remix IDE (Recommended for Hackathon)

1. Open [Remix IDE](https://remix.ethereum.org/)
2. Create new file: `PrescriptionRecords.sol`
3. Copy the contract code from `src/blockchain/contracts/PatientRecords.sol`
4. Compile with Solidity version `0.8.17+`
5. Deploy to **BSC Testnet**:
   - Network: BSC Testnet
   - Chain ID: 97
   - RPC URL: `https://bsc-testnet.publicnode.com`
6. Copy the deployed contract address

### Option B: Using Hardhat

1. Install Hardhat:
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
```

2. Initialize Hardhat project:
```bash
npx hardhat init
```

3. Configure `hardhat.config.js`:
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.17",
  networks: {
    bscTestnet: {
      url: "https://bsc-testnet.publicnode.com",
      accounts: [process.env.PRIVATE_KEY], // Add your private key to .env
      chainId: 97,
    }
  }
};
```

4. Deploy:
```bash
npx hardhat run scripts/deploy.js --network bscTestnet
```

## ⚙️ Step 3: Update Environment Variables

After deployment, update your `.env` file:

```env
NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS=0x1234567890123456789012345678901234567890
```

## 🧪 Step 4: Test the Integration

1. **Start your application**:
```bash
npm run dev
```

2. **Create a test prescription**:
   - Go to doctor dashboard
   - Add a patient
   - Create prescription with medicines
   - Sign the prescription
   - Generate PDF

3. **Verify the flow**:
   - ✅ PDF generated locally
   - ✅ Metadata uploaded to IPFS (Lighthouse)
   - ✅ IPFS CID stored on blockchain
   - ✅ Unique prescription ID generated
   - ✅ Transaction recorded on BSC

## 📊 Step 5: Verify on Blockchain

### View on BSC Testnet Explorer:
- Visit: [https://testnet.bscscan.com/](https://testnet.bscscan.com/)
- Search your contract address
- View transactions and events

### Contract Functions Available:
- `createPrescription()` - Store new prescription
- `getPrescription()` - Retrieve prescription data
- `getDoctorPrescriptions()` - Get all doctor's prescriptions
- `getPatientPrescriptions()` - Get all patient's prescriptions
- `isPrescriptionValid()` - Verify prescription exists

## 🔍 Troubleshooting

### Common Issues:

1. **"Contract address not configured"**
   - Ensure `NEXT_PUBLIC_PRESCRIPTION_CONTRACT_ADDRESS` is set in `.env`

2. **"MetaMask not detected"**
   - Install MetaMask extension
   - Connect to BSC Testnet

3. **"Insufficient funds for gas fees"**
   - Get BNB testnet tokens from [BSC Testnet Faucet](https://testnet.binance.org/faucet-smart)

4. **"Transaction failed"**
   - Check gas limit and network connection
   - Verify wallet is connected to correct network

## 🎯 Expected Results

After successful integration:

```
✅ Prescription saved to database and PDF generated successfully!
🌐 Prescription metadata stored on Lighthouse/IPFS!
📄 IPFS Hash: QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
🔗 Prescription recorded on blockchain!
🆔 Blockchain Prescription ID: 0x1234567890...
📋 Transaction: 0xabcdefghij...
```

## 🏆 Success Metrics

- **Decentralized Storage**: ✅ IPFS via Lighthouse
- **Blockchain Verification**: ✅ BSC Smart Contract
- **Unique ID Generation**: ✅ Cryptographically secure
- **Immutable Records**: ✅ Cannot be tampered
- **Doctor/Patient Tracking**: ✅ Wallet-based authentication
- **Cost Effective**: ✅ Low gas fees on BSC

## 🎉 Hackathon Ready!

Your prescription system now features:
- 📱 **Modern UI** with medical theme
- 🔒 **Blockchain Security** with BSC
- 🌐 **Decentralized Storage** with IPFS
- 💰 **Cost Efficient** gas fees
- ⚡ **Fast Transactions** on BSC
- 🎯 **Production Ready** architecture

Perfect for demonstrating a complete Web3 healthcare solution! 🏥✨
