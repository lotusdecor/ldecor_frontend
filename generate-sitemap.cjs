const { SitemapStream, streamToPromise } = require('sitemap');
const { createWriteStream, existsSync, mkdirSync } = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
if (!existsSync(publicDir)) {
  mkdirSync(publicDir, { recursive: true });
}

const sitemapPath = path.join(publicDir, 'sitemap.xml');
console.log('Writing sitemap to:', sitemapPath);

const sitemap = new SitemapStream({ hostname: 'https://yourdomain.com' });

[
  '/',
  '/about',
  '/services',
  '/gallery',
  '/contact',
  // Add more routes as needed
].forEach(route => sitemap.write({ url: route }));

sitemap.end();

streamToPromise(sitemap).then(data =>
  createWriteStream(sitemapPath).end(data)
); 