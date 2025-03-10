import path from 'node:path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: 'src/x-electron/main.ts',
            },
            {
                entry: 'src/x-electron/preload.ts',
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
                    // instead of restarting the entire Electron App.
                    options.reload();
                },
            },
        ]),

        renderer(),
    ],
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            '@ui': path.join(__dirname, 'src/components/ui/'),
            //'~node': path.join(__dirname, 'dist-electron'),
        }
    }
});
