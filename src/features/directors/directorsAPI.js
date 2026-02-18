import { TMDB_API_BASE_URL, TMDB_API_KEY } from '../../utils/constants';

const fetchPopularMoviesPage = async (page = 1) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/popular?api_key=${TMDB_API_KEY}&page=${page}`
  );
  if (!response.ok) throw new Error('Failed to fetch popular movies for directors');
  return response.json();
};

const fetchMovieCredits = async (movieId) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/movie/${movieId}/credits?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch movie credits');
  return response.json();
};

const directorsCache = new Map();
const directorsInFlight = new Map();

export const fetchPopularDirectors = async (page = 1) => {
  if (directorsCache.has(page)) return directorsCache.get(page);
  if (directorsInFlight.has(page)) return directorsInFlight.get(page);

  const promise = (async () => {
    const pageSize = 20;
    const targetCount = page * pageSize;
    const maxMoviePages = Math.min(6, Math.max(2, page * 2));
    const directorsById = new Map();
    let currentPage = 1;
    let lastMoviesResponse = {
      page: 1,
      results: [],
      total_pages: 1,
      total_results: 0,
    };

    while (directorsById.size < targetCount && currentPage <= maxMoviePages) {
      const moviesData = await fetchPopularMoviesPage(currentPage);
      lastMoviesResponse = moviesData;

      const creditsSettled = await Promise.allSettled(
        moviesData.results.map((movie) => fetchMovieCredits(movie.id))
      );

      creditsSettled.forEach((result) => {
        if (result.status !== 'fulfilled') return;
        const crew = result.value.crew || [];
        crew
          .filter((person) => person.job === 'Director')
          .forEach((person) => {
            if (!directorsById.has(person.id)) {
              directorsById.set(person.id, {
                id: person.id,
                name: person.name,
                profile_path: person.profile_path,
                known_for_department: person.known_for_department || 'Directing',
              });
            }
          });
      });

      if (currentPage >= moviesData.total_pages) break;
      currentPage += 1;
    }

    const directors = Array.from(directorsById.values());
    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const result = {
      ...lastMoviesResponse,
      results: directors.slice(start, end),
      total_results: directors.length,
    };

    directorsCache.set(page, result);
    return result;
  })();

  directorsInFlight.set(page, promise);

  try {
    return await promise;
  } finally {
    directorsInFlight.delete(page);
  }
};

export const fetchDirectorDetails = async (id) => {
  const response = await fetch(
    `${TMDB_API_BASE_URL}/person/${id}?api_key=${TMDB_API_KEY}`
  );
  if (!response.ok) throw new Error('Failed to fetch director details');
  return response.json();
};
