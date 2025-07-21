const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');
const html = fs.readFileSync(htmlPath, 'utf8');

const regex = /<(?:img|source)[^>]*src="([^"\s]+)"/gi;
const assets = [];
let match;
while ((match = regex.exec(html)) !== null) {
  assets.push(match[1]);
}

describe('Referenced assets exist', () => {
  assets.forEach(asset => {
    test(`File ${asset} should exist`, () => {
      const assetPath = path.join(__dirname, '..', asset);
      expect(fs.existsSync(assetPath)).toBe(true);
    });
  });
});
