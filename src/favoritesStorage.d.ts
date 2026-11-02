export type FavoritesStorage = {
  setItem(key: string, value: string): Promise<void>;
};

export function parseFavorites(value: string | null, validIds: ReadonlySet<string>): string[];
export function toggleFavoriteIds(current: readonly string[], id: string, validIds: ReadonlySet<string>): string[];
export function saveFavorites(storage: FavoritesStorage, favorites: readonly string[]): Promise<void>;
