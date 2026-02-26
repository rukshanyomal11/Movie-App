import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getMoviesByGenre } from '../features/movies/moviesSlice';
import { GENRES } from '../utils/constants';

const FEATURED_GENRE_IDS = [28, 18, 35, 878, 53, 10749];
const FEATURED_GENRES = GENRES.filter((genre) => FEATURED_GENRE_IDS.includes(genre.id));

const Movies = () => {
  const dispatch = useDispatch();
  const { byGenre: movies, status, error } = useSelector((state) => state.movies);
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
  const [page, setPage] = useState(1);
  const selectedGenreLabel = GENRES.find((genre) => genre.id === selectedGenre)?.name ?? 'Genre';

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  useEffect(() => {
    dispatch(getMoviesByGenre({ genreId: selectedGenre, page }));
  }, [dispatch, selectedGenre, page]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Browse</p>
            <h1 className="page-title">Movies</h1>
            <p className="page-subtitle mt-4">
              Choose a genre and dive into curated selections tailored to your mood.
            </p>
          </div>
          <div className="soft-panel relative overflow-hidden">
            <div className="absolute -right-16 -top-20 h-36 w-36 rounded-full bg-amber-300/20 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-sky-300/20 blur-3xl" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/80 to-transparent dark:from-slate-900/70" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Filter</p>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Pick a genre to refresh the grid instantly.
                  </p>
                </div>
                <span className="badge">Genre</span>
              </div>
              <label htmlFor="genre" className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-500">
                Select Genre
              </label>
              <select
                id="genre"
                value={selectedGenre}
                onChange={(e) => handleGenreChange(Number(e.target.value))}
                className="mt-3 w-full rounded-2xl border border-slate-200/70 bg-white/90 px-4 py-3 text-sm font-semibold text-slate-700 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.35)] focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100"
              >
                {GENRES.map((genre) => (
                  <option
                    key={genre.id}
                    value={genre.id}
                    className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100"
                  >
                    {genre.name}
                  </option>
                ))}
              </select>
              <div className="mt-4 flex flex-wrap gap-2">
                {FEATURED_GENRES.map((genre) => (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => handleGenreChange(genre.id)}
                    aria-pressed={selectedGenre === genre.id}
                    className={`rounded-full border px-3 py-1 text-[10px] uppercase tracking-[0.25em] transition ${
                      selectedGenre === genre.id
                        ? 'border-amber-400/70 bg-amber-400/20 text-amber-700 dark:border-amber-300/60 dark:bg-amber-300/10 dark:text-amber-200'
                        : 'border-slate-200/70 bg-white/70 text-slate-500 hover:border-amber-300/60 hover:text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-300'
                    }`}
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                <span>Page {page}</span>
                <span>{selectedGenreLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Explore Titles</h2>
          <span className="badge">Genre Picks</span>
        </div>
        {status === 'loading' && <Loading />}
        {status === 'failed' && <Error message={error} />}
        {status === 'succeeded' && (
          <>
            <div className="grid-cards mb-6">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Previous
              </Button>
              <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Movies;
