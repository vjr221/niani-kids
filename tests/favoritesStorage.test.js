const test = require('node:test');
const assert = require('node:assert/strict');
const {
  FAVORITES_STORAGE_KEY,
  parseFavorites,
  toggleFavoriteIds,
  saveFavorites,
} = require('../src/favoritesStorage');

const validIds = new Set(['song-1', 'song-2', 'story-1']);

test('parseFavorites returns an empty list for missing or malformed storage', () => {
  assert.deepEqual(parseFavorites(null, validIds), []);
  assert.deepEqual(parseFavorites('', validIds), []);
  assert.deepEqual(parseFavorites('{broken', validIds), []);
  assert.deepEqual(parseFavorites('{"not":"an array"}', validIds), []);
});

test('parseFavorites removes unknown IDs, invalid values and duplicates', () => {
  assert.deepEqual(
    parseFavorites(JSON.stringify(['song-1', 'unknown', 42, 'song-1', 'story-1']), validIds),
    ['song-1', 'story-1'],
  );
});

test('toggleFavoriteIds adds and removes without mutating the previous list', () => {
  const original = ['song-1'];
  const added = toggleFavoriteIds(original, 'song-2', validIds);
  assert.deepEqual(added, ['song-1', 'song-2']);
  assert.deepEqual(original, ['song-1']);
  assert.deepEqual(toggleFavoriteIds(added, 'song-1', validIds), ['song-2']);
});

test('toggleFavoriteIds ignores IDs absent from the current catalogue', () => {
  assert.deepEqual(toggleFavoriteIds(['song-1'], 'missing', validIds), ['song-1']);
});

test('saveFavorites stores unique string IDs under the stable storage key', async () => {
  const writes = [];
  const storage = { async setItem(key, value) { writes.push([key, value]); } };
  await saveFavorites(storage, ['song-1', 'song-1', 7, 'song-2']);
  assert.deepEqual(writes, [[FAVORITES_STORAGE_KEY, '["song-1","song-2"]']]);
});

test('saveFavorites propagates storage errors to its caller', async () => {
  const storage = { async setItem() { throw new Error('disk unavailable'); } };
  await assert.rejects(saveFavorites(storage, ['song-1']), /disk unavailable/);
});
