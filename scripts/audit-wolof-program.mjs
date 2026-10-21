import { readFileSync } from 'node:fs';

const source = readFileSync(new URL('../src/program.ts', import.meta.url), 'utf8');

function extractArray(name) {
  const marker = new RegExp('export const ' + name + '\\s*=\\s*\\[');
  const match = marker.exec(source);
  if (!match) throw new Error('Unable to find ' + name + ' in src/program.ts');
  const start = match.index + match[0].length;
  let depth = 1;
  let quote = null;
  let escaped = false;
  for (let i = start; i < source.length; i += 1) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') quote = char;
    else if (char === '[') depth += 1;
    else if (char === ']') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i);
    }
  }
  throw new Error('Unclosed array for ' + name);
}

function records(arraySource) {
  const result = [];
  let depth = 0;
  let quote = null;
  let escaped = false;
  let start = -1;
  for (let i = 0; i < arraySource.length; i += 1) {
    const char = arraySource[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === "'" || char === '"' || char === '`') quote = char;
    else if (char === '{') {
      if (depth === 0) start = i;
      depth += 1;
    } else if (char === '}') {
      depth -= 1;
      if (depth === 0 && start >= 0) result.push(arraySource.slice(start, i + 1));
    }
  }
  return result;
}

const groups = [
  { label: 'Thèmes pédagogiques', name: 'learningThemes' },
  { label: 'Ateliers pratiques', name: 'workshopLibrary' },
];
let total = 0;
console.log('Niani Kids — audit de localisation du programme');
console.log('===============================================');
for (const group of groups) {
  const items = records(extractArray(group.name));
  total += items.length;
  const notLocalized = items.filter((item) => !/(wolof|wolofTitle|wolofSkills|wolofActivities|wolofSteps|wolofGoal|wolofSafety)/i.test(item));
  console.log(group.label + ': ' + items.length + ' éléments; ' + notLocalized.length + ' sans champ wolof explicite.');
  for (const item of notLocalized) {
    const id = item.match(/id:\s*['"]([^'"]+)['"]/);
    const title = item.match(/title:\s*['"]([^'"]+)['"]/);
    console.log('  - ' + (id?.[1] ?? 'sans-id') + ': ' + (title?.[1] ?? 'titre inconnu'));
  }
}
console.log('Total vérifié : ' + total + ' éléments.');
console.log('Audit informatif : l’absence de champ wolof ne bloque pas le build et ne doit jamais être interprétée comme une traduction validée.');
