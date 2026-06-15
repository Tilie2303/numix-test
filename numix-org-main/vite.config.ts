import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  // Disable the Cloudflare/Nitro deploy plugin so the build output stays as
  // plain Vite client + SSR bundles suitable for static hosting (e.g. Netlify).
  nitro: false,
  tanstackStart: {
    // SPA mode: emit a static client-rendered shell at dist/client/index.html
    // so the app can be deployed to any static host.
    spa: {
      enabled: true,
      maskPath: "/",
      prerender: {
        outputPath: "/index",
      },
    },
  },
});
