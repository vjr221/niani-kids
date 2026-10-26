import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
// Match the stable start of each catalogue object; optional fields may appear in any order.
const matches = [...source.matchAll(/\{id:'([^']+)',title:'([^']+)'/g)];
const entries = matches.map((match, index) => {
  const block = source.slice(match.index, matches[index + 1]?.index ?? source.length);
  const languageMatch = block.match(/\blanguage\s*:\s*'(FR \+ WO|FR|WO)'/);
  return {
    id: match[1],
    title: match[2],
    language: languageMatch?.[1] ?? 'UNSPECIFIED',
    block,
  };
});

if (entries.length === 0) {
  throw new Error('No content entries found. Update the audit script to match the catalogue format.');
}

const frenchOnly = entries.filter((entry) => entry.language === 'FR');
const wolofOnly = entries.filter((entry) => entry.language === 'WO');
const declaredBilingual = entries.filter((entry) => entry.language === 'FR + WO');
const hasWolofText = (entry) => /wolofLyrics\s*:|wolofStoryText\s*:/.test(entry.block);
const isAudioReference = (entry) => /isAudioReference\s*:\s*true/.test(entry.block);

// Reference audio with unrecovered lyrics is a pending editorial item, not validated Wolof.
const bilingualWithoutWolofText = declaredBilingual.filter(
  (entry) => !hasWolofText(entry) && !isAudioReference(entry),
);
const pendingBilingualAudioReview = declaredBilingual.filter(
  (entry) => isAudioReference(entry) && !hasWolofText(entry),
);

console.log('Niani Kids — audit de couverture wolof');
console.log('======================================');
console.log(`Entrées du catalogue : ${entries.length}`);
console.log(`Langue non spécifiée : ${entries.filter((entry) => entry.language === 'UNSPECIFIED').length}`);
console.log(`Français uniquement (à traduire ou maintenir explicitement en français) : ${frenchOnly.length}`);
console.log(`Wolof uniquement (à relire selon le statut éditorial) : ${wolofOnly.length}`);
console.log(`Déclarées bilingues : ${declaredBilingual.length}`);

if (bilingualWithoutWolofText.length > 0) {
  console.log('\nAttention : entrées déclarées bilingues sans champ de paroles/récit wolof explicite et sans statut de référence en attente :');
  for (const entry of bilingualWithoutWolofText) console.log(`- ${entry.id}: ${entry.title}`);
  process.exitCode = 1;
}

if (pendingBilingualAudioReview.length > 0) {
  console.log('\nRéférences audio bilingues en attente de récupération et validation des paroles originales (non publiables avant revue) :');
  for (const entry of pendingBilingualAudioReview) console.log(`- ${entry.id}: ${entry.title}`);
}

console.log('\nCatalogue en français uniquement :');
for (const entry of frenchOnly) console.log(`- ${entry.id}: ${entry.title}`);

console.log('\nCet audit mesure la couverture du catalogue principal uniquement. Il ne remplace ni l’audit de src/program.ts, ni une relecture humaine du wolof.');
