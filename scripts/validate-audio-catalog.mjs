import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const legacySource = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const officialSource = readFileSync(new URL('../src/officialSongCatalog.ts', import.meta.url), 'utf8');
const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');

const legacyIds = new Set([...legacySource.matchAll(/\{id:'([^']+)'/g)].map((m) => m[1]));
const officialIds = new Set([
  ...officialSource.matchAll(/["']id["']\s*:\s*["']([^"']+)["']/g),
].map((m) => m[1]));
assert.ok(legacyIds.size > 0, 'Legacy content catalogue must contain at least one item');
assert.equal(officialIds.size, 25, 'Official song catalogue must contain the 25 agreed versions');

const candidateMatch = audioSource.match(/const candidateTracks:\s*AudioTrackRecord\[\]\s*=\s*\[([\s\S]*?)\];/);
const masterMatch = audioSource.match(/const separateMasters:\s*AudioTrackRecord\[\]\s*=\s*\[([\s\S]*?)\];/);
assert.ok(candidateMatch, 'Audio registry must declare candidateTracks');
assert.ok(masterMatch, 'Audio registry must declare separateMasters');

const readRecords = (source) => [...source.matchAll(/\{([\s\S]*?)\}/g)].map((m) => m[1]);
const candidates = readRecords(candidateMatch[1]);
const masters = readRecords(masterMatch[1]);
assert.equal(candidates.length, 25, 'There must be 25 candidate tracks');
assert.equal(masters.length, 3, 'There must be exactly three separate reference masters');

const candidateIds = [];
for (const record of candidates) {
  const id = record.match(/contentId:\s*['"]([^'"]+)['"]/);
  assert.ok(id, 'Every candidate must declare a contentId');
  candidateIds.push(id[1]);
  assert.ok(officialIds.has(id[1]), 'Candidate points to an unknown official song ID: ' + id[1]);
  const assetPath = record.match(/assetPath:\s*['"]([^'"]+)['"]/);
  const status = record.match(/reviewStatus:\s*['"]([^'"]+)['"]/);
  const languageReviewed = record.match(/languageReviewed:\s*(true|false)/);
  const rightsConfirmed = record.match(/rightsConfirmed:\s*(true|false)/);
  assert.ok(status, 'Missing reviewStatus for ' + id[1]);
  assert.ok(languageReviewed, 'Missing languageReviewed for ' + id[1]);
  assert.ok(rightsConfirmed, 'Missing rightsConfirmed for ' + id[1]);
  assert.match(record, /notes:\s*['"][^'"]+['"]/, 'Add review notes for ' + id[1]);
  if (status[1] === 'approved') {
    assert.ok(assetPath, 'Approved track must have an assetPath: ' + id[1]);
    assert.equal(languageReviewed[1], 'true', 'Approved track must have language reviewed: ' + id[1]);
    assert.equal(rightsConfirmed[1], 'true', 'Approved track must have rights confirmed: ' + id[1]);
  }
}
assert.equal(new Set(candidateIds).size, candidateIds.length, 'Candidate content IDs must be unique');

for (const record of masters) {
  assert.match(record, /audioKind:\s*['"]separate-master['"]/, 'Every reference master must remain separate');
  assert.match(record, /reviewStatus:\s*['"](needs-identification|needs-editorial-review)['"]/, 'Reference masters must stay unapproved until reviewed');
  assert.match(record, /languageReviewed:\s*false/, 'Reference master language must not be pre-approved');
  assert.match(record, /rightsConfirmed:\s*false/, 'Reference master rights must not be pre-approved');
  assert.match(record, /sourceFileName:\s*['"][^'"]+['"]/, 'Reference master must retain its original filename');
}
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback gate must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback gate must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback gate must require rights confirmation');

console.log('Audio catalogue validation passed: 25 candidate tracks, 3 separate masters, unique IDs and publication gates verified.');
