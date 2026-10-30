import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
// Match the start of each object independently of optional fields such as imageUrl,
// ageBand, or learningGoal that may appear before duration/language.
const starts = [...source.matchAll(/\{id:'([^']+)',title:'([^']+)'/g)];
const entries = starts.map((match, index) => {
  const block = source.slice(match.index, starts[index + 1]?.index ?? source.length);
  const language = block.match(/\blanguage\s*:\s*'(FR \+ WO|FR|WO)'/);
  return {
    id: match[1],
    title: match[2],
    language: language?.[1] ?? null,
    block,
  };
}).filter((entry) => entry.language !== null);

if (entries.length === 0) {
  throw new Error('No content entries found. Check the object format in src/content.ts.');
}

const frenchOnly = entries.filter((entry) => entry.language === 'FR');
const wolofOnly = entries.filter((entry) => entry.language === 'WO');
const declaredBilingual = entries.filter((entry) => entry.language === 'FR + WO');
// Reference masters intentionally have no lyrics until the original words are recovered.
const pendingAudioReferences = declaredBilingual.filter((entry) => /\bisAudioReference\s*:\s*true/.test(entry.block));
const bilingualWithoutWolofText = declaredBilingual.filter(
  (entry) => !/\bisAudioReference\s*:\s*true/.test(entry.block) && !/\bwolofLyrics\s*:|\bwolofStoryText\s*:/.test(entry.block),
);

console.log('Niani Kids — audit de couverture wolof');
console.log('======================================');
console.log(`Entrées du catalogue : ${entries.length}`);
console.log(`Français uniquement (à traduire ou maintenir explicitement en français) : ${frenchOnly.length}`);
console.log(`Wolof uniquement (à relire selon le statut éditorial) : ${wolofOnly.length}`);
console.log(`Déclarées bilingues : ${declaredBilingual.length}`);

if (pendingAudioReferences.length > 0) {
  console.log('\nRéférences audio bilingues en attente de récupération/validation des paroles originales :');
  for (const entry of pendingAudioReferences) console.log(`- ${entry.id}: ${entry.title} (non validée, aucune parole inventée)`);
}

if (bilingualWithoutWolofText.length > 0) {
  console.log('\nAttention : entrées déclarées bilingues sans champ de paroles/récit wolof explicite :');
  for (const entry of bilingualWithoutWolofText) console.log(`- ${entry.id}: ${entry.title}`);
  process.exitCode = 1;
}

console.log('\nCatalogue en français uniquement :');
for (const entry of frenchOnly) console.log(`- ${entry.id}: ${entry.title}`);

console.log('\nCet audit mesure la couverture du catalogue principal uniquement. Il ne remplace ni l’audit de src/program.ts, ni une relecture humaine du wolof.');
