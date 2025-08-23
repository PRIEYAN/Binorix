import lighthouse from '@lighthouse-web3/sdk';

export interface LighthouseCredentials {
  apiKey: string;
}

export interface UploadResult {
  success: boolean;
  hash?: string;
  url?: string;
  error?: string;
}

class LighthouseStorageService {
  private apiKey: string | null = null;

  async initialize(apiKey: string): Promise<boolean> {
    try {
      this.apiKey = apiKey;
      console.log('✅ Lighthouse Storage initialized successfully');
      return true;
    } catch (error: any) {
      console.error('❌ Failed to initialize Lighthouse Storage:', error);
      return false;
    }
  }

  async uploadFile(fileBlob: Blob, fileName: string): Promise<UploadResult> {
    if (!this.apiKey) {
      return {
        success: false,
        error: 'Lighthouse API key not initialized'
      };
    }

    try {
      console.log('📄 Uploading file to Lighthouse/IPFS...');
      console.log('File name:', fileName);
      console.log('File size:', fileBlob.size, 'bytes');

      // Convert blob to file for lighthouse upload
      const file = new File([fileBlob], fileName, { type: fileBlob.type });

      // Upload to Lighthouse
      const uploadResponse = await lighthouse.upload([file], this.apiKey);
      
      if (uploadResponse?.data?.Hash) {
        const ipfsHash = uploadResponse.data.Hash;
        const ipfsUrl = `https://gateway.lighthouse.storage/ipfs/${ipfsHash}`;
        
        console.log('✅ File uploaded successfully to Lighthouse/IPFS!');
        console.log('IPFS Hash:', ipfsHash);
        console.log('IPFS URL:', ipfsUrl);

        return {
          success: true,
          hash: ipfsHash,
          url: ipfsUrl
        };
      } else {
        return {
          success: false,
          error: 'Upload failed - no hash returned'
        };
      }
    } catch (error: any) {
      console.error('❌ Error uploading to Lighthouse/IPFS:', error);
      return {
        success: false,
        error: error.message || 'Upload failed'
      };
    }
  }
}

export const lighthouseStorage = new LighthouseStorageService();

export const uploadPrescriptionMetadata = async (
  metadata: any,
  prescriptionId: string,
  apiKey: string
): Promise<UploadResult> => {
  try {
    console.log('🌐 Starting Lighthouse/IPFS metadata upload...');
    console.log('📄 Prescription ID:', prescriptionId);
    console.log('👤 Patient:', metadata.patient?.name);
    console.log('💊 Medicines:', metadata.prescriptions?.length || 0);
    
    // Initialize lighthouse storage
    const initialized = await lighthouseStorage.initialize(apiKey);
    if (!initialized) {
      return {
        success: false,
        error: 'Failed to initialize Lighthouse Storage'
      };
    }

    // Convert metadata to JSON blob
    const jsonString = JSON.stringify(metadata, null, 2);
    const jsonBlob = new Blob([jsonString], { type: 'application/json' });
    const fileName = `Prescription_${prescriptionId}_metadata.json`;
    
    console.log('📊 Metadata size:', jsonBlob.size, 'bytes');
    console.log('📄 File name:', fileName);

    // Upload to Lighthouse/IPFS
    const result = await lighthouseStorage.uploadFile(jsonBlob, fileName);

    if (result.success) {
      console.log('✅ Metadata uploaded successfully to Lighthouse/IPFS!');
      console.log('📄 IPFS Hash:', result.hash);
      console.log('🌐 IPFS URL:', result.url);
    } else {
      console.error('❌ Metadata upload failed:', result.error);
    }

    return result;
  } catch (error: any) {
    console.error('❌ Error uploading metadata to Lighthouse/IPFS:', error);
    return {
      success: false,
      error: error.message || 'Metadata upload failed'
    };
  }
};
