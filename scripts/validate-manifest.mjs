import { readFileSync } from 'node:fs';
const m=JSON.parse(readFileSync('manifest.json','utf8'));
if(m.manifest_version!==3) throw new Error('Manifest V3 required');
if(JSON.stringify(m.permissions)!==JSON.stringify(['storage'])) throw new Error('Unexpected permissions');
if(JSON.stringify(m.content_scripts?.[0]?.matches)!==JSON.stringify(['https://aistudio.google.com/apps/*'])) throw new Error('Unexpected match scope');
for(const p of Object.values(m.icons)) if(!readFileSync(p)) throw new Error(`Missing icon ${p}`);
console.log('manifest OK');
