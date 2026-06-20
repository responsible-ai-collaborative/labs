/**
 * Next.js configuration tuned for a static export hosted on GitHub Pages.
 *
 * GitHub Pages serves project sites from a subpath (e.g.
 * https://responsible-ai-collaborative.github.io/labs/), so we set a
 * `basePath`/`assetPrefix`. It is overridable via the PAGES_BASE_PATH env var
 * (set to "" for a user/organization page or a custom domain at the root).
 *
 * @type {import('next').NextConfig}
 */
const repoBasePath = '/labs';

const basePath =
  process.env.PAGES_BASE_PATH !== undefined
    ? process.env.PAGES_BASE_PATH
    : process.env.NODE_ENV === 'production'
      ? repoBasePath
      : '';

const nextConfig = {
  // Emit a fully static site into ./out — no Node server needed.
  output: 'export',

  // GitHub Pages cannot run the Next.js image optimizer.
  images: { unoptimized: true },

  // Serve every route as /path/index.html so Pages resolves them directly.
  trailingSlash: true,

  // Only apply a base path when one is configured (keeps local dev at root).
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),

  // Expose the base path to client components for building absolute asset URLs.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
