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
            className="inline-flex items-center justify-center rounded-full border border-amber-400/60 bg-amber-400/90 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-[0_20px_40px_-25px_rgba(251,191,36,0.75)] transition hover:bg-amber-300"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
