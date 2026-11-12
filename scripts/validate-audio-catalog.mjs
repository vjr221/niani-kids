import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const approvedHelpers = [...audioSource.matchAll(/approved\('([^']+)'/g)].map((m) => m[1]);
const explicitRecords = [...audioSource.matchAll(/\{\s*contentId:\s*'([^']+)'[\s\S]*?reviewStatus:\s*'([^']+)'[\s\S]*?\}/g)]
  .map((m) => ({ id:m[1], status:m[2] }));
const approved = [...approvedHelpers, ...explicitRecords.filter((record) => record.status === 'approved').map((record) => record.id)];
const pending = explicitRecords.filter((record) => record.status !== 'approved').map((record) => record.id);
const ids = [...approvedHelpers, ...explicitRecords.map((record) => record.id)];
assert.equal(ids.length, 30, 'Expected 30 audio/content mappings');
assert.equal(new Set(ids).size, ids.length, 'Audio content IDs must be unique');
assert.equal(approved.length, 29, 'Expected 29 approved playable tracks; found ' + approved.length);
assert.deepEqual(pending, ['song-nanu-fecc'], 'Only Nañu fecc may remain pending while its master intro is checked');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback must require rights confirmation');
const feccRecord = audioSource.match(/contentId:\s*'song-nanu-fecc'[\s\S]*?\n\s*\}/)?.[0] ?? '';
assert.match(feccRecord, /reviewStatus:\s*'needs-editorial-review'/, 'Nañu fecc must stay gated pending master review');
assert.match(feccRecord, /languageReviewed:\s*false/, 'Nañu fecc must not be marked language-reviewed');
assert.match(feccRecord, /rightsConfirmed:\s*true/, 'Owner-confirmed rights must be preserved');
assert.match(audioSource, /Yaaye-Sama-Yaay-Version-Masculine\\.mp3/, 'Yaaye masculine alternative must be present');\nconsole.log('Audio validation passed: 29 approved tracks; Nañu fecc safely held for master review.');
