import React from 'react';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe, onOpen, onBookmark, isBookmarked }) {
  /** Card view of a recipe item with CTA. */
  return (
    <article className="card">
      <img className="card-media" src={recipe.image || ''} alt={recipe.title} />
      <div className="card-body">
        <span className="badge">🍽 {recipe.servings || 1} servings</span>
        <h3 className="card-title">{recipe.title}</h3>
        {recipe.summary ? (
          <p className="card-desc" dangerouslySetInnerHTML={{ __html: recipe.summary.slice(0, 120) + '...' }} />
        ) : (
          <p className="card-desc">{recipe.description || 'A delicious recipe to try at home.'}</p>
        )}
      </div>
      <div className="card-actions">
        <button className="btn btn-primary" onClick={() => onOpen(recipe.id)}>View</button>
        <button className="btn" onClick={() => onBookmark(recipe)}>
          {isBookmarked ? '⭐ Saved' : '☆ Save'}
        </button>
      </div>
    </article>
  );
}
