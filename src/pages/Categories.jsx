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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Categories</h1>
      <h2 className="text-2xl font-semibold mb-4">{GENRES[0].name}</h2>
      {status === 'loading' && <Loading />}
      {status === 'failed' && <Error message={error} />}
      {status === 'succeeded' && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.slice(0, 10).map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;