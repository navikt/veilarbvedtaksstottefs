/// <reference types="vitest/config" />

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	build: {
		manifest: 'asset-manifest.json',
		sourcemap: true
	},
	plugins: [react()],
	test: {
		globals: true
	}
});
