import PropTypes from 'prop-types';

const TrailerPlayer = ({ videoKey }) => {
  if (!videoKey) {
    return <p className="text-center text-sm text-slate-400">No trailer available</p>;
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)]"
      style={{ paddingBottom: '56.25%' }}
    >
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="Trailer"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

TrailerPlayer.propTypes = {
  videoKey: PropTypes.string,
};

TrailerPlayer.defaultProps = {
  videoKey: null,
};

export default TrailerPlayer;
