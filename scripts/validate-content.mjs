import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const legacySource = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const officialSource = readFileSync(new URL('../src/officialSongCatalog.ts', import.meta.url), 'utf8');
const legacyEntries = [...legacySource.matchAll(/\{id:'([^']+)',title:'([^']+)',subtitle:'([^']+)',category:'([^']+)',emoji:'([^']+)',duration:'([^']+)',language:'([^']+)'/g)]
  .map((m) => ({ id:m[1], category:m[4] }));
const retainedStories = legacyEntries.filter((entry) => entry.category === 'Histoires');
assert.ok(!legacySource.includes("id:'song-bonjour'"), 'Bonjour, bonjour version 1 must be removed from the mobile content list');
const officialIds = [...officialSource.matchAll(/"id":\s*"([^"]+)"/g)].map((m) => m[1]);
assert.equal(officialIds.length, 26, `Expected 26 published songs after excluding Bonjour version 1; found ${officialIds.length}`);
assert.ok(officialIds.includes('song-theme'), 'Missing NIANI! NIANI! — ÑU NGI FII!');
assert.ok(officialIds.includes('song-nanu-fecc'), 'Missing Niani Kids – Nañu fecc !');
assert.ok(!officialIds.includes('song-niani-kids'), 'Bonjour, bonjour version 1 must stay out of the mobile catalogue');
assert.ok(!officialIds.includes('song-bonjour'), 'Bonjour, bonjour version 1 must be removed from the app catalogue');
const allIds = [...officialIds, ...retainedStories.map((x) => x.id)];
assert.equal(new Set(allIds).size, allIds.length, 'Runtime content IDs must be unique');
console.log(`Content catalogue validation passed: ${officialIds.length} published songs and ${retainedStories.length} retained stories.`);
