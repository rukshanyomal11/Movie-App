import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import MovieCard from '../components/content/MovieCard';
import { getActorCredits, getActorDetails } from '../features/actors/actorsSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate } from '../utils/formatters';

const ActorDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, status, error, credits, creditsStatus, creditsError } = useSelector(
    (state) => state.actors
  );
  const actor = details[id];
  const actorCredits = credits[id];
  const creditsState = creditsStatus[id];

  useEffect(() => {
    dispatch(getActorDetails(id));
    dispatch(getActorCredits(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!actor) return <Error message="Actor not found" />;

  const actingCredits = (actorCredits?.cast || [])
    .filter((credit) => credit.title)
    .sort((a, b) => {
      const dateA = new Date(a.release_date || '1900-01-01').getTime();
      const dateB = new Date(b.release_date || '1900-01-01').getTime();
      return dateB - dateA;
    });

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="flex flex-col gap-8 lg:flex-row">
          <img
            src={getImageUrl(actor.profile_path, 'w500')}
            alt={actor.name}
            className="w-full rounded-2xl border border-slate-200/70 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.45)] lg:w-1/3 dark:border-white/10 dark:shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)]"
          />
          <div className="lg:w-2/3">
            <p className="page-kicker">Actor</p>
            <h1 className="page-title mt-3">{actor.name}</h1>
            <p className="page-subtitle mt-4">{actor.biography || 'No biography available.'}</p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Born</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {formatDate(actor.birthday)}
                </p>
              </div>
              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Department</p>
                <p className="mt-2 text-sm text-slate-900 dark:text-slate-100">
                  {actor.known_for_department || 'Acting'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Acting Credits</h2>
          <span className="badge">Filmography</span>
        </div>
        {creditsState === 'loading' && <Loading />}
        {creditsState === 'failed' && <Error message={creditsError[id]} />}
        {creditsState === 'succeeded' && actingCredits.length === 0 && (
          <div className="empty-panel">
            <p className="text-sm">No acting credits available.</p>
          </div>
        )}
        {creditsState === 'succeeded' && actingCredits.length > 0 && (
          <div className="grid-cards">
            {actingCredits.map((movie) => (
              <MovieCard key={movie.id} movie={{ ...movie, title: movie.title || movie.name }} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ActorDetail;
