import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

const fetchPopularPeople = async (page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch popular actors');
  return response.json();
};

export const fetchPopularActors = async (page = 1) => {
  const data = await fetchPopularPeople(page);
  return {
    ...data,
    results: data.results.filter((person) => person.known_for_department === 'Acting'),
  };
};

export const fetchActorDetails = async (id) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch actor details');
  return response.json();
};

export const fetchActorMovieCredits = async (id) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/${id}/movie_credits?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch actor credits');
  return response.json();
};
