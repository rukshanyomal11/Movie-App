import { useEffect } from 'react';
import PropTypes from 'prop-types';

/**
 * Simple toast notification.
 * Auto-dismisses after `duration` ms (default 4000).
 */
const Toast = ({ message, type = 'error', onClose, duration = 4000 }) => {
  useEffect(() => {
    if (!message) return;
    const id = setTimeout(onClose, duration);
    return () => clearTimeout(id);
  }, [message, duration, onClose]);

  if (!message) return null;

  const colours =
    type === 'error'
      ? 'bg-red-500 text-white'
      : type === 'success'
      ? 'bg-emerald-500 text-white'
      : 'bg-amber-400 text-slate-900';

  return (
    <div
      role="alert"
      className={`fixed bottom-6 left-1/2 z-[9999] -translate-x-1/2 flex items-center gap-3 rounded-2xl px-6 py-4 shadow-2xl text-sm font-medium animate-fade-in-up ${colours}`}
    >
      {type === 'error' && (
        <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </svg>
      )}
      <span>{message}</span>
      <button
        onClick={onClose}
        className="ml-2 rounded-full p-0.5 opacity-70 hover:opacity-100 focus:outline-none"
        aria-label="Dismiss"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
};

Toast.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf(['error', 'success', 'warning']),
  onClose: PropTypes.func.isRequired,
  duration: PropTypes.number,
};

export default Toast;
