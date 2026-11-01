import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const approvedHelpers = [...audioSource.matchAll(/approved\('([^']+)'/g)].map((m) => m[1]);
const explicitRecords = [...audioSource.matchAll(/\{\s*contentId:\s*'([^']+)'[\s\S]*?reviewStatus:\s*'([^']+)'[\s\S]*?\}/g)]
  .map((m) => ({ id:m[1], status:m[2] }));
const approved = [...approvedHelpers, ...explicitRecords.filter((record) => record.status === 'approved').map((record) => record.id)];
const pending = explicitRecords.filter((record) => record.status !== 'approved').map((record) => record.id);
const ids = [...approvedHelpers, ...explicitRecords.map((record) => record.id)];
assert.equal(approved.length, 27, \`Expected 27 owner-approved playable tracks; found \${approved.length}\`);
assert.deepEqual(pending, [], 'No audio tracks should remain pending review after the owner confirmation');
assert.equal(ids.length, 27, 'Expected 27 audio/content mappings');
assert.equal(new Set(ids).size, ids.length, 'Audio content IDs must be unique');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback must require rights confirmation');
console.log('Audio validation passed: all 27 tracks are approved and playable.');
