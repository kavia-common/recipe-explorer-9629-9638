import React, { useEffect, useState, useMemo } from 'react';
import SearchBar from '../components/SearchBar';
import RecipeCard from '../components/RecipeCard';
import { fetchRecipes, searchRecipes } from '../services/api';

/**
 * Home page shows search and recipe list.
 */
export default function HomePage({ bookmarkContext }) {
  const { bookmarks, addBookmark, onOpenRecipe } = bookmarkContext;
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState('');

  const bookmarkedIds = useMemo(() => new Set(bookmarks.map(b => b.id)), [bookmarks]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchRecipes()
      .then((data) => { if (alive) setRecipes(data); })
      .catch((e) => { if (alive) setError(e.message || 'Failed to load'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, []);

  const doSearch = (q, opts) => {
    setLoading(true);
    setError('');
    searchRecipes(q, opts?.byIngredient === true ? 'ingredient' : 'name')
      .then(setRecipes)
      .catch((e) => setError(e.message || 'Search failed'))
      .finally(() => setLoading(false));
  };

  return (
    <div className="main-container">
      <SearchBar onSearch={doSearch} />
      {error && (
        <div className="section" style={{borderLeft: '4px solid #EF4444', color:'#991B1B'}}>
          {error}
        </div>
      )}
      {loading ? (
        <div className="section">Loading recipes...</div>
      ) : (
        <div className="grid" aria-live="polite">
          {recipes.map((r) => (
            <RecipeCard
              key={r.id}
              recipe={r}
              onOpen={onOpenRecipe}
              onBookmark={addBookmark}
              isBookmarked={bookmarkedIds.has(r.id)}
            />
          ))}
          {recipes.length === 0 && (
            <div className="section">No recipes found. Try another search.</div>
          )}
        </div>
      )}
    </div>
  );
}
