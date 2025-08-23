// Lighthouse Storage Configuration

export const getLighthouseCredentials = () => {
  console.log('🔑 Loading Lighthouse credentials from environment...');
  
  const apiKey = process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY;

  console.log('Environment check:', {
    hasApiKey: !!apiKey,
    apiKeyLength: apiKey?.length || 0
  });

  if (!apiKey) {
    console.error('❌ Missing Lighthouse API key in environment variables');
    console.error('Available env vars:', Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC_LIGHTHOUSE')));
    throw new Error('Missing Lighthouse API key in environment variables. Please check your .env file.');
  }

  console.log('✅ Lighthouse credentials loaded successfully');
  
  return {
    apiKey
  };
};
