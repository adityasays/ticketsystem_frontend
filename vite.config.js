import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss() ,  svgr({
      // optional: match all `.svg?react` imports
      include: '**/*.svg?react',
      // optional: adjust export type
      svgrOptions: {
        // exportType: 'default',
        // icon: true,
        // svgo: true,
      },
    }),  ],
})
