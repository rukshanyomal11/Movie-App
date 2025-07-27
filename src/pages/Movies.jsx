import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from '../components/content/MovieCard';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import Button from '../components/common/Button';
import { getMoviesByGenre } from '../features/movies/moviesSlice';
import { GENRES } from '../utils/constants';

const Movies = () => {
  const dispatch = useDispatch();
  const { byGenre: movies, status, error } = useSelector((state) => state.movies);
  const [selectedGenre, setSelectedGenre] = useState(GENRES[0].id);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getMoviesByGenre({ genreId: selectedGenre, page }));
  }, [dispatch, selectedGenre, page]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Movies</h1>

      <div className="mb-6">
        <label htmlFor="genre" className="mr-2">Select Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={(e) => {
            setSelectedGenre(Number(e.target.value));
            setPage(1);
          }}
          className="px-3 py-1 rounded-md border text-black"
        >
          {GENRES.map((genre) => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      {status === 'loading' && <Loading />}
      {status === 'failed' && <Error message={error} />}
      {status === 'succeeded' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <div className="flex justify-center space-x-4">
            <Button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
              Previous
            </Button>
            <Button onClick={() => setPage((prev) => prev + 1)}>Next</Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;