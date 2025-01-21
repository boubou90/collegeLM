import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collegelouisemichel.netlify.app',
  integrations: [
    react(), 
    tailwind(),
    sitemap()
  ],
  output: 'static',
  build: {
    // Enable minification
    minify: true,
    // Enable tree shaking
    treeshake: true
  }
});
