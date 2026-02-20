# MovieApp

A modern editorial movie discovery app built with React, Vite, Tailwind CSS, Redux Toolkit, and the TMDB API. Browse trending movies, explore actors and directors, filter by genre, and search with live suggestions.

## Features
- Modern editorial UI with light and dark themes
- Sticky navigation with smooth scroll-to-top
- Home page highlights for movies, actors, and directors
- Genre filtering and pagination for movies
- Search page with live dropdown suggestions
- Detail pages for movies, actors, and directors
- Trailer embed support (YouTube)
- Responsive layout across devices

## Tech Stack
- React + Vite
- Tailwind CSS
- Redux Toolkit
- React Router

## Getting Started
1. Install dependencies
   - `npm install`
2. Create a `.env` file in the project root
   - `VITE_TMDB_API_KEY=your_key_here`
3. Run the development server
   - `npm run dev`

## Scripts
- `npm run dev` - start the development server
- `npm run build` - build for production
- `npm run preview` - preview the production build
- `npm run lint` - run ESLint

## Environment Variables
- `VITE_TMDB_API_KEY` - your TMDB API key

## Project Structure
- `src/components` - reusable UI components (cards, layout, common)
- `src/pages` - route pages (Home, Movies, Actors, Directors, Search, etc.)
- `src/features` - Redux slices and API helpers
- `src/styles` - global and custom styles
- `src/utils` - helpers, formatters, and constants

## Notes
- This project uses the TMDB API but is not affiliated with TMDB.
- Some pages are placeholder-only: Trailers, Studios, Countries, Dashboard.

## License
No license specified. Add one if you plan to distribute.
