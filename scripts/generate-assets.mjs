import sharp from 'sharp';
import { mkdir, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=process.cwd(), assets=resolve(root,'assets');
await mkdir(assets,{recursive:true});
for(const [src,dest,w,h] of [['brand-logo.svg','app-icon.png',1024,1024],['brand-logo.svg','adaptive-icon.png',1024,1024],['splash-screen.svg','splash.png',1242,2688]]){await sharp(await readFile(resolve(assets,src)),{density:192}).resize(w,h,{fit:'contain',background:'#FFF7D6'}).png().toFile(resolve(assets,dest));console.log('Generated',dest)}
