import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DirectorCard from '../components/content/DirectorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getPopularDirectors } from '../features/directors/directorsSlice';

const Directors = () => {
  const dispatch = useDispatch();
  const { popular: directors, status, error } = useSelector((state) => state.directors);
  const [page, setPage] = useState(1);
  const lastFetchedPage = useRef(null);

  useEffect(() => {
    if (lastFetchedPage.current === page) return;
    lastFetchedPage.current = page;
    dispatch(getPopularDirectors(page));
  }, [dispatch, page]);

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Vision</p>
            <h1 className="page-title">Directors</h1>
            <p className="page-subtitle mt-4">
              Explore the storytellers crafting the moments that define cinema.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Spotlight</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Discover visionary creators, acclaimed auteurs, and the voices shaping film today.
            </p>
            <div className="mt-6 glow-divider"></div>
            <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">Page {page}</p>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Popular Directors</h2>
          <span className="badge">Curated</span>
        </div>
        {status === 'loading' && <Loading />}
        {status === 'failed' && <Error message={error} />}
        {status === 'succeeded' && (
          <>
            <div className="grid-cards mb-6">
              {directors.map((director) => (
                <DirectorCard key={director.id} director={director} />
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

export default Directors;
