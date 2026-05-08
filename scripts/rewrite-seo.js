const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const deploymentUrl = process.env.URL || process.env.DEPLOY_PRIME_URL || process.env.DEPLOY_URL;

if (!deploymentUrl) {
  console.log('No deployment URL detected; skipping SEO rewrite.');
  process.exit(0);
}

const siteUrl = deploymentUrl.replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const replacements = [
  {
    file: 'index.html',
    patterns: [
      [/https:\/\/timax-deutsch-world\.com\//g, `${siteUrl}/`],
      [/https:\/\/timax-deutsch-world\.com\/assets\/logo\.png/g, `${siteUrl}/assets/logo.png`],
    ],
  },
  {
    file: 'robots.txt',
    patterns: [
      [/Sitemap:\s*https:\/\/timax-deutsch-world\.com\/sitemap\.xml/g, `Sitemap: ${siteUrl}/sitemap.xml`],
    ],
  },
  {
    file: 'sitemap.xml',
    patterns: [
      [/https:\/\/timax-deutsch-world\.com\//g, `${siteUrl}/`],
      [/<lastmod>[^<]+<\/lastmod>/g, `<lastmod>${today}</lastmod>`],
    ],
  },
];

for (const entry of replacements) {
  const filePath = path.join(rootDir, entry.file);
  let contents = fs.readFileSync(filePath, 'utf8');

  for (const [pattern, replacement] of entry.patterns) {
    contents = contents.replace(pattern, replacement);
  }

  fs.writeFileSync(filePath, contents, 'utf8');
}

console.log(`SEO files updated for ${siteUrl}`);