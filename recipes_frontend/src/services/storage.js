const STORAGE_KEY = 'recipe_explorer_bookmarks_v1';

// PUBLIC_INTERFACE
export function getBookmarksFromStorage() {
  /** Retrieve bookmarks array from localStorage. */
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveBookmarksToStorage(bookmarks) {
  /** Persist bookmarks to localStorage. */
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks || []));
  } catch {
    // ignore write errors
  }
}
