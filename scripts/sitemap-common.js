const { configureSitemap } = require("@sergeymyssak/nextjs-sitemap");

const Sitemap = configureSitemap({
  domains: [
    { domain: "developers.dwolla.com", defaultLocale: "en", http: true },
  ],
  excludeExtensions: [".tsx", ".yml"],
  trailingSlash: true,
  targetDirectory: "./public",
  pagesDirectory: "./pages",
});

Sitemap.generateSitemap();
