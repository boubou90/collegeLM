import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

import tailwind from '@astrojs/tailwind';

export default defineConfig({
  integrations: [react(), tailwind()],
  output: 'static',
  build: {
    // Enable minification
    minify: true,
    // Enable tree shaking
    treeshake: true
  }
});