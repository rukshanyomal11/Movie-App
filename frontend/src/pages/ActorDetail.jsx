import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import MovieCard from '../components/content/MovieCard';
import { getActorCredits, getActorDetails } from '../features/actors/actorsSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate } from '../utils/formatters';

const splitBiography = (text) => {
  if (!text) return { intro: '', highlights: [], paragraphs: [] };
  const normalized = text.replace(/\s+/g, ' ').trim();
  if (!normalized) return { intro: '', highlights: [], paragraphs: [] };

  const sentences = normalized.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [normalized];
  const trimmed = sentences.map((sentence) => sentence.trim()).filter(Boolean);

  if (trimmed.length <= 2) {
    return { intro: normalized, highlights: [], paragraphs: [] };
  }

  const intro = trimmed.slice(0, 2).join(' ');
  const remaining = trimmed.slice(2);
  const highlightCount = remaining.length >= 4 ? Math.min(4, remaining.length) : remaining.length >= 2 ? 2 : 0;
  const highlights = remaining.slice(0, highlightCount);
  const rest = remaining.slice(highlightCount);

  const paragraphs = [];
  for (let i = 0; i < rest.length; i += 3) {
    paragraphs.push(rest.slice(i, i + 3).join(' '));
  }

  return { intro, highlights, paragraphs };
};

const ActorDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { details, status, error, credits, creditsStatus, creditsError } = useSelector(
    (state) => state.actors
  );
  const actor = details[id];
  const actorCredits = credits[id];
  const creditsState = creditsStatus[id];
  const biography = splitBiography(actor?.biography);

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
            src={getImageUrl(actor.profile_path, 'w500')}
            alt={actor.name}
            className="w-full rounded-2xl border border-slate-200/70 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.45)] lg:w-1/3 dark:border-white/10 dark:shadow-[0_25px_60px_-45px_rgba(0,0,0,0.8)]"
          />
            <div className="lg:w-2/3">
              <p className="page-kicker">Actor</p>
              <h1 className="page-title mt-3">{actor.name}</h1>
              <div className="page-subtitle mt-4 space-y-4">
                {biography.intro ? (
                  <p className="leading-relaxed">{biography.intro}</p>
                ) : (
                  <p className="leading-relaxed">No biography available.</p>
                )}
                {biography.highlights.length > 0 && (
                  <ul className="space-y-2">
                    {biography.highlights.map((highlight, index) => (
                      <li key={`${actor.id}-highlight-${index}`} className="flex gap-3">
                        <span className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-amber-400/80 dark:bg-amber-300" />
                        <span className="leading-relaxed">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {biography.paragraphs.map((paragraph, index) => (
                  <p key={`${actor.id}-paragraph-${index}`} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
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
