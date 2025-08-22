import lighthouse from "@lighthouse-web3/sdk";
import { getAccount, getWalletClient } from "@wagmi/core";
import { config } from "@/lib/wagmiConfig";

export async function uploadPDFWithWallet(pdfBlob: Blob) {
  const account = getAccount(config);
  if (!account.address) throw new Error("Wallet not connected");

  const walletClient = await getWalletClient(config);
  if (!walletClient) throw new Error("Wallet client not found");

  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;
  if (!apiKey) throw new Error("Missing Lighthouse API key");

  // 1. Get Lighthouse auth message
  const { data: { message } } = await lighthouse.getAuthMessage(account.address);
  if (!message) throw new Error("Failed to get auth message");

  // 2. Sign message
  const signedMessage = await walletClient.signMessage({ message });

  // 3. Prepare file
  const file = new File([pdfBlob], "prescription.pdf", { type: "application/pdf" });

  // 4. Upload encrypted file
  const output = await lighthouse.uploadEncrypted(
    file,
    apiKey,
    account.address,
    signedMessage
  );
  
  // Since it's an array, take the first element
  const fileHash = output.data[0].Hash;
  
  console.log("✅ Uploaded to IPFS:", fileHash);
  console.log("🌐 Gateway URL:", `https://gateway.lighthouse.storage/ipfs/${fileHash}`);
  
  return fileHash;
}
