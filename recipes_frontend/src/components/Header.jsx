import React from 'react';

// PUBLIC_INTERFACE
export function AppHeader({ onToggleSidebar }) {
  /** Top header with brand and actions. */
  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <div className="brand" aria-label="Recipe Explorer">
          <span className="brand-badge" aria-hidden>R</span>
          <span className="brand-title">Recipe Explorer</span>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={onToggleSidebar} aria-label="Toggle bookmarks sidebar">
            ⭐ Bookmarks
          </button>
          <a className="btn btn-secondary" href="https://reactjs.org" target="_blank" rel="noreferrer">
            Help
          </a>
        </div>
      </div>
    </header>
  );
}
