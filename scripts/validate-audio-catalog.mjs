import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const approvedHelpers = [...audioSource.matchAll(/approved\('([^']+)'/g)].map((m) => m[1]);
const explicitRecords = [...audioSource.matchAll(/\{\s*contentId:\s*'([^']+)'[\s\S]*?reviewStatus:\s*'([^']+)'[\s\S]*?\}/g)]
  .map((m) => ({ id:m[1], status:m[2] }));
const approved = [...approvedHelpers, ...explicitRecords.filter((record) => record.status === 'approved').map((record) => record.id)];
const pending = explicitRecords.filter((record) => record.status !== 'approved').map((record) => record.id);
const ids = [...approvedHelpers, ...explicitRecords.map((record) => record.id)];
assert.equal(ids.length, 29, 'Production must contain exactly 29 approved audio/content mappings');
assert.equal(new Set(ids).size, ids.length, 'Audio content IDs must be unique');
assert.equal(approved.length, 29, 'Every production audio mapping must be approved; found ' + approved.length);
assert.deepEqual(pending, [], 'Production catalogue must not contain any audio awaiting review');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback must require rights confirmation');
const feccRecord = audioSource.match(/contentId:\s*'song-nanu-fecc'[\s\S]*?\n\s*\}/)?.[0] ?? '';
assert.match(feccRecord, /reviewStatus:\s*'approved'/, 'User-approved Nañu fecc must be available');
assert.match(feccRecord, /languageReviewed:\s*true/, 'User-approved Nañu fecc must retain language approval');
assert.match(feccRecord, /rightsConfirmed:\s*true/, 'Owner-confirmed rights must be preserved');
assert.match(audioSource, /Yaaye-Sama-Yaay-Version-Masculine\.mp3/, 'Yaaye masculine alternative must be present');
assert.match(audioSource, /coverUrl:\s*`https:\/\/nianikids\.com\/wp-content\/uploads\/2026\/11\//, 'Approved audio records must expose official cover art');
assert.equal((audioSource.match(/approved\('[^']+',\d+,'[^']+','[^']+\.jpg'\)/g) ?? []).length, 27, 'All helper-based approved tracks must have a 16:9 cover mapping');
assert.match(audioSource, /coverUrl:\s*'https:\/\/nianikids\.com\/wp-content\/uploads\/2026\/11\/05_Nu_ngi_fii\.jpg'/, 'The Niani theme song must have its official cover');
assert.equal((audioSource.match(/coverUrl:\s*'https:\/\/nianikids\.com\/wp-content\/uploads\/2026\/11\//g) ?? []).length, 3, 'All three explicit records must include their official covers');
assert.match(audioSource, /coverUrl:\s*'https:\/\/nianikids\.com\/wp-content\/uploads\/2026\/11\/04_Nianu_fecc\.jpg'/, 'Nañu fecc must retain its published cover');
console.log('Production audio validation passed: 29 approved tracks, all with official covers; no pending review files.');
