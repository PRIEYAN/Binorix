import { Client, VisibilityType, RedundancyType, Long } from '@bnb-chain/greenfield-js-sdk';

const GREENFIELD_CONFIG = {
  endpoint: 'https://gnfd-testnet-sp1.bnbchain.org',
  chainId: 5600,
  rpcUrl: 'https://gnfd-testnet-fullnode-tendermint-us.bnbchain.org',
};

export interface GreenfieldCredentials {
  // Private key of the account (64 character hex string without 0x prefix)
  privateKey: string;
  // Account address (starts with 0x)
  address: string;
  // Bucket name where PDFs will be stored
  bucketName: string;
}

// Interface for upload result
export interface UploadResult {
  success: boolean;
  objectName?: string;
  txHash?: string;
  url?: string;
  error?: string;
}

class GreenfieldStorageService {
  private client: Client | null = null;
  private credentials: GreenfieldCredentials | null = null;

  /**
   * Initialize the Greenfield client with credentials
   */
  async initialize(credentials: GreenfieldCredentials): Promise<boolean> {
    try {
      this.credentials = credentials;
      
      // Create client instance
      this.client = Client.create(
        GREENFIELD_CONFIG.endpoint,
        String(GREENFIELD_CONFIG.chainId)
      );

      // Set account using private key - correct method for this SDK version
      const privateKeyWithPrefix = credentials.privateKey.startsWith('0x') 
        ? credentials.privateKey 
        : `0x${credentials.privateKey}`;
      
      // Use the correct method to set the account
      this.client.account.privateKey = privateKeyWithPrefix;
      
      console.log('✅ Greenfield client initialized successfully');
      console.log('Account address:', credentials.address);
      
      return true;
    } catch (error) {
      console.error('❌ Failed to initialize Greenfield client:', error);
      return false;
    }
  }

  /**
   * Create bucket if it doesn't exist
   */
  async createBucketIfNotExists(): Promise<boolean> {
    if (!this.client || !this.credentials) {
      throw new Error('Client not initialized');
    }

    try {
      // Check if bucket exists
      const bucketInfo = await this.client.bucket.headBucket(this.credentials.bucketName);
      console.log('✅ Bucket already exists:', this.credentials.bucketName);
      return true;
    } catch (error: any) {
      // If bucket doesn't exist, create it
      if (error.message?.includes('NoSuchBucket') || error.status === 404) {
        try {
          console.log('📦 Creating new bucket:', this.credentials.bucketName);
          
          const createBucketTx = await this.client.bucket.createBucket({
            bucketName: this.credentials.bucketName,
            creator: this.credentials.address,
            visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
            chargedReadQuota: Long.fromString('1000000'),
            paymentAddress: this.credentials.address,
          });

          // Broadcast the transaction
          const txRes = await createBucketTx.broadcast({
            denom: 'BNB',
            gasLimit: Number(210000),
            gasPrice: '5000000000',
            payer: this.credentials.address,
            granter: '',
          });

          if (txRes.code === 0) {
            console.log('✅ Bucket created successfully');
            console.log('Transaction hash:', txRes.transactionHash);
            return true;
          } else {
            console.error('❌ Failed to create bucket:', txRes.rawLog);
            return false;
          }
        } catch (createError) {
          console.error('❌ Error creating bucket:', createError);
          return false;
        }
      } else {
        console.error('❌ Error checking bucket:', error);
        return false;
      }
    }
  }

