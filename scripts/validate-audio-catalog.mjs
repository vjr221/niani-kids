import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const approved = [...audioSource.matchAll(/approved\('([^']+)'/g)].map((m) => m[1]);
const pending = [...audioSource.matchAll(/contentId:\s*'([^']+)'/g)].map((m) => m[1]);
const ids = [...approved, ...pending];
assert.equal(approved.length, 25, `Expected 25 owner-approved playable tracks; found ${approved.length}`);
assert.deepEqual(pending.sort(), ['song-nanu-fecc','song-theme'].sort(), 'The two newest Wolof audios must remain gated pending review');
assert.equal(ids.length, 27, 'Expected 27 audio/content mappings');
assert.equal(new Set(ids).size, ids.length, 'Audio content IDs must be unique');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback must require rights confirmation');
console.log('Audio validation passed: 25 approved tracks and 2 newly published tracks awaiting review.');
