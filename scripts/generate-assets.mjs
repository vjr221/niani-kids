import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=process.cwd(), assets=resolve(root,'assets');
await mkdir(assets,{recursive:true});
const jobs=[['brand-logo.svg','app-icon.png',1024,1024],['brand-logo.svg','adaptive-icon.png',1024,1024],['splash-screen.svg','splash.png',1242,2688],['characters/samba.svg','characters/samba.png',512,640],['characters/awa.svg','characters/awa.png',512,640],['characters/bobo.svg','characters/bobo.png',512,640],['characters/baobab.svg','characters/baobab.png',512,640]];
for(const [src,dest,w,h] of jobs){await mkdir(resolve(assets,dest,'..'),{recursive:true});await sharp(await readFile(resolve(assets,src)),{density:192}).resize(w,h,{fit:'contain',background:'#FFF7D6'}).png().toFile(resolve(assets,dest));console.log('Generated',dest)}
