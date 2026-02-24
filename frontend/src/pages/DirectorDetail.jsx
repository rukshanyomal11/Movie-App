import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import MovieCard from '../components/content/MovieCard';
import { getDirectorCredits, getDirectorDetails } from '../features/directors/directorsSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate } from '../utils/formatters';

const DirectorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, status, error, credits, creditsStatus, creditsError } = useSelector(
    (state) => state.directors
  );
  const director = details[id];
  const directorCredits = credits[id];
  const creditsState = creditsStatus[id];

  useEffect(() => {
    dispatch(getDirectorDetails(id));
    dispatch(getDirectorCredits(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!director) return <Error message="Director not found" />;

  const directedCredits = (directorCredits?.crew || [])
    .filter((credit) => credit.job === 'Director')
    .sort((a, b) => {
      const dateA = new Date(a.release_date || '1900-01-01').getTime();
      const dateB = new Date(b.release_date || '1900-01-01').getTime();
      return dateB - dateA;
    })
    .reduce((acc, credit) => {
      if (acc.some((item) => item.id === credit.id)) return acc;
      acc.push(credit);
      return acc;
    }, []);

  return (
    <div className="page-shell">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.3em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-amber-400/50 dark:hover:text-white"
        >
          <span>&#8592;</span> Back
        </button>
      </div>
      <div className="page-hero">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={getImageUrl(director.profile_path, 'w500')}
            alt={director.name}
            className="w-full rounded-2xl border border-slate-200/70 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.45)] lg:w-1/3 dark:border-white/10 dark:shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)]"
          />
          <div className="lg:w-2/3">
            <p className="page-kicker">Director</p>
            <h1 className="page-title mt-3">{director.name}</h1>
            <p className="page-subtitle mt-4">{director.biography || 'No biography available.'}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Born</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {formatDate(director.birthday)}
                </p>
              </div>
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Department</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">Directing</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Directed Films</h2>
          <span className="badge">Filmography</span>
        </div>
        {creditsState === 'loading' && <Loading />}
        {creditsState === 'failed' && <Error message={creditsError[id]} />}
        {creditsState === 'succeeded' && directedCredits.length === 0 && (
          <div className="empty-panel">
            <p className="text-sm">No directing credits available.</p>
          </div>
        )}
        {creditsState === 'succeeded' && directedCredits.length > 0 && (
          <div className="grid-cards">
            {directedCredits.map((movie) => (
              <MovieCard key={movie.id} movie={{ ...movie, title: movie.title || movie.name }} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default DirectorDetail;
