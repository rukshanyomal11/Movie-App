import PropTypes from 'prop-types';

const TrailerPlayer = ({ videoKey }) => {
  if (!videoKey) {
    return <p className="text-center text-gray-500">No trailer available</p>;
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
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