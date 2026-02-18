import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import ActorCard from '../components/content/ActorCard';
import DirectorCard from '../components/content/DirectorCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import { searchContent } from '../features/search/searchSlice';

const SearchResults = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const query = new URLSearchParams(search).get('query');
  const { results, status, error } = useSelector((state) => state.search);

  useEffect(() => {
    if (query) {
      dispatch(searchContent({ query, page: 1 }));
    }
  }, [dispatch, query]);

  if (!query) {
    return (
      <div className="page-shell">
        <div className="empty-panel">
          <p className="text-sm">Please enter a search query.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Search</p>
            <h1 className="page-title">Results</h1>
            <p className="page-subtitle mt-4">
              Showing results for <span className="text-amber-700 dark:text-amber-300">"{query}"</span>
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Tip</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Try a different name, title, or genre to refine your results.
            </p>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Matches</h2>
          <span className="badge">Curated</span>
        </div>
        {status === 'loading' && <Loading />}
        {status === 'failed' && <Error message={error} />}
        {status === 'succeeded' && (
          <div className="grid-cards">
            {results.map((item) => {
              if (item.media_type === 'movie') return <MovieCard key={item.id} movie={item} />;
              if (item.media_type === 'person' && item.known_for_department === 'Acting')
                return <ActorCard key={item.id} actor={item} />;
              if (item.media_type === 'person' && item.known_for_department === 'Directing')
                return <DirectorCard key={item.id} director={item} />;
              return null;
            })}
          </div>
        )}
      </section>
    </div>
  );
};

export default SearchResults;
