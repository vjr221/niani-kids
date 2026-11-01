import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const approved = [...audioSource.matchAll(/approved\('([^']+)'/g)].map((m) => m[1]);
const pending = [...audioSource.matchAll(/contentId:\s*'([^']+)'/g)].map((m) => m[1]);
const ids = [...approved, ...pending];
assert.equal(approved.length, 24, `Expected 24 owner-approved playable tracks after removing Bonjour version 1; found ${approved.length}`);
assert.deepEqual(pending.sort(), ['song-nanu-fecc','song-niani-kids','song-theme'].sort(), 'The three tracks awaiting final review must remain gated');
assert.equal(ids.length, 27, 'Expected 27 audio/content mappings');
assert.equal(new Set(ids).size, ids.length, 'Audio content IDs must be unique');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback must require rights confirmation');
console.log('Audio validation passed: 24 approved tracks and 3 tracks awaiting final review.');
