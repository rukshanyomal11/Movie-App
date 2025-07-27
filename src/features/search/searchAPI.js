import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

export const searchMulti = async (query, page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/search/multi?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch search results');
  return response.json();
};