import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getMoviesByGenre } from '../features/movies/moviesSlice';
import { GENRES } from '../utils/constants';

const Movies = () => {
  const dispatch = useDispatch();
  const { byGenre: movies, status, error } = useSelector((state) => state.movies);
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
  const [page, setPage] = useState(1);

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
          <div className="soft-panel">
            <label htmlFor="genre" className="text-xs uppercase tracking-[0.3em] text-slate-400">
              Select Genre
            </label>
            <select
              id="genre"
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(Number(e.target.value));
                setPage(1);
              }}
              className="mt-3 w-full rounded-xl border border-slate-200/60 bg-white/80 px-4 py-3 text-sm text-slate-900 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
            >
              {GENRES.map((genre) => (
                <option
                  key={genre.id}
                  value={genre.id}
                  className="bg-white text-slate-900 dark:bg-slate-900 dark:text-slate-100"
                >
                  {genre.name}
                </option>
              ))}
            </select>
            <p className="mt-3 text-xs text-slate-400">
              Page {page} • {GENRES.find((g) => g.id === selectedGenre)?.name}
            </p>
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
