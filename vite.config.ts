import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

// Ensure generated Ganpati images are present in public/images
try {
  const brainDir = 'C:/Users/Vedant Dhangade/.gemini/antigravity-ide/brain/83550502-fb6f-4f23-9d54-f079dac4da9f';
  const targetDir = path.resolve(__dirname, 'public/images');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const images = [
    { src: 'ganpati_bappa_hero_1788529202770.jpg', dest: 'ganpati-hero.jpg' },
    { src: 'ganpati_bappa_bal_1788529226265.jpg', dest: 'ganpati-bal.jpg' },
    { src: 'ganpati_bappa_royal_1788529249272.jpg', dest: 'ganpati-royal.jpg' },
    { src: 'ganpati_bappa_seed_1788529272693.jpg', dest: 'ganpati-seed.jpg' },
    { src: 'ganpati_artisan_craft_1788529379550.jpg', dest: 'ganpati-artisan.jpg' },
  ];
  for (const img of images) {
    const srcPath = path.join(brainDir, img.src);
    const destPath = path.join(targetDir, img.dest);
    if (fs.existsSync(srcPath) && !fs.existsSync(destPath)) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
} catch (e) {
  console.warn('Could not copy Ganpati images:', e);
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      fs: {
        allow: [
          '.',
          'C:/Users/Vedant Dhangade/.gemini/antigravity-ide/brain/83550502-fb6f-4f23-9d54-f079dac4da9f'
        ]
      },
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâ€”file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
