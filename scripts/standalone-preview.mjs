import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { resolve, join, dirname } from 'node:path';
import { Script } from 'node:vm';
import assert from 'node:assert/strict';

const root = resolve('dist');
let html = await readFile(join(root, 'index.html'), 'utf8');
const scriptTag = /<script\b[^>]*src="([^"]+)"[^>]*><\/script>/;
const cssTag = /<link\b[^>]*href="([^"]+\.css)"[^>]*>/;
let js = await readFile(join(root, html.match(scriptTag)[1]), 'utf8');
assert(!/import\s*\(/.test(js) && !js.includes('import.meta'), 'Bundle can run without external modules');
for (const asset of ['acm-logo.png', 'devfolio.svg', 'moon.svg']) {
  const mime = asset.endsWith('.png') ? 'image/png' : 'image/svg+xml';
  const data = `data:${mime};base64,${(await readFile(join(root, 'assets', asset))).toString('base64')}`;
  js = js.split(`./assets/${asset}`).join(data);
}
const cssPath = join(root, html.match(cssTag)[1]);
let css = await readFile(cssPath, 'utf8');
for (const match of [...css.matchAll(/url\(["']?([^\)"']+)["']?\)/g)]) {
  if (match[1].startsWith('data:')) continue;
  const data = 'data:font/woff2;base64,' + (await readFile(join(dirname(cssPath), match[1]))).toString('base64');
  css = css.replace(match[0], () => 'url("' + data + '")');
}
html = html.replace(scriptTag, () => `<script type="module">${js.replace(/<\/script/gi, '<\\/script')}</script>`);
html = html.replace(cssTag, () => `<style>${css}</style>`);
html = html.replace('./favicon.svg', `data:image/svg+xml;base64,${(await readFile(join(root, 'favicon.svg'))).toString('base64')}`);
const embeddedScript = html.match(/<script type="module">([\s\S]*?)<\/script>/)[1];
new Script(embeddedScript); // Verify embedding did not corrupt the production JavaScript.
assert(!html.includes('src="./assets/'), 'No external bundle dependency');
const bootstraps = [...html.replace(/<script type="module">[\s\S]*?<\/script>/, '').matchAll(/<script>([\s\S]*?)<\/script>/g)];
assert.equal(bootstraps.length, 2, 'Reload and theme bootstraps remain alongside the application script');
for (const [, bootstrap] of bootstraps) new Script(bootstrap);
await mkdir('outputs', { recursive: true });
await writeFile('outputs/ECLIPSE-preview.html', html);
console.log(`PASS: standalone local preview, ${(await stat('outputs/ECLIPSE-preview.html')).size} bytes, embedded assets and syntactically valid production JavaScript.`);

