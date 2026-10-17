import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const contentSource = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const contentIds = new Set([...contentSource.matchAll(/\{id:'([^']+)'/g)].map((match) => match[1]));
assert.ok(contentIds.size > 0, 'Content catalogue must contain at least one item');
const catalogMatch = audioSource.match(/audioCatalog:\s*AudioTrackRecord\[\]\s*=\s*\[([\s\S]*?)\];/);
assert.ok(catalogMatch, 'Audio catalogue must use the explicit typed array declaration');
const records = [...catalogMatch[1].matchAll(/\{([\s\S]*?)\}/g)].map((match) => match[1]);
const ids = [];
for (const record of records) {
  const contentId = record.match(/contentId:\s*['"]([^'"]+)['"]/);
  assert.ok(contentId, 'Every audio record must declare a contentId');
  ids.push(contentId[1]);
  assert.ok(contentIds.has(contentId[1]), 'Audio record points to unknown content ID: ' + contentId[1]);
  const assetPath = record.match(/assetPath:\s*['"]([^'"]+)['"]/);
  const status = record.match(/reviewStatus:\s*['"]([^'"]+)['"]/);
  const languageReviewed = record.match(/languageReviewed:\s*(true|false)/);
  const rightsConfirmed = record.match(/rightsConfirmed:\s*(true|false)/);
  assert.ok(status, 'Missing reviewStatus for ' + contentId[1]);
  assert.ok(languageReviewed, 'Missing languageReviewed for ' + contentId[1]);
  assert.ok(rightsConfirmed, 'Missing rightsConfirmed for ' + contentId[1]);
  assert.match(record, /notes:\s*['"][^'"]+['"]/, 'Add review notes for ' + contentId[1]);
  if (status[1] === 'approved') {
    assert.ok(assetPath, 'Approved track must have an assetPath: ' + contentId[1]);
    assert.equal(languageReviewed[1], 'true', 'Approved track must have language reviewed: ' + contentId[1]);
    assert.equal(rightsConfirmed[1], 'true', 'Approved track must have rights confirmed: ' + contentId[1]);
  }
}
assert.equal(new Set(ids).size, ids.length, 'Audio catalogue content IDs must be unique');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback gate must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback gate must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback gate must require rights confirmation');
console.log('Audio catalogue validation passed: ' + records.length + ' records; unique IDs and publication gates verified.');
