"use client";
import React, { useState } from 'react';
import { testGreenfieldConnection } from '@/lib/testGreenfieldConnection';

export default function TestGreenfieldPage() {
  const [testing, setTesting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const runTest = async () => {
    setTesting(true);
    setResult(null);
    
    try {
      const testResult = await testGreenfieldConnection();
      setResult(testResult);
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            🌐 BNB Greenfield Connection Test
          </h1>
          
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Testing Credentials:</h2>
            <div className="bg-gray-100 p-4 rounded-lg font-mono text-sm">
              <p><strong>Address:</strong> 0x2635F0349bad76C98eBF7A7feB9515802D80F7ED</p>
              <p><strong>Bucket:</strong> prescriptions-details</p>
              <p><strong>Private Key:</strong> 7b5bb4fc...ccfb (hidden for security)</p>
            </div>
          </div>

          <button
            onClick={runTest}
            disabled={testing}
            className={`px-6 py-3 rounded-lg font-semibold text-white transition-all ${
              testing 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-blue-600 hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {testing ? (
              <>
                <span className="animate-spin inline-block mr-2">⏳</span>
                Testing Connection...
              </>
            ) : (
              '🧪 Test Greenfield Connection'
            )}
          </button>

          {result && (
            <div className={`mt-6 p-4 rounded-lg ${
              result.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">
                  {result.success ? '✅' : '❌'}
                </span>
                <h3 className={`text-lg font-semibold ${
                  result.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {result.success ? 'Connection Successful!' : 'Connection Failed'}
                </h3>
              </div>
              
              <p className={`${
                result.success ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message || result.error}
              </p>

              {result.success && (
                <div className="mt-4 p-3 bg-green-100 rounded">
                  <p className="text-green-800 font-medium">
                    🎉 Your Greenfield credentials are working correctly!
                  </p>
                  <p className="text-green-700 text-sm mt-1">
                    PDFs will now be automatically uploaded to BNB Greenfield when prescriptions are generated.
                  </p>
                </div>
              )}

              {!result.success && (
                <div className="mt-4 p-3 bg-red-100 rounded">
                  <p className="text-red-800 font-medium">Troubleshooting Tips:</p>
                  <ul className="text-red-700 text-sm mt-2 list-disc list-inside">
                    <li>Check if you have testnet BNB tokens</li>
                    <li>Verify your private key is correct (64 characters)</li>
                    <li>Ensure your address matches the private key</li>
                    <li>Try a different bucket name</li>
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">📋 Check Browser Console</h3>
            <p className="text-blue-700 text-sm">
              Open browser developer tools (F12) and check the Console tab for detailed test results and logs.
            </p>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
            <h3 className="font-semibold text-yellow-800 mb-2">💰 Need Testnet BNB?</h3>
            <p className="text-yellow-700 text-sm mb-2">
              If the test shows 0 BNB balance, get free testnet tokens:
            </p>
            <a 
              href="https://testnet.bnbchain.org/faucet-smart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
            >
              🚰 Get Testnet BNB
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
