import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl, truncateText } from '../../utils/helpers';

const DirectorCard = ({ director }) => {
  return (
    <Link to={`/director/${director.id}`} className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white">
      <img
        src={getImageUrl(director.profile_path)}
        alt={director.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{truncateText(director.name, 20)}</h3>
        <p className="text-sm text-gray-600">Director</p>
      </div>
    </Link>
  );
};

DirectorCard.propTypes = {
  director: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
  }).isRequired,
};

export default DirectorCard;