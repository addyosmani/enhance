import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-onnx',
      writeBundle: async () => {
        // Ensure models directory exists
        if (!fs.existsSync('dist/models')) {
          fs.mkdirSync('dist/models', { recursive: true });
        }
        
        // Copy ONNX files
        const modelFiles = fs.readdirSync('public/models')
          .filter(file => file.endsWith('.onnx'));
        
        for (const file of modelFiles) {
          fs.copyFileSync(
            `public/models/${file}`,
            `dist/models/${file}`
          );
        }
      }
    }
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {
      'Cross-Origin-Embedder-Policy': 'require-corp',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: resolve(__dirname, 'index.html'),
      output: {
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name || '';
          if (name.endsWith('.onnx')) {
            return 'models/[name][extname]';
          }
          if (name.endsWith('.wasm')) {
            return '[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      }
    }
  },
  assetsInclude: ['**/*.wasm', '**/*.onnx'],
  publicDir: 'public',
  root: '.'
});