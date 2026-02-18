import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import TrailerPlayer from '../components/content/TrailerPlayer';
import { getMovieDetails, getMovieVideos } from '../features/movies/moviesSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate, formatRating } from '../utils/formatters';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, videos, status, error } = useSelector((state) => state.movies);
  const movie = details[id];
  const movieVideos = videos[id] || [];

  useEffect(() => {
    dispatch(getMovieDetails(id));
    dispatch(getMovieVideos(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!movie) return <Error message="Movie not found" />;

  // Find the YouTube trailer video key
  const trailer = movieVideos.find(
    (video) => video.type === 'Trailer' && video.site === 'YouTube'
  );
  const videoKey = trailer ? trailer.key : null;

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={getImageUrl(movie.poster_path, 'w500')}
            alt={movie.title}
            className="w-full rounded-2xl border border-white/10 shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)] lg:w-1/3"
          />
          <div className="lg:w-2/3">
            <p className="page-kicker">Movie</p>
            <h1 className="page-title mt-3">{movie.title}</h1>
            <p className="page-subtitle mt-4">{movie.overview}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Release</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {formatDate(movie.release_date)}
                </p>
              </div>
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Rating</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {formatRating(movie.vote_average)}
                </p>
              </div>
              <div className="soft-panel sm:col-span-2">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Genres</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {movie.genres.map((g) => g.name).join(', ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Trailer</h2>
          <span className="badge">Watch</span>
        </div>
        <TrailerPlayer videoKey={videoKey} />
      </section>
    </div>
  );
};

export default MovieDetail;
