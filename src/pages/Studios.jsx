const Studios = () => {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Atlas</p>
            <h1 className="page-title">Studios</h1>
            <p className="page-subtitle mt-4">
              Follow the production houses shaping the biggest stories on screen.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">In Progress</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Studio browsing is being curated. Expect deep dives and spotlights soon.
            </p>
          </div>
        </div>
      </div>
      <div className="empty-panel">
        <p className="text-sm">Studio browsing coming soon!</p>
      </div>
    </div>
  );
};

export default Studios;
