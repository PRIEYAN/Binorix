"use client";
import React, { useState, useEffect } from 'react';
import { qrCodeService } from '@/lib/qrCodeService';
import { Download, Eye, Loader2, CheckCircle, XCircle } from 'lucide-react';

interface PrescriptionQRCodeProps {
  prescriptionId: string;
  onQRGenerated?: (qrData: any) => void;
  showDetails?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const PrescriptionQRCode: React.FC<PrescriptionQRCodeProps> = ({
  prescriptionId,
  onQRGenerated,
  showDetails = true,
  size = 'medium'
}) => {
  const [qrCodeData, setQrCodeData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [showPrescriptionDetails, setShowPrescriptionDetails] = useState(false);

  const sizeClasses = {
    small: 'w-32 h-32',
    medium: 'w-48 h-48',
    large: 'w-64 h-64'
  };

  useEffect(() => {
    if (prescriptionId) {
      generateQRCode();
    }
  }, [prescriptionId]);

  const generateQRCode = async () => {
    setLoading(true);
    setError('');

    try {
      console.log('🔍 Generating QR code for prescription:', prescriptionId);
      
      const result = await qrCodeService.generatePrescriptionQR(prescriptionId, 'dataURL');
      
      if (result.success) {
        setQrCodeData(result);
        onQRGenerated?.(result);
        console.log('✅ QR code generated successfully');
      } else {
        setError(result.error || 'Failed to generate QR code');
      }
    } catch (err: any) {
      console.error('❌ QR code generation error:', err);
      setError(err.message || 'Failed to generate QR code');
    } finally {
      setLoading(false);
    }
  };

  const downloadQRCode = () => {
    if (qrCodeData?.qrCodeDataUrl) {
      qrCodeService.downloadQRCode(
        qrCodeData.qrCodeDataUrl,
        `prescription-${prescriptionId.slice(-6)}-qr.png`
      );
    }
  };

  const copyVerificationUrl = async () => {
    const url = qrCodeService.createVerificationUrl(prescriptionId);
    try {
      await navigator.clipboard.writeText(url);
      alert('Verification URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy URL:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-blue-50 rounded-xl border border-blue-200">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600 mb-4" />
        <p className="text-blue-700 font-medium">Generating QR Code...</p>
        <p className="text-blue-600 text-sm">Fetching blockchain data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-red-50 rounded-xl border border-red-200">
        <XCircle className="w-8 h-8 text-red-600 mb-4" />
        <p className="text-red-700 font-medium">QR Generation Failed</p>
        <p className="text-red-600 text-sm mb-4">{error}</p>
        <button
          onClick={generateQRCode}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!qrCodeData) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-gray-50 rounded-xl border border-gray-200">
        <p className="text-gray-600">No QR code data available</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <h3 className="text-lg font-semibold text-gray-800">Prescription QR Code</h3>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            Blockchain Verified
          </span>
        </div>
      </div>

      {/* QR Code Display */}
      <div className="flex flex-col items-center mb-6">
        <div className={`${sizeClasses[size]} bg-white p-4 rounded-lg border-2 border-blue-200 shadow-sm`}>
          {qrCodeData.qrCodeDataUrl && (
            <img
              src={qrCodeData.qrCodeDataUrl}
              alt="Prescription QR Code"
              className="w-full h-full object-contain"
            />
          )}
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600 mb-2">
            Scan to verify prescription on blockchain
          </p>
          <p className="text-xs text-gray-500 font-mono">
            ID: {prescriptionId.slice(0, 8)}...{prescriptionId.slice(-8)}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        <button
          onClick={downloadQRCode}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Download size={16} />
          Download QR
        </button>
        
        <button
          onClick={copyVerificationUrl}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Eye size={16} />
          Copy Verify URL
        </button>
        
        {showDetails && (
          <button
            onClick={() => setShowPrescriptionDetails(!showPrescriptionDetails)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Eye size={16} />
            {showPrescriptionDetails ? 'Hide' : 'Show'} Details
          </button>
        )}
      </div>

      {/* Prescription Details */}
      {showPrescriptionDetails && qrCodeData.prescriptionData && (
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          <h4 className="font-semibold text-gray-800 border-b pb-2">Blockchain Data</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Doctor Wallet:</span>
              <p className="font-mono text-blue-600 break-all">
                {qrCodeData.prescriptionData.blockchainData.doctorWallet}
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Patient Wallet:</span>
              <p className="font-mono text-green-600 break-all">
                {qrCodeData.prescriptionData.blockchainData.patientWallet}
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">IPFS Hash:</span>
              <p className="font-mono text-purple-600 break-all">
                {qrCodeData.prescriptionData.blockchainData.ipfsCid}
              </p>
            </div>
            
            <div>
              <span className="font-medium text-gray-700">Timestamp:</span>
              <p className="text-gray-600">
                {new Date(qrCodeData.prescriptionData.blockchainData.timestamp * 1000).toLocaleString()}
              </p>
            </div>
          </div>

          <div className="pt-2 border-t">
            <span className="font-medium text-gray-700">Contract Address:</span>
            <p className="font-mono text-indigo-600 break-all">
              {qrCodeData.prescriptionData.verificationInfo.contractAddress}
            </p>
          </div>

          <div className="flex gap-2">
            <a
              href={qrCodeData.prescriptionData.verificationInfo.explorerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 text-sm underline"
            >
              View on BSC Explorer
            </a>
            <a
              href={qrCodeData.prescriptionData.verificationInfo.ipfsGateway}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-purple-800 text-sm underline"
            >
              View on IPFS
            </a>
          </div>
        </div>
      )}

      {/* Verification Instructions */}
      <div className="bg-blue-50 rounded-lg p-4 mt-4">
        <h4 className="font-semibold text-blue-800 mb-2">🔍 How to Verify</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Scan QR code with any QR reader</li>
          <li>• Check doctor and patient wallet addresses</li>
          <li>• Verify on BSC Testnet blockchain</li>
          <li>• Access prescription metadata on IPFS</li>
        </ul>
      </div>
    </div>
  );
};

export default PrescriptionQRCode;
