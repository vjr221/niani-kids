import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';

const legacySource = readFileSync(new URL('../src/content.ts', import.meta.url), 'utf8');
const officialSource = readFileSync(new URL('../src/officialSongCatalog.ts', import.meta.url), 'utf8');
const audioSource = readFileSync(new URL('../src/audioCatalog.ts', import.meta.url), 'utf8');
const legacyIds = [...legacySource.matchAll(/\{id:'([^']+)'/g)].map((match) => match[1]);
const officialJson = officialSource.slice(officialSource.indexOf('=') + 1).trim().replace(/;$/, '');
const officialEntries = JSON.parse(officialJson);
const contentIds = new Set([...legacyIds, ...officialEntries.map((entry) => entry.id)]);
const catalogMatch = audioSource.match(/audioCatalog:\s*AudioTrackRecord\[\]\s*=\s*(\[[\s\S]*?\]);/);
assert.ok(catalogMatch, 'Audio catalogue must use the explicit typed array declaration');
const records = JSON.parse(catalogMatch[1]);
assert.equal(records.length, 25, 'Expected 25 WordPress MP3 candidates');
const ids = [];
for (const record of records) {
  assert.ok(record.contentId, 'Every audio record must declare a contentId');
  ids.push(record.contentId);
  assert.ok(contentIds.has(record.contentId), 'Audio record points to unknown content ID: ' + record.contentId);
  assert.ok(record.reviewStatus, 'Missing reviewStatus for ' + record.contentId);
  assert.equal(record.reviewStatus, 'needs-editorial-review', 'No unreviewed audio may be approved');
  assert.equal(record.languageReviewed, false, 'No track has completed language review yet');
  assert.equal(record.rightsConfirmed, false, 'No track has confirmed rights yet');
  assert.ok(record.attachmentId > 0, 'Missing WordPress media attachment for ' + record.contentId);
  assert.match(record.sourceUrl, /^https:\/\/nianikids\.com\/wp-content\/uploads\//, 'Audio URL must point to Niani Kids media library');
  assert.ok(record.notes, 'Add review notes for ' + record.contentId);
}
assert.equal(new Set(ids).size, ids.length, 'Audio catalogue content IDs must be unique');
assert.match(audioSource, /track\.reviewStatus\s*===\s*'approved'/, 'Playback gate must require editorial approval');
assert.match(audioSource, /track\.languageReviewed/, 'Playback gate must require language review');
assert.match(audioSource, /track\.rightsConfirmed/, 'Playback gate must require rights confirmation');
console.log('Audio catalogue validation passed: ' + records.length + ' pending tracks; unique IDs and publication gates verified.');
