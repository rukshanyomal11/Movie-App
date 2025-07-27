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

  if (!query) return <p className="text-center py-8">Please enter a search query.</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      {status === 'loading' && <Loading />}
      {status === 'failed' && <Error message={error} />}
      {status === 'succeeded' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
    </div>
  );
};

export default SearchResults;