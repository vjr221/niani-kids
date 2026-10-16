import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const source = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const entries = [...source.matchAll(/\{id:'([^']+)',title:'([^']+)',subtitle:'([^']+)',category:'([^']+)',emoji:'([^']+)',duration:'([^']+)',language:'([^']+)'/g)];
assert.ok(entries.length >= 10, `Expected at least 10 content entries; found ${entries.length}`);

const ids = entries.map((entry) => entry[1]);
assert.equal(new Set(ids).size, ids.length, 'Content IDs must be unique');

const allowedCategories = new Set(['Comptines', 'Berceuses', 'J’apprends', 'Histoires']);
const allowedLanguages = new Set(['FR', 'WO', 'FR + WO']);
for (const entry of entries) {
  const [, id, title, subtitle, category, emoji, duration, language] = entry;
  assert.ok(id.trim(), 'Every content entry needs an ID');
  assert.ok(title.trim(), `Missing title for ${id}`);
  assert.ok(subtitle.trim(), `Missing subtitle for ${id}`);
  assert.ok(allowedCategories.has(category), `Unexpected category "${category}" for ${id}`);
  assert.ok(emoji.trim(), `Missing visual marker for ${id}`);
  assert.match(duration, /^\\d+ min$/, `Invalid duration for ${id}: ${duration}`);
  assert.ok(allowedLanguages.has(language), `Unexpected language "${language}" for ${id}`);
}

const wolofStart = source.indexOf("id:'song-jamm'");
assert.notEqual(wolofStart, -1, 'Expected the Wolof draft to remain catalogued');
const wolofDraft = source.slice(wolofStart, wolofStart + 1000);
assert.match(wolofDraft, /locuteur natif/i, 'Wolof draft must retain its native-speaker review warning');

console.log(`Content catalogue validation passed: ${entries.length} entries, unique IDs, required metadata, and Wolof review warning.`);
