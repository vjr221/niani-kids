const FAVORITES_STORAGE_KEY = 'niani-favorites';

function parseFavorites(value, validIds) {
  if (typeof value !== 'string' || value.length === 0) return [];
  try {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) return [];
    return [...new Set(parsed.filter((id) => typeof id === 'string' && validIds.has(id)))];
  } catch {
    return [];
  }
}

function toggleFavoriteIds(current, id, validIds) {
  if (!validIds.has(id)) return [...current];
  return current.includes(id)
    ? current.filter((favoriteId) => favoriteId !== id)
    : [...current, id];
}

async function saveFavorites(storage, favorites) {
  const safeFavorites = [...new Set(favorites.filter((id) => typeof id === 'string'))];
  await storage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(safeFavorites));
}

module.exports = {
  FAVORITES_STORAGE_KEY,
  parseFavorites,
  toggleFavoriteIds,
  saveFavorites,
};
