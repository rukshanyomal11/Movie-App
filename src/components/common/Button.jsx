import PropTypes from 'prop-types';

const Button = ({ children, onClick, className, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-slate-950 ${
        disabled
          ? 'cursor-not-allowed border border-slate-200/60 bg-slate-100 text-slate-400 shadow-none dark:border-white/10 dark:bg-slate-900/40 dark:text-slate-500'
          : 'border border-slate-900/10 bg-white/80 text-slate-700 shadow-[0_14px_30px_-18px_rgba(15,23,42,0.25)] hover:border-amber-400/70 hover:text-slate-900 hover:shadow-[0_18px_40px_-22px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-200 dark:hover:border-amber-400/60'
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
