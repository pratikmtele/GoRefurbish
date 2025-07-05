// Environment configuration
export const config = {
  // API Configuration
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  
  // App Configuration
  appName: import.meta.env.VITE_APP_NAME || 'GoRefurbish',
  appVersion: import.meta.env.VITE_APP_VERSION || '1.0.0',
  
  // Development Configuration
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
