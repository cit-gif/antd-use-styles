import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),dts()],
  resolve: {
    alias: {
      'antd-use-styles': './src/index.ts',
    },
  },
  build: {
    lib: {
      entry:path.resolve(__dirname, './src/index.ts'),
      name: "antd-use-styles",
    },
    rollupOptions: {
      external: ['react', 'antd'],
      output: {
        globals: {
          react: 'react',
          antd:'antd'
        },

      }
    }
  }
});
