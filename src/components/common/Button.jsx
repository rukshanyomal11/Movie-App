import PropTypes from 'prop-types';

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 shadow-[0_15px_40px_-25px_rgba(245,158,11,0.9)] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
        disabled
          ? 'cursor-not-allowed bg-slate-400/50 text-slate-700 shadow-none'
          : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400'
      } ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  onClick: () => {},
  className: '',
  disabled: false,
};

export default Button;
