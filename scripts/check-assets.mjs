import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, extname, sep, posix } from 'node:path';
import assert from 'node:assert/strict';

const root = resolve('dist');
const html = await readFile(resolve(root, 'index.html'), 'utf8');
const references = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)].map(match => match[1]);
const jsReference = references.find(ref => ref.endsWith('.js'));
assert(jsReference, 'Production JavaScript bundle is referenced');
const js = await readFile(resolve(root, jsReference), 'utf8');
for (const match of js.matchAll(/["'](\.\/assets\/[^"']+)["']/g)) references.push(match[1]);
for (const cssRef of references.filter(ref => ref.endsWith('.css'))) {
  const css = await readFile(resolve(root, cssRef), 'utf8');
  for (const match of css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)) {
    if (!match[1].startsWith('data:')) references.push('./' + posix.join(posix.dirname(cssRef), match[1]));
  }
}
const assets = [...new Set(references.filter(ref => !ref.startsWith('http') && !ref.startsWith('#')))];
assert(assets.some(ref => ref.endsWith('acm-logo.png')), 'Official ACM logo is bundled');
assert(assets.some(ref => ref.endsWith('moon.svg')), 'Original SVG moon is bundled');
assert(assets.some(ref => ref.endsWith('devfolio.svg')), 'Official partner logo is bundled');
assert.equal(assets.filter(ref => ref.endsWith('.woff2')).length, 1, 'The body and heading font is bundled locally');
for (const ref of assets) {
  assert(!ref.startsWith('/'), `Asset is subdirectory-compatible: ${ref}`);
  assert((await stat(resolve(root, ref))).isFile(), `Asset exists: ${ref}`);
}
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };
const server = createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    if (pathname.startsWith('/Eclipse7.0/')) pathname = pathname.slice('/Eclipse7.0'.length);
    const filePath = resolve(root, pathname.replace(/^\/+/, '') || 'index.html');
    assert(filePath.startsWith(root + sep));
    const data = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end(); }
});
await new Promise(done => server.listen(0, '127.0.0.1', done));
try {
  const { port } = server.address();
  for (const basePath of ['/', '/Eclipse7.0/']) {
    const base = `http://127.0.0.1:${port}${basePath}`;
    assert.equal((await fetch(base)).status, 200, `Page serves at ${basePath}`);
    for (const ref of assets) {
      const response = await fetch(new URL(ref, base));
      assert.equal(response.status, 200, `Asset serves: ${basePath}${ref}`);
      const expected = types[extname(ref)];
      if (expected) assert.equal(response.headers.get('content-type'), expected);
    }
    console.log(`PASS: page and ${assets.length} production assets under ${basePath}`);
  }
  console.log('PASS: locally bundled assets and deployment paths. Visual browser QA remains a separate check.');
} finally { await new Promise(done => server.close(done)); }
