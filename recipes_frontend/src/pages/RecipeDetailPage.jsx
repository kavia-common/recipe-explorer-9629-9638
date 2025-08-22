import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchRecipeById } from '../services/api';

/**
 * Recipe detail page with ingredients and steps.
 */
export default function RecipeDetailPage({ bookmarkContext }) {
  const { id } = useParams();
  const { bookmarks, addBookmark, removeBookmark } = bookmarkContext;
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const isBookmarked = useMemo(() => bookmarks.some(b => String(b.id) === String(id)), [bookmarks, id]);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    fetchRecipeById(id)
      .then((data) => { if (alive) setRecipe(data); })
      .catch((e) => { if (alive) setError(e.message || 'Failed to load recipe'); })
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [id]);

  const toggleBookmark = () => {
    if (!recipe) return;
    if (isBookmarked) {
      removeBookmark(recipe.id);
    } else {
      addBookmark({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
        readyInMinutes: recipe.readyInMinutes,
      });
    }
  };

  if (loading) return <div className="main-container"><div className="section">Loading...</div></div>;
  if (error) return <div className="main-container"><div className="section" style={{borderLeft:'4px solid #EF4444', color:'#991B1B'}}>{error}</div></div>;
  if (!recipe) return <div className="main-container"><div className="section">Recipe not found.</div></div>;

  return (
    <div className="main-container">
      <div style={{display:'flex', gap:10, marginBottom:12}}>
        <Link className="btn" to="/">← Back</Link>
        <button className="btn btn-primary" onClick={toggleBookmark}>
          {isBookmarked ? '⭐ Bookmarked' : '☆ Bookmark'}
        </button>
      </div>
      <div className="detail-hero">
        <img className="detail-image" src={recipe.image || ''} alt={recipe.title} />
        <div className="detail-panel">
          <h2 style={{margin:'0 0 4px 0'}}>{recipe.title}</h2>
          <div style={{display:'flex', gap:8, flexWrap:'wrap'}}>
            {recipe.readyInMinutes && <span className="badge">⏱ {recipe.readyInMinutes} mins</span>}
            {recipe.servings && <span className="badge">🍽 {recipe.servings} servings</span>}
            {recipe.cuisine && <span className="badge" style={{background:'rgba(255,152,0,0.12)', color:'#B45309'}}>🌎 {recipe.cuisine}</span>}
          </div>
          {recipe.summary && (
            <div style={{fontSize:14, color:'#4B5563'}} dangerouslySetInnerHTML={{ __html: recipe.summary }} />
          )}
        </div>
      </div>

      <div className="section">
        <h3>Ingredients</h3>
        <ul>
          {(recipe.ingredients || recipe.extendedIngredients || []).map((ing, idx) => (
            <li key={idx}>
              {typeof ing === 'string' ? ing : (ing.original || `${ing.amount || ''} ${ing.unit || ''} ${ing.name || ''}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="section">
        <h3>Instructions</h3>
        {Array.isArray(recipe.instructions)
          ? (
            <ol>
              {recipe.instructions.map((step, idx) => <li key={idx}>{step}</li>)}
            </ol>
          )
          : (
            <div style={{fontSize:14}} dangerouslySetInnerHTML={{ __html: recipe.instructions || 'No instructions available.' }} />
          )
        }
      </div>
    </div>
  );
}
