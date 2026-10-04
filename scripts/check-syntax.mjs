import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
const files = readdirSync('src/content').filter(f => f.endsWith('.js')).map(f => `src/content/${f}`);
for (const file of files) { const r = spawnSync(process.execPath, ['--check', file], { stdio: 'inherit' }); if (r.status !== 0) process.exit(r.status ?? 1); }