  /**
   * Upload PDF to Greenfield
   */
  async uploadPDF(
    pdfBlob: Blob,
    fileName: string,
    patientName: string,
    prescriptionId: string
  ): Promise<UploadResult> {
    if (!this.client || !this.credentials) {
      return {
        success: false,
        error: 'Client not initialized'
      };
    }

    try {
      // Ensure bucket exists
      const bucketReady = await this.createBucketIfNotExists();
      if (!bucketReady) {
        return {
          success: false,
          error: 'Failed to create or access bucket'
        };
      }

      // Generate unique object name
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const objectName = `prescriptions/${patientName.replace(/\s+/g, '_')}/${prescriptionId}_${timestamp}.pdf`;

      console.log('📄 Uploading PDF to Greenfield...');
      console.log('Object name:', objectName);
      console.log('File size:', pdfBlob.size, 'bytes');

      // Convert blob to file
      const file = new File([pdfBlob], fileName, { type: 'application/pdf' });

      // Create object
      const createObjectTx = await this.client.object.createObject({
        bucketName: this.credentials.bucketName,
        objectName: objectName,
        creator: this.credentials.address,
        visibility: VisibilityType.VISIBILITY_TYPE_PRIVATE,
        fileType: 'application/pdf',
        redundancyType: RedundancyType.REDUNDANCY_EC_TYPE,
        contentLength: pdfBlob.size,
      });

      // Broadcast create object transaction
      const createObjectTxRes = await createObjectTx.broadcast({
        denom: 'BNB',
        gasLimit: Number(210000),
        gasPrice: '5000000000',
        payer: this.credentials.address,
        granter: '',
      });

      if (createObjectTxRes.code !== 0) {
        return {
          success: false,
          error: `Failed to create object: ${createObjectTxRes.rawLog}`
        };
      }

      console.log('✅ Object created, transaction hash:', createObjectTxRes.transactionHash);

      // Upload the file content
      const uploadRes = await this.client.object.uploadObject(
        {
          bucketName: this.credentials.bucketName,
          objectName: objectName,
          body: file,
        },
        {
          txnHash: createObjectTxRes.transactionHash,
        }
      );

      if (uploadRes.code === 0) {
        const downloadUrl = `${GREENFIELD_CONFIG.endpoint}/${this.credentials.bucketName}/${objectName}`;
        
        console.log('✅ PDF uploaded successfully to Greenfield!');
        console.log('Download URL:', downloadUrl);

        return {
          success: true,
          objectName: objectName,
          txHash: createObjectTxRes.transactionHash,
          url: downloadUrl
        };
      } else {
        return {
          success: false,
          error: `Upload failed: ${uploadRes.message}`
        };
      }

    } catch (error: any) {
      console.error('❌ Error uploading to Greenfield:', error);
      return {
        success: false,
        error: error.message || 'Unknown upload error'
      };
    }
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<string> {
    if (!this.client || !this.credentials) {
      throw new Error('Client not initialized');
    }

    try {
      const balance = await this.client.account.getAccountBalance({
        address: this.credentials.address,
        denom: 'BNB',
      });
      return balance.balance?.amount || '0';
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  }

  /**
   * List objects in bucket
   */
  async listPrescriptions(): Promise<string[]> {
    if (!this.client || !this.credentials) {
      throw new Error('Client not initialized');
    }

    try {
      const objects = await this.client.object.listObjects({
        bucketName: this.credentials.bucketName,
      });

      return objects.body?.GfSpListObjectsByBucketNameResponse?.Objects?.map(
        (obj: any) => obj.ObjectInfo?.ObjectName
      ).filter(Boolean) || [];
    } catch (error) {
      console.error('Error listing objects:', error);
      return [];
    }
  }
}

// Export singleton instance
export const greenfieldStorage = new GreenfieldStorageService();

// Helper function to convert jsPDF to blob
export const pdfToBlob = (pdf: any): Blob => {
  const pdfOutput = pdf.output('blob');
  return pdfOutput;
};

// Example usage function
export const uploadPrescriptionPDF = async (
  pdf: any,
  patientName: string,
  prescriptionId: string,
  credentials: GreenfieldCredentials
): Promise<UploadResult> => {
  try {
    // Initialize client
    const initialized = await greenfieldStorage.initialize(credentials);
    if (!initialized) {
      return {
        success: false,
        error: 'Failed to initialize Greenfield client'
      };
    }

    // Convert PDF to blob
    const pdfBlob = pdfToBlob(pdf);
    const fileName = `Prescription_${patientName.replace(/\s+/g, '_')}_${prescriptionId}.pdf`;

    // Upload to Greenfield
    const result = await greenfieldStorage.uploadPDF(
      pdfBlob,
      fileName,
      patientName,
      prescriptionId
    );

    return result;
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Upload failed'
    };
  }
};
