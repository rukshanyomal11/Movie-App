import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return (
    <div className="flex items-center justify-center py-16">
      <div className="rounded-2xl border border-red-500/40 bg-red-500/10 px-6 py-4 text-center text-sm text-red-200">
        {message || 'Something went wrong!'}
      </div>
    </div>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

Error.defaultProps = {
  message: '',
};

export default Error;
