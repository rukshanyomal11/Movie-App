import PropTypes from 'prop-types';

const Error = ({ message }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <p className="text-red-500 text-lg">{message || 'Something went wrong!'}</p>
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