import React, { useState } from 'react';

// PUBLIC_INTERFACE
export default function SearchBar({ initialQuery = '', onSearch }) {
  /** Search bar for name or ingredient; triggers onSearch(query, filters) */
  const [query, setQuery] = useState(initialQuery);
  const [byIngredient, setByIngredient] = useState(false);

  const trigger = () => onSearch(query.trim(), { byIngredient });

  const onKeyPress = (e) => {
    if (e.key === 'Enter') trigger();
  };

  return (
    <div className="searchbar" role="search">
      <input
        className="input"
        type="text"
        placeholder={byIngredient ? 'Search by ingredient e.g., tomato' : 'Search recipes by name'}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={onKeyPress}
        aria-label="Search recipes"
      />
      <button className="btn" onClick={() => setByIngredient((v) => !v)} aria-pressed={byIngredient}>
        {byIngredient ? 'By Ingredient ✓' : 'By Ingredient'}
      </button>
      <button className="btn btn-primary" onClick={trigger}>Search</button>
    </div>
  );
}
