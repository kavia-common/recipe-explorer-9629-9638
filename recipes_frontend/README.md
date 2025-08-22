# Recipe Explorer Frontend

A modern, clean, light-themed React application to browse, search, view, and bookmark food recipes.

## Features

- Browse recipes in a responsive grid
- Search by recipe name or ingredient
- View detailed recipe pages (ingredients and instructions)
- Bookmark favorite recipes with a sidebar
- Persist bookmarks in browser localStorage
- Light theme with palette: primary #4CAF50, secondary #FF9800, accent #FFFFFF

## Quick Start

1. Install dependencies
   - npm install

2. Configure API base URL (optional)
   - Copy `.env.example` to `.env` and set:
     - REACT_APP_RECIPES_API_BASE=https://your-backend.example.com

   If not set, defaults to `/api`.

3. Run locally
   - npm start
   - Open http://localhost:3000

## Backend Integration

Assumes a backend named recipes_database provides endpoints:
- GET {REACT_APP_RECIPES_API_BASE}/recipes
- GET {REACT_APP_RECIPES_API_BASE}/recipes/search?name=<q>
- GET {REACT_APP_RECIPES_API_BASE}/recipes/search?ingredient=<q>
- GET {REACT_APP_RECIPES_API_BASE}/recipes/:id
- Optional bookmarks sync:
  - POST {REACT_APP_RECIPES_API_BASE}/bookmarks/:id
  - DELETE {REACT_APP_RECIPES_API_BASE}/bookmarks/:id

Configure the base URL with REACT_APP_RECIPES_API_BASE environment variable.

## Scripts

- npm start - start dev server
- npm run build - production build
- npm test - run tests

## Project Structure

- src/components - UI components (Header, SearchBar, RecipeCard, BookmarksSidebar)
- src/pages - Pages (HomePage, RecipeDetailPage)
- src/services - API and storage helpers
- src/App.js - App shell and routing
- src/App.css - Styles

## Notes

- Bookmarks are stored in localStorage and available offline.
- The UI is responsive and adapts from mobile to desktop.
