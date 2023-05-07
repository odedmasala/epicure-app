import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [react(), svgr()],
  optimizeDeps:{
    exclude: ['@babel/runtime/helpers/extends', '@babel/runtime/helpers/inheritsLoose']
  }
});
