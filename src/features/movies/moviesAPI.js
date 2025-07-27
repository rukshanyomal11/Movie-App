import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

export const fetchPopularMovies = async (page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch popular movies');
  return response.json();
};

export const fetchMoviesByGenre = async (genreId, page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&with_genres=${genreId}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch movies by genre');
  return response.json();
};

export const fetchMovieDetails = async (id) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie details');
  return response.json();
};