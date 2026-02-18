import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { getMoviesByGenre } from '../features/movies/moviesSlice';
import { GENRES } from '../utils/constants';

const Categories = () => {
  const dispatch = useDispatch();
  const { byGenre: movies, status, error } = useSelector((state) => state.movies);

  useEffect(() => {
    // Fetch movies for the first genre as default
    dispatch(getMoviesByGenre({ genreId: GENRES[0].id, page: 1 }));
  }, [dispatch]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Collections</p>
            <h1 className="page-title">Categories</h1>
            <p className="page-subtitle mt-4">
              Dive into themed selections crafted to match your mood and curiosity.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Featured Genre</p>
            <p className="mt-3 font-display text-3xl text-slate-900 dark:text-slate-100">
              {GENRES[0].name}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              A spotlight list to kick off your next movie night.
            </p>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">{GENRES[0].name} Picks</h2>
          <span className="badge">Curated</span>
        </div>
        {status === 'loading' && <Loading />}
        {status === 'failed' && <Error message={error} />}
        {status === 'succeeded' && (
          <div className="grid-cards">
            {movies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Categories;
