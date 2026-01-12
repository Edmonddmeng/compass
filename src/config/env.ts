export const env = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL as string,
  apiTimeout: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  appEnv: import.meta.env.VITE_APP_ENV as string,
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === 'true',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
