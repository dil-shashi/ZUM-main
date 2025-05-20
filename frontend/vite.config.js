import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createHtmlPlugin } from "vite-plugin-html";
import eslint  from "vite-plugin-eslint";

import path from "node:path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  root: ".",
  build: {
    outDir: "dist",
    cssCodeSplit: true,
    cssMinify: "lightningcss",
    reportCompressedSize: true,
  },
  server: {
    port: 3000,
    open: true
  },
  esbuild: {
    loader: 'jsx',
  },
  optimizeDeps: {
    //  include: ['esm-dep > cjs-dep'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  plugins: [
    react(),
    eslint ({
      cache: false,
      include: ["./src/**/*.js", "./src/**/*.jsx"],
	exclude: [/virtual:/, /node_modules/]
    }),
    createHtmlPlugin({
      inject: {
        data: {
          title: "EasyMed"
        }
      }
    })
  ],
  resolve: {
    alias: [
      { find: "@", replacement: path.resolve(__dirname, "./src") },
      { find: "@_helpers", replacement: path.resolve(__dirname, "./src/_helpers") },
      { find: "@assets", replacement: path.resolve(__dirname, "./src/assets") },
      {
        find: "@components",
        replacement: path.resolve(__dirname, "./src/components")
      },
      {
        find: "@context",
        replacement: path.resolve(__dirname, "./src/context")
      },
      { find: "@pages", replacement: path.resolve(__dirname, "./src/pages") },
      { find: "@routes", replacement: path.resolve(__dirname, "./src/routes") },
      { find: "@redux", replacement: path.resolve(__dirname, "./src/redux") }
    ]
  }
});
