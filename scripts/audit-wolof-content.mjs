import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const matches = [...source.matchAll(/\{id:'([^']+)',title:'([^']+)',subtitle:'([^']+)',category:'([^']+)',emoji:'([^']+)',duration:'([^']+)',language:'([^']+)'/g)];
const entries = matches.map((match, index) => ({
  id: match[1],
  title: match[2],
  language: match[7],
  block: source.slice(match.index, matches[index + 1]?.index ?? source.length),
}));

if (entries.length === 0) {
  throw new Error('No content entries found. Update the audit script to match the catalogue format.');
}

const frenchOnly = entries.filter((entry) => entry.language === 'FR');
const wolofOnly = entries.filter((entry) => entry.language === 'WO');
const declaredBilingual = entries.filter((entry) => entry.language === 'FR + WO');
const bilingualWithoutWolofText = declaredBilingual.filter((entry) => !/wolofLyrics\s*:|wolofStoryText\s*:/.test(entry.block));

console.log('Niani Kids — audit de couverture wolof');
console.log('======================================');
console.log(`Entrées du catalogue : ${entries.length}`);
console.log(`Français uniquement (à traduire ou maintenir explicitement en français) : ${frenchOnly.length}`);
console.log(`Wolof uniquement (à relire selon le statut éditorial) : ${wolofOnly.length}`);
console.log(`Déclarées bilingues : ${declaredBilingual.length}`);

if (bilingualWithoutWolofText.length > 0) {
  console.log('\nAttention : entrées déclarées bilingues sans champ de paroles/récit wolof explicite :');
  for (const entry of bilingualWithoutWolofText) console.log(`- ${entry.id}: ${entry.title}`);
  process.exitCode = 1;
}

console.log('\nCatalogue en français uniquement :');
for (const entry of frenchOnly) console.log(`- ${entry.id}: ${entry.title}`);

console.log('\nCet audit mesure la couverture du catalogue principal uniquement. Il ne remplace ni l’audit de src/program.ts, ni une relecture humaine du wolof.');
