import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="page-shell">
      <div className="page-hero text-center">
        <p className="page-kicker">Lost Reel</p>
        <h1 className="page-title mt-3">404 - Page Not Found</h1>
        <p className="page-subtitle mt-4">The page you're looking for doesn't exist.</p>
        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-[0_20px_40px_-25px_rgba(245,158,11,0.9)] transition hover:from-amber-300 hover:to-amber-400"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
