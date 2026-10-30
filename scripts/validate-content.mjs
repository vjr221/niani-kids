import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const legacySource = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const officialSource = readFileSync(new URL('../src/officialSongCatalog.ts', import.meta.url), 'utf8');
const legacyEntries = [...legacySource.matchAll(/\{id:'([^']+)',title:'([^']+)',subtitle:'([^']+)',category:'([^']+)',emoji:'([^']+)',duration:'([^']+)',language:'([^']+)'/g)]
  .map((entry) => ({ id: entry[1], title: entry[2], subtitle: entry[3], category: entry[4], emoji: entry[5], duration: entry[6], language: entry[7] }));
const retainedEntries = legacyEntries.filter((entry) => entry.category === 'Histoires' || entry.id === 'song-theme');
const officialJson = officialSource.slice(officialSource.indexOf('=') + 1).trim().replace(/;$/, '');
const officialEntries = JSON.parse(officialJson);
const entries = [...retainedEntries, ...officialEntries];

assert.ok(officialEntries.length === 25, `Expected 25 official WordPress songs; found ${officialEntries.length}`);
assert.ok(entries.length >= 30, `Expected retained stories plus official songs; found ${entries.length}`);
const ids = entries.map((entry) => entry.id);
assert.equal(new Set(ids).size, ids.length, 'Runtime content IDs must be unique');

const allowedCategories = new Set(['Comptines', 'Berceuses', 'J’apprends', 'Histoires']);
const allowedLanguages = new Set(['FR', 'WO', 'FR + WO']);
for (const entry of entries) {
  assert.ok(entry.id?.trim(), 'Every content entry needs an ID');
  assert.ok(entry.title?.trim(), `Missing title for ${entry.id}`);
  assert.ok(entry.subtitle?.trim(), `Missing subtitle for ${entry.id}`);
  assert.ok(allowedCategories.has(entry.category), `Unexpected category "${entry.category}" for ${entry.id}`);
  assert.ok(entry.emoji?.trim(), `Missing visual marker for ${entry.id}`);
  assert.ok(entry.duration === 'À confirmer' || /^[0-9]+ min$/.test(entry.duration), `Invalid duration for ${entry.id}: ${entry.duration}`);
  assert.ok(allowedLanguages.has(entry.language), `Unexpected language "${entry.language}" for ${entry.id}`);
}

assert.match(legacySource, /id:'song-jamm'/, 'Expected the Wolof draft to remain in source history');
assert.match(legacySource, /locuteur natif/i, 'Wolof draft must retain its native-speaker review warning');
console.log(`Content catalogue validation passed: ${officialEntries.length} official songs, ${retainedEntries.length} retained stories/reference items.`);
