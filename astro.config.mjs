import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import vercel from "@astrojs/vercel/serverless";
import million from "million/compiler";

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  integrations: [react(), tailwind()],
  vite: {
    plugins: [million.vite({
      mode: 'react',
      server: true,
      auto: true
    })]
  },
  adapter: vercel()
});