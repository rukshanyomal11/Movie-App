import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl, truncateText } from '../../utils/helpers';
import { formatRating } from '../../utils/formatters';

const MovieCard = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`} className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <img
        src={getImageUrl(movie.poster_path)}
        alt={movie.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{truncateText(movie.title, 20)}</h3>
        <p className="text-sm text-gray-600">{formatRating(movie.vote_average)}</p>
      </div>
    </Link>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    poster_path: PropTypes.string,
    vote_average: PropTypes.number,
  }).isRequired,
};

export default MovieCard;