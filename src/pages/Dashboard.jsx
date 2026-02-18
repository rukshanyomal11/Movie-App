const Dashboard = () => {
  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Profile</p>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle mt-4">
              Your watchlist, saved searches, and personalized insights will live here.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Coming Soon</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Personalization tools are in progress. Check back for updates.
            </p>
          </div>
        </div>
      </div>
      <div className="empty-panel">
        <p className="text-sm">User dashboard coming soon!</p>
      </div>
    </div>
  );
};

export default Dashboard;
