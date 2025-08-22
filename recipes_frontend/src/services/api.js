const API_BASE = process.env.REACT_APP_RECIPES_API_BASE || '/api';

/**
 * Safe fetch wrapper with JSON parsing and error message propagation.
 */
async function apiFetch(url, options = {}) {
  const res = await fetch(url, { headers: { 'Content-Type': 'application/json' }, ...options });
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) msg = data.message;
    } catch (_) { /* ignore */ }
    throw new Error(msg);
  }
  try {
    return await res.json();
  } catch {
    return [];
  }
}

// PUBLIC_INTERFACE
export async function fetchRecipes() {
  /**
   * Fetch a default list of recipes for browsing.
   * Returns an array of recipe summaries.
   */
  try {
    return await apiFetch(`${API_BASE}/recipes`);
  } catch (e) {
    // Fallback to empty list for local UI dev
    return [];
  }
}

// PUBLIC_INTERFACE
export async function searchRecipes(query, mode = 'name') {
  /**
   * Search recipes by name or ingredient.
   * mode: 'name' | 'ingredient'
   */
  const q = encodeURIComponent(query || '');
  const by = mode === 'ingredient' ? 'ingredient' : 'name';
  return apiFetch(`${API_BASE}/recipes/search?${by}=${q}`);
}

// PUBLIC_INTERFACE
export async function fetchRecipeById(id) {
  /**
   * Get full recipe details.
   */
  return apiFetch(`${API_BASE}/recipes/${encodeURIComponent(id)}`);
}

// PUBLIC_INTERFACE
export async function toggleBookmarkOnServer(recipeId, isAdding) {
  /**
   * Optional server bookmark sync. Errors ignored for local UX.
   */
  const endpoint = `${API_BASE}/bookmarks/${encodeURIComponent(recipeId)}`;
  try {
    await apiFetch(endpoint, { method: isAdding ? 'POST' : 'DELETE' });
  } catch {
    // ignore errors in demo mode
  }
}
