import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../src/i18n.ts', import.meta.url), 'utf8');
const frStart = source.indexOf('fr: {');
const woStart = source.indexOf('wo: {');
assert.notEqual(frStart, -1, 'French translations block is required');
assert.notEqual(woStart, -1, 'Wolof translations block is required');
assert.ok(frStart < woStart, 'French translations must precede Wolof translations');

const frSource = source.slice(frStart + 'fr: {'.length, woStart);
const woEnd = source.indexOf('\n  },\n} as const;', woStart);
assert.notEqual(woEnd, -1, 'Could not find the end of the Wolof translations block');
const woSource = source.slice(woStart + 'wo: {'.length, woEnd);

function readKeys(block, language) {
  const keys = [...block.matchAll(/(?:^|[,\n])\s*([A-Za-z_$][\w$]*)\s*:/g)].map((match) => match[1]);
  assert.ok(keys.length > 0, `No translation keys found for ${language}`);
  assert.equal(new Set(keys).size, keys.length, `Duplicate translation keys found for ${language}`);
  return new Set(keys);
}

const fr = readKeys(frSource, 'fr');
const wo = readKeys(woSource, 'wo');
const missingInWolof = [...fr].filter((key) => !wo.has(key)).sort();
const missingInFrench = [...wo].filter((key) => !fr.has(key)).sort();

assert.deepEqual(missingInWolof, [], `Translation keys missing in Wolof: ${missingInWolof.join(', ')}`);
assert.deepEqual(missingInFrench, [], `Translation keys missing in French: ${missingInFrench.join(', ')}`);

console.log(`Translation key parity passed: ${fr.size} French and Wolof keys.`);
