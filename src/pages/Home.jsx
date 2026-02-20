import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import ActorCard from '../components/content/ActorCard';
import DirectorCard from '../components/content/DirectorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { getNowPlayingMovies, getPopularMovies } from '../features/movies/moviesSlice';
import { getPopularActors } from '../features/actors/actorsSlice';
import { getPopularDirectors } from '../features/directors/directorsSlice';

const MOVIE_FEEDS = [
  { value: 'popular', label: 'Popular', title: 'Popular Movies', badge: 'Top 10' },
  { value: 'nowPlaying', label: 'New Releases', title: 'New Movies', badge: 'Now Playing' },
];

const Home = () => {
  const dispatch = useDispatch();
  const { popular: movies, nowPlaying, status: movieStatus, error: movieError } = useSelector(
    (state) => state.movies
  );
  const { popular: actors, status: actorStatus, error: actorError } = useSelector((state) => state.actors);
  const { popular: directors, status: directorStatus, error: directorError } = useSelector((state) => state.directors);
  const [movieFeed, setMovieFeed] = useState(MOVIE_FEEDS[0].value);
  const activeFeed = MOVIE_FEEDS.find((feed) => feed.value === movieFeed) ?? MOVIE_FEEDS[0];
  const activeMovies = movieFeed === 'nowPlaying' ? nowPlaying : movies;

  useEffect(() => {
    dispatch(getPopularActors(1));
    dispatch(getPopularDirectors(1));
  }, [dispatch]);

  useEffect(() => {
    if (movieFeed === 'nowPlaying') {
      dispatch(getNowPlayingMovies(1));
      return;
    }
    dispatch(getPopularMovies(1));
  }, [dispatch, movieFeed]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Now Streaming</p>
            <h1 className="page-title">Your Front Row to Cinema</h1>
            <p className="page-subtitle mt-4">
              Discover trending films, iconic performances, and visionary directors curated for you.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge">Trending</span>
              <span className="badge">New Releases</span>
              <span className="badge">Award Winners</span>
            </div>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Featured</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Jump into hand-picked lists, new trailers, and fresh discoveries updated every day.
            </p>
            <div className="mt-6 glow-divider"></div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
              <div>
                <p className="font-display text-2xl text-slate-900 dark:text-slate-100">Spotlight</p>
                <p>Curated picks</p>
              </div>
              <div>
                <p className="font-display text-2xl text-slate-900 dark:text-slate-100">Premieres</p>
                <p>Fresh drops</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">{activeFeed.title}</h2>
          <div className="flex flex-wrap items-center gap-3">
            <span className="badge">{activeFeed.badge}</span>
            <label htmlFor="movie-feed" className="sr-only">
              Movie feed
            </label>
            <select
              id="movie-feed"
              value={movieFeed}
              onChange={(event) => setMovieFeed(event.target.value)}
              className="rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/70 dark:text-slate-100"
            >
              {MOVIE_FEEDS.map((feed) => (
                <option
                  key={feed.value}
                  value={feed.value}
                  className="bg-white text-slate-700 dark:bg-slate-900 dark:text-slate-100"
                >
                  {feed.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {movieStatus === 'loading' && <Loading />}
        {movieStatus === 'failed' && <Error message={movieError} />}
        {movieStatus === 'succeeded' && (
          <div className="grid-cards">
            {activeMovies.slice(0, 10).map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Popular Actors</h2>
          <span className="badge">Fan Favorites</span>
        </div>
        {actorStatus === 'loading' && <Loading />}
        {actorStatus === 'failed' && <Error message={actorError} />}
        {actorStatus === 'succeeded' && (
          <div className="grid-cards">
            {actors.slice(0, 10).map((actor) => (
              <ActorCard key={actor.id} actor={actor} />
            ))}
          </div>
        )}
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Popular Directors</h2>
          <span className="badge">Visionaries</span>
        </div>
        {directorStatus === 'loading' && <Loading />}
        {directorStatus === 'failed' && <Error message={directorError} />}
        {directorStatus === 'succeeded' && (
          <div className="grid-cards">
            {directors.slice(0, 10).map((director) => (
              <DirectorCard key={director.id} director={director} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
