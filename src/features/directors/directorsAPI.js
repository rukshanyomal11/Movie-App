import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

export const fetchPopularDirectors = async (page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch popular directors');
  const data = await response.json();
  // Note: TMDb doesn't have a direct "directors" endpoint. Filter for directors or use /movie/{id}/credits.
  return data;
};

export const fetchDirectorDetails = async (id) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch director details');
  return response.json();
};