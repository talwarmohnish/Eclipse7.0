import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Relative paths support both a custom domain and GitHub Pages repository subpaths.
export default defineConfig({ base: './', plugins: [react()] });
