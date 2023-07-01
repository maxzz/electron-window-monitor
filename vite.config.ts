import path from 'node:path';
import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron';
import renderer from 'vite-plugin-electron-renderer';
import react from '@vitejs/plugin-react';

console.log('----------------- __dirname', __dirname);
console.log('----------------- __dist:el', path.join(__dirname, 'dist-electron'));

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),

        electron([
            {
                // Main-Process entry file of the Electron App.
                entry: 'src/electron/main.ts',
            },
            {
                entry: 'src/electron/preload.ts',
                onstart(options) {
                    // Notify the Renderer-Process to reload the page when the Preload-Scripts build is complete, 
                    // instead of restarting the entire Electron App.
                    options.reload();
                },
            },
        ]),

        renderer(),
    ],
    optimizeDeps: {
        exclude: ["pmat_plugin_nodejs"],
    },    
    build: {
        rollupOptions: {
            // external: [/pmat_plugin_nodejs/]
            // external: ['./plugins/pmat_plugin_nodejs.node']
            external: [/\.node$/]
        }
    },
    resolve: {
        alias: {
            '@': path.join(__dirname, 'src'),
            '~node': path.join(__dirname, 'dist-electron'),
        }
    }
});
