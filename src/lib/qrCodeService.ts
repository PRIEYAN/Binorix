import QRCode from 'qrcode';
import { web3Service } from './web3Service';

export interface QRCodeData {
  prescriptionId: string;
  doctorWallet: string;
  patientWallet: string;
  ipfsCid: string;
  contractAddress: string;
  network: string;
  timestamp: number;
  verificationUrl: string;
}

export interface QRCodeResult {
  success: boolean;
  qrCodeDataUrl?: string;
  qrCodeSvg?: string;
  prescriptionData?: any;
  error?: string;
}

class QRCodeService {
  
  /**
   * Generate QR code from prescription ID
   */
  async generatePrescriptionQR(
    prescriptionId: string,
    format: 'dataURL' | 'svg' = 'dataURL'
  ): Promise<QRCodeResult> {
    try {
      console.log('🔍 Generating QR code for prescription:', prescriptionId);

      // Get prescription details from blockchain and IPFS
      const prescriptionDetails = await web3Service.getPrescriptionForQR(prescriptionId);

      // Create QR code data structure
      const qrData: QRCodeData = {
        prescriptionId: prescriptionDetails.blockchainData.prescriptionId,
        doctorWallet: prescriptionDetails.blockchainData.doctorWallet,
        patientWallet: prescriptionDetails.blockchainData.patientWallet,
        ipfsCid: prescriptionDetails.blockchainData.ipfsCid,
        contractAddress: prescriptionDetails.verificationInfo.contractAddress,
        network: prescriptionDetails.verificationInfo.network,
        timestamp: prescriptionDetails.blockchainData.timestamp,
        verificationUrl: `${window.location.origin}/verify/${prescriptionId}`
      };

      // Convert to JSON string for QR code
      const qrCodeContent = JSON.stringify(qrData, null, 2);

      console.log('📱 QR Code Content:', qrCodeContent);

      let qrCodeResult: string;

      if (format === 'svg') {
        qrCodeResult = await QRCode.toString(qrCodeContent, {
          type: 'svg',
          width: 300,
          margin: 2,
          color: {
            dark: '#2563eb', // Blue color for medical theme
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H' // High error correction for medical data
        });
      } else {
        qrCodeResult = await QRCode.toDataURL(qrCodeContent, {
          width: 300,
          margin: 2,
          color: {
            dark: '#2563eb', // Blue color for medical theme
            light: '#ffffff'
          },
          errorCorrectionLevel: 'H' // High error correction for medical data
        });
      }

      console.log('✅ QR Code generated successfully');

      return {
        success: true,
        qrCodeDataUrl: format === 'dataURL' ? qrCodeResult : undefined,
        qrCodeSvg: format === 'svg' ? qrCodeResult : undefined,
        prescriptionData: prescriptionDetails,
      };

    } catch (error: any) {
      console.error('❌ Failed to generate QR code:', error);
      return {
        success: false,
        error: error.message || 'Failed to generate QR code'
      };
    }
  }

  /**
   * Generate QR code with custom data
   */
  async generateCustomQR(
    data: any,
    options: {
      width?: number;
      format?: 'dataURL' | 'svg';
      color?: { dark: string; light: string };
    } = {}
  ): Promise<string> {
    const {
      width = 300,
      format = 'dataURL',
      color = { dark: '#2563eb', light: '#ffffff' }
    } = options;

    const content = typeof data === 'string' ? data : JSON.stringify(data);

    if (format === 'svg') {
      return await QRCode.toString(content, {
        type: 'svg',
        width,
        margin: 2,
        color,
        errorCorrectionLevel: 'H'
      });
    } else {
      return await QRCode.toDataURL(content, {
        width,
        margin: 2,
        color,
        errorCorrectionLevel: 'H'
      });
    }
  }

  /**
   * Verify QR code data
   */
  async verifyQRData(qrCodeData: string): Promise<{
    isValid: boolean;
    prescriptionData?: any;
    error?: string;
  }> {
    try {
      const parsedData: QRCodeData = JSON.parse(qrCodeData);

      // Validate required fields
      if (!parsedData.prescriptionId || !parsedData.doctorWallet || !parsedData.contractAddress) {
        return {
          isValid: false,
          error: 'Invalid QR code data structure'
        };
      }

      // Verify prescription exists on blockchain
      const prescriptionDetails = await web3Service.getPrescriptionForQR(parsedData.prescriptionId);

      // Cross-verify data
      if (
        prescriptionDetails.blockchainData.doctorWallet !== parsedData.doctorWallet ||
        prescriptionDetails.blockchainData.patientWallet !== parsedData.patientWallet
      ) {
        return {
          isValid: false,
          error: 'QR code data does not match blockchain records'
        };
      }

      return {
        isValid: true,
        prescriptionData: prescriptionDetails
      };

    } catch (error: any) {
      return {
        isValid: false,
        error: error.message || 'Failed to verify QR code'
      };
    }
  }

  /**
   * Create verification URL for prescription
   */
  createVerificationUrl(prescriptionId: string): string {
    return `${window.location.origin}/verify/${prescriptionId}`;
  }

  /**
   * Download QR code as image
   */
  downloadQRCode(dataUrl: string, filename: string = 'prescription-qr.png') {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

// Export singleton instance
export const qrCodeService = new QRCodeService();

export default QRCodeService;
