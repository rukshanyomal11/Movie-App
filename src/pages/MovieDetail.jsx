import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';
import TrailerPlayer from '../components/content/TrailerPlayer';
import { getMovieDetails } from '../features/movies/moviesSlice';
import { getImageUrl } from '../utils/helpers';
import { formatDate, formatRating } from '../utils/formatters';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { details, status, error } = useSelector((state) => state.movies);
  const movie = details[id];

  useEffect(() => {
    dispatch(getMovieDetails(id));
  }, [dispatch, id]);

  if (status === 'loading') return <Loading />;
  if (status === 'failed') return <Error message={error} />;
  if (!movie) return <Error message="Movie not found" />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <img
          src={getImageUrl(movie.poster_path, 'w500')}
          alt={movie.title}
          className="w-full md:w-1/3 rounded-lg"
        />
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
          <p className="text-gray-600 mb-2">{movie.overview}</p>
          <p className="mb-2"><strong>Release Date:</strong> {formatDate(movie.release_date)}</p>
          <p className="mb-2"><strong>Rating:</strong> {formatRating(movie.vote_average)}</p>
          <p className="mb-4"><strong>Genres:</strong> {movie.genres.map((g) => g.name).join(', ')}</p>
          <TrailerPlayer videoKey={null} />
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;