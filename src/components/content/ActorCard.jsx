import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getImageUrl, truncateText } from '../../utils/helpers';

const ActorCard = ({ actor }) => {
  return (
    <Link
      to={`/actor/${actor.id}`}
      className="group block overflow-hidden rounded-2xl border border-slate-200/70 bg-white/75 shadow-[0_25px_60px_-45px_rgba(15,23,42,0.35)] transition hover:-translate-y-1 hover:border-amber-400/70 hover:shadow-[0_30px_70px_-40px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-900/55 dark:shadow-[0_30px_70px_-45px_rgba(0,0,0,0.75)]"
    >
      <div className="relative">
        <img
          src={getImageUrl(actor.profile_path)}
          alt={actor.name}
          className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-70"></div>
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">
          {truncateText(actor.name, 20)}
        </h3>
        <p className="text-[11px] uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
          {actor.known_for_department || 'Actor'}
        </p>
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
