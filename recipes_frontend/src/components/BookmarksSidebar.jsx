import React from 'react';

// PUBLIC_INTERFACE
export default function BookmarksSidebar({ isOpen, bookmarks, onOpenRecipe, onRemove, onClose }) {
  /** Sidebar to display bookmarked recipes and quick actions. */
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-label="Bookmarks">
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:12}}>
        <h3>Bookmarked</h3>
        <button className="btn" onClick={onClose} aria-label="Close bookmarks sidebar">Close</button>
      </div>
      <div className="bookmark-list" role="list">
        {bookmarks.length === 0 && (
          <div style={{color:'#6B7280', fontSize:14}}>
            You have no bookmarks yet. Click "Save" on a recipe to add it here.
          </div>
        )}
        {bookmarks.map((r) => (
          <div key={r.id} className="bookmark-item" role="listitem">
            <img className="bookmark-thumb" src={r.image || ''} alt={r.title} />
            <div>
              <div className="bookmark-title">{r.title}</div>
              {r.readyInMinutes ? (
                <div style={{fontSize:12, color:'#6B7280'}}>⏱ {r.readyInMinutes} mins</div>
              ) : null}
            </div>
            <div className="bookmark-cta">
              <button className="btn btn-primary" onClick={() => onOpenRecipe(r.id)}>Open</button>
              <button className="btn" onClick={() => onRemove(r.id)} aria-label={`Remove ${r.title} from bookmarks`}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
