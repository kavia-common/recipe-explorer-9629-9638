import React, { useMemo, useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import './index.css';
import HomePage from './pages/HomePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import BookmarksSidebar from './components/BookmarksSidebar';
import { getBookmarksFromStorage, saveBookmarksToStorage } from './services/storage';
import { AppHeader } from './components/Header';

/**
 * Root layout that includes header, sidebar and route outlet.
 */
function AppShell() {
  const navigate = useNavigate();
  const [bookmarks, setBookmarks] = useState(() => getBookmarksFromStorage());
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    saveBookmarksToStorage(bookmarks);
  }, [bookmarks]);

  const addBookmark = useCallback((recipe) => {
    setBookmarks((prev) => {
      if (prev.find((r) => r.id === recipe.id)) return prev;
      return [...prev, recipe];
    });
  }, []);

  const removeBookmark = useCallback((id) => {
    setBookmarks((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const onOpenRecipe = useCallback((id) => {
    navigate(`/recipe/${id}`);
    setIsSidebarOpen(false);
  }, [navigate]);

  const contextValue = useMemo(() => ({
    bookmarks,
    addBookmark,
    removeBookmark,
    onOpenRecipe
  }), [bookmarks, addBookmark, removeBookmark, onOpenRecipe]);

  return (
    <div className="app-root" data-theme="light">
      <AppHeader onToggleSidebar={() => setIsSidebarOpen((o) => !o)} />
      <div className="layout">
        <BookmarksSidebar
          isOpen={isSidebarOpen}
          bookmarks={bookmarks}
          onOpenRecipe={onOpenRecipe}
          onRemove={removeBookmark}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="content">
          <Routes>
            <Route index element={<HomePage bookmarkContext={contextValue} />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage bookmarkContext={contextValue} />} />
          </Routes>
        </main>
      </div>
      <footer className="footer">Recipe Explorer • Powered by Recipes Database</footer>
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  /** App wraps Router for route handling. */
  return (
    <Router>
      <AppShell />
    </Router>
  );
}

export default App;
