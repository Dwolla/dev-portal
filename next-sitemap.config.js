/** @type {import("next-sitemap").IConfig} */
module.exports = {
  siteUrl: "https://developers.dwolla.com",
  changefreq: "monthly",
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/*",
      },
    ],
  },
};
