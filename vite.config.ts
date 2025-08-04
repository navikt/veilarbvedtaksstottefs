/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		manifest: 'asset-manifest.json',
		sourcemap: true
	},
	test: {
		globals: true
	}
});
