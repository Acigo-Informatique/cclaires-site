// Serveur local : sert le site comme Vercel (URL propres, 404), fait tourner la sonde de l'inspecteur
// du skill taste-skill dans un navigateur (Edge refuse le mode headless sur ce poste) et enregistre les
// images produites par tools/images.html. Outil de travail, non publié.
//   node tools/serveur-local.mjs   → http://127.0.0.1:4321/   (?sonde=1 pour injecter l'enregistreur de mouvement)
import { createServer } from 'node:http';
import { readFileSync, statSync, createReadStream, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, join, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';

const SKILL = 'C:/Users/Max-AndreLEROY/.claude/plugins/cache/taste-skill/taste-skill/2.0.0/skills/taste-skill';
const { judge } = await import(pathToFileURL(join(SKILL, 'scripts/lib/rules.mjs')).href);
const inspect = readFileSync(join(SKILL, 'scripts/inspect.mjs'), 'utf8');
const RECORDER = inspect.match(/const MOTION_RECORDER = `([\s\S]*?)`;/)[1];
const root = resolve(new URL('..', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1'));
process.chdir(root);
const MIME = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mjs': 'text/javascript; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8', '.webmanifest': 'application/manifest+json', '.ico': 'image/x-icon' };
mkdirSync('.taste-skill/sonde', { recursive: true });

createServer((req, res) => {
  const u = new URL(req.url, 'http://x');
  if (u.pathname === '/__probe.mjs') {
    res.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8', 'cache-control': 'no-store' });
    return createReadStream(join(SKILL, 'scripts/lib/probe.mjs')).pipe(res);
  }
  if (u.pathname === '/__fichier' && req.method === 'POST') {
    // enregistre une image produite par un canvas (data URL PNG) dans le site
    const nom = u.searchParams.get('nom') || '';
    if (!/^(assets\/img\/)?[a-z0-9-]+\.png$/.test(nom)) { res.writeHead(400); return res.end('nom refusé'); }
    let corps = '';
    req.on('data', (d) => { corps += d; });
    req.on('end', () => {
      const octets = Buffer.from(corps.replace(/^data:image\/png;base64,/, ''), 'base64');
      writeFileSync(join(root, nom), octets);
      res.writeHead(200); res.end(nom + ' ' + octets.length);
    });
    return;
  }
  if (u.pathname === '/__mesures' && req.method === 'POST') {
    let corps = '';
    req.on('data', (d) => { corps += d; });
    req.on('end', () => {
      const { width, metrics, frames, motion } = JSON.parse(corps);
      const findings = judge(metrics, { width, allow: [] });
      const ok = frames.filter(Boolean);
      const covered = [...new Set(ok.flatMap((f) => f.covered.map((c) => c.text)))];
      if (covered.length) findings.push({ level: 'FAIL', id: 'covered-text', message: covered.slice(0, 4).join(' | ') });
      const clipped = [...new Set(ok.flatMap((f) => (f.clipped || []).map((c) => c.text)))];
      if (clipped.length) findings.push({ level: 'FAIL', id: 'clipped-text', message: clipped.slice(0, 4).join(' | ') });
      const empty = ok.map((f, i) => ({ f, i })).filter(({ f }) => f.filled < 0.2).map(({ i }) => i + 1);
      if (width >= 1100 && empty.length >= 2) findings.push({ level: 'FAIL', id: 'empty-screens', message: 'écrans presque vides : ' + empty.join(', ') });
      if (width >= 1100 && motion) {
        const n = motion.elements + motion.playingVideos * 4;
        if (n < 8) findings.push({ level: 'FAIL', id: 'still-page', message: n + ' éléments animés' });
        else if (n < 16) findings.push({ level: 'WARN', id: 'still-page', message: n + ' éléments animés' });
      }
      const m = metrics;
      const resume = {
        width,
        hero: m.hero && { text: m.hero.text.slice(0, 60), lines: m.hero.lines, size: m.hero.size, font: m.hero.font },
        typefaces: m.type.families.filter((f) => f.share >= 0.02).map((f) => `${f.family} ${Math.round(f.share * 100)}%`),
        sizes: m.type.sizes, body: m.type.body,
        page: { screens: m.page.screens, words: m.page.words, img: m.page.img },
        heroMedia: m.heroMedia[0] && Math.round(m.heroMedia[0].ratio * 100) + '% ' + m.heroMedia[0].type,
        headings: m.headingSummary,
        filled: ok.map((f) => Math.round(f.filled * 100)),
        motion,
        findings: findings.map((f) => `${f.level} [${f.id}] ${f.message}`),
      };
      writeFileSync(`.taste-skill/sonde/${width}.json`, JSON.stringify({ resume, metrics }, null, 1));
      res.writeHead(200, { 'content-type': 'application/json' });
      res.end(JSON.stringify(resume));
    });
    return;
  }
  try {
    let f = resolve(join(root, decodeURIComponent(u.pathname)));
    if (f !== root && !f.startsWith(root + sep)) { res.writeHead(403); return res.end(); }
    if (!extname(f)) { try { statSync(f + '.html'); f += '.html'; } catch {} }
    if (statSync(f).isDirectory()) f = join(f, 'index.html');
    let corps = readFileSync(f);
    if (extname(f) === '.html' && u.searchParams.has('sonde')) {
      corps = Buffer.from(corps.toString().replace('<head>', `<head><script>${RECORDER}</script>`));
    }
    res.writeHead(200, { 'content-type': MIME[extname(f).toLowerCase()] || 'application/octet-stream', 'cache-control': 'no-store' });
    res.end(corps);
  } catch {
    res.writeHead(404, { 'content-type': 'text/html; charset=utf-8' });
    try { res.end(readFileSync(join(root, '404.html'))); } catch { res.end('introuvable'); }
  }
}).listen(4321, '127.0.0.1', () => console.log('http://127.0.0.1:4321/'));
