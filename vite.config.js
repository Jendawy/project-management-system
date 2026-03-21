import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode || 'development', process.cwd(), '');
  const legacySDKImportsEnv =
    env.BASE44_LEGACY_SDK_IMPORTS === 'true' ||
    env.VITE_BASE44_LEGACY_SDK_IMPORTS === 'true' ||
    process.env.BASE44_LEGACY_SDK_IMPORTS === 'true';

  console.log('[vite.config] legacySDKImportsEnv', legacySDKImportsEnv, 'env.BASE44_LEGACY_SDK_IMPORTS', env.BASE44_LEGACY_SDK_IMPORTS, 'env.VITE_BASE44...', env.VITE_BASE44_LEGACY_SDK_IMPORTS);

  return {
    logLevel: 'error', // Suppress warnings, only show errors
    plugins: [
      base44({
        // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
        // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
        // Force legacy support so these imports work immediately.
        legacySDKImports: true,
        hmrNotifier: true,
        navigationNotifier: true,
        analyticsTracker: true,
        visualEditAgent: true
      }),
      react(),
    ],
  }
});