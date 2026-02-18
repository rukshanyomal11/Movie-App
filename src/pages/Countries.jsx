const Countries = () => {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">World Tour</p>
            <h1 className="page-title">Countries</h1>
            <p className="page-subtitle mt-4">
              Explore cinema by region and discover stories from every corner of the globe.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">In Progress</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Country-based browsing is coming soon with curated regional collections.
            </p>
          </div>
        </div>
      </div>
      <div className="empty-panel">
        <p className="text-sm">Country-based browsing coming soon!</p>
      </div>
    </div>
  );
};

export default Countries;
