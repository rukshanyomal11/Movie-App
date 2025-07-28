import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl, truncateText } from '../../utils/helpers';

const ActorCard = ({ actor }) => {
  return (
<Link to={`/actor/${actor.id}`} className="block rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-white dark:bg-gray-800">
      <img
        src={getImageUrl(actor.profile_path)}
        alt={actor.name}
        className="w-full h-64 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold dark:text-gray-300">{truncateText(actor.name, 20)}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">{actor.known_for_department || 'Actor'}</p>
      </div>
    </Link>
  );
};

ActorCard.propTypes = {
  actor: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    profile_path: PropTypes.string,
    known_for_department: PropTypes.string,
  }).isRequired,
};

export default ActorCard;