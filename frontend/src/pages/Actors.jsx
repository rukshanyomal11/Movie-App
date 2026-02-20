import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ActorCard from '../components/content/ActorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getPopularActors } from '../features/actors/actorsSlice';

const Actors = () => {
  const dispatch = useDispatch();
  const { popular: actors, status, error } = useSelector((state) => state.actors);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getPopularActors(page));
  }, [dispatch, page]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Cast</p>
            <h1 className="page-title">Actors</h1>
            <p className="page-subtitle mt-4">
              Follow the stars lighting up the screen and their most loved performances.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Highlights</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Browse trending performers, award winners, and rising talent shaping cinema today.
            </p>
            <div className="mt-6 glow-divider"></div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Page {page}</p>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Popular Actors</h2>
          <span className="badge">Trending</span>
        </div>
        {status === 'loading' && <Loading />}
        {status === 'failed' && <Error message={error} />}
        {status === 'succeeded' && (
          <>
            <div className="grid-cards mb-6">
              {actors.map((actor) => (
                <ActorCard key={actor.id} actor={actor} />
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

export default Actors;
