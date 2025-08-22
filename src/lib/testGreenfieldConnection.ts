import { simpleGreenfieldStorage, GreenfieldCredentials } from './greenfieldStorage.simple';

// Test credentials from your config
const TEST_CREDENTIALS: GreenfieldCredentials = {
  privateKey: '7b5bb4fc46f61fb15fbb9a077e57a8f4820ab827c42ec387068c2b7acef3ccfb',
  address: '0x2635F0349bad76C98eBF7A7feB9515802D80F7ED',
  bucketName: 'prescriptions-details'
};

export async function testGreenfieldConnection() {
  console.log('🧪 Testing BNB Greenfield Connection...');
  console.log('📋 Credentials:');
  console.log('  - Address:', TEST_CREDENTIALS.address);
  console.log('  - Bucket:', TEST_CREDENTIALS.bucketName);
  console.log('  - Private Key:', TEST_CREDENTIALS.privateKey.substring(0, 8) + '...');

  try {
    // Test 1: Initialize and validate credentials
    console.log('\n1️⃣ Testing credential validation...');
    const initialized = await simpleGreenfieldStorage.initialize(TEST_CREDENTIALS);
    
    if (!initialized) {
      console.error('❌ Failed to validate credentials');
      return {
        success: false,
        error: 'Credential validation failed'
      };
    }
    console.log('✅ Credentials validated successfully');

    // Test 2: Test connection
    console.log('\n2️⃣ Testing Greenfield connection...');
    const connectionTest = await simpleGreenfieldStorage.testConnection();
    
    if (!connectionTest.success) {
      console.error('❌ Connection test failed:', connectionTest.message);
      return {
        success: false,
        error: connectionTest.message
      };
    }
    console.log('✅ Connection test passed');

    // Test 3: Check mock balance
    console.log('\n3️⃣ Checking account balance (mock)...');
    try {
      const balance = await simpleGreenfieldStorage.getBalance();
      console.log(`✅ Mock balance: ${balance} BNB`);
    } catch (balanceError) {
      console.warn('⚠️ Could not check balance:', balanceError);
    }

    console.log('\n🎉 All tests passed! Greenfield is ready to use.');
    return {
      success: true,
      message: 'Greenfield connection successful'
    };

  } catch (error: any) {
    console.error('\n❌ Connection test failed:', error.message);
    console.error('Full error:', error);
    
    return {
      success: false,
      error: error.message || 'Unknown error'
    };
  }
}

// Test function that can be called from browser console
if (typeof window !== 'undefined') {
  (window as any).testGreenfield = testGreenfieldConnection;
}
