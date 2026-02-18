const Trailers = () => {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Spotlight</p>
            <h1 className="page-title">Trailers</h1>
            <p className="page-subtitle mt-4">
              Watch the latest previews, teasers, and exclusive first looks.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Coming Soon</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Trailer functionality is on the way. Stay tuned for weekly drops.
            </p>
          </div>
        </div>
      </div>
      <div className="empty-panel">
        <p className="text-sm">Trailer functionality coming soon!</p>
      </div>
    </div>
  );
};

export default Trailers;
