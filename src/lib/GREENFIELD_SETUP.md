# BNB Greenfield PDF Storage Setup

This guide explains how to set up BNB Greenfield testnet for storing prescription PDFs on the blockchain.

## 🌐 What is BNB Greenfield?

BNB Greenfield is a decentralized storage network that allows you to store files on the blockchain with high availability and security. Perfect for storing medical prescriptions permanently.

## 📋 Prerequisites

1. **BNB Greenfield Testnet Account**
2. **Testnet BNB tokens** (for gas fees)
3. **Private key and wallet address**

## 🚀 Setup Steps

### Step 1: Create Greenfield Account

1. Go to [BNB Greenfield](https://greenfield.bnbchain.org/)
2. Connect your wallet (MetaMask recommended)
3. Switch to **Testnet** network
4. Create or import a wallet

### Step 2: Get Testnet BNB

1. Go to [BNB Testnet Faucet](https://testnet.bnbchain.org/faucet-smart)
2. Enter your wallet address
3. Request testnet BNB tokens
4. Wait for confirmation

### Step 3: Get Your Credentials

1. **Private Key**: Export from your wallet (64 characters, no 0x prefix)
2. **Address**: Your wallet address (starts with 0x)
3. **Bucket Name**: Choose a unique name (e.g., `binorix-prescriptions-yourname`)

### Step 4: Configure Application

Create a file `src/lib/greenfieldConfig.ts`:

```typescript
export const GREENFIELD_CREDENTIALS = {
  privateKey: 'your_64_character_private_key_without_0x',
  address: '0xYourWalletAddress',
  bucketName: 'your-unique-bucket-name'
};
```

### Step 5: Update Environment (Alternative)

Or use environment variables in `.env.local`:

```env
NEXT_PUBLIC_GREENFIELD_PRIVATE_KEY=your_private_key
NEXT_PUBLIC_GREENFIELD_ADDRESS=0xYourAddress
NEXT_PUBLIC_GREENFIELD_BUCKET=your-bucket-name
```

## 🔧 How It Works

1. **PDF Generation**: When doctor generates prescription PDF
2. **Local Save**: PDF saved to user's device
3. **Blockchain Upload**: PDF uploaded to BNB Greenfield
4. **Permanent Storage**: PDF stored permanently on blockchain
5. **Access URL**: Get permanent URL to access PDF

## 💰 Costs

- **Testnet**: Free (using testnet BNB)
- **Mainnet**: Small BNB fees for storage and transactions
- **Storage**: ~$0.001-0.01 per PDF (varies by size)

## 🔒 Security Features

- **Decentralized**: No single point of failure
- **Immutable**: PDFs cannot be altered once stored
- **Access Control**: Private buckets, only authorized access
- **Blockchain Verified**: All transactions on BNB Chain

## 📁 File Organization

PDFs are stored with this structure:
```
prescriptions/
├── John_Doe/
│   ├── RX123456_2024-01-15T10-30-00.pdf
│   └── RX789012_2024-01-16T14-20-00.pdf
└── Jane_Smith/
    └── RX345678_2024-01-15T09-15-00.pdf
```

## 🐛 Troubleshooting

### "Insufficient Balance" Error
- Get more testnet BNB from faucet
- Check your wallet balance

### "Bucket Creation Failed"
- Choose a different bucket name
- Ensure you have enough BNB for gas

### "Upload Failed"
- Check internet connection
- Verify credentials are correct
- Try again with smaller PDF

## 📞 Support

- [BNB Greenfield Docs](https://docs.bnbchain.org/greenfield-docs/)
- [BNB Greenfield GitHub](https://github.com/bnb-chain/greenfield-js-sdk)
- [Discord Community](https://discord.gg/bnbchain)

## 🔄 Fallback Behavior

If Greenfield is not configured:
- ✅ PDF still generates and downloads locally
- ⚠️ No blockchain storage
- 📝 Warning message shown to user
