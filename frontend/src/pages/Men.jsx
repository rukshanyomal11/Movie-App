const highlightSets = [
  {
    title: 'Action Icons',
    description: 'Hard-hitting performances, kinetic pacing, and the kind of heroes that keep the frame moving.',
  },
  {
    title: 'Noir Confidence',
    description: 'Shadowed streets, slick dialogue, and power plays with a cinematic edge.',
  },
  {
    title: 'Legacy Legends',
    description: 'Classic screen presences and the roles that shaped modern cinema folklore.',
  },
  {
    title: 'New Guard',
    description: 'Fresh faces leading the next wave of blockbusters and genre-defining stories.',
  },
];

const heroStats = [
  { value: '12', label: 'Featured Sets' },
  { value: '100+', label: 'Moments Saved' },
  { value: '16', label: 'Legacy Cuts' },
  { value: '7', label: 'Premieres' },
];

const heroHighlights = ['Legacy Notes', 'Director Cuts', 'Midnight Runs'];

const focusStories = [
  {
    label: 'Midnight Run',
    title: 'City Chases',
    detail: 'High-speed cuts, neon skylines, and the adrenaline of night shoots.',
    tags: ['Neon', 'High Stakes'],
  },
  {
    label: 'Steel Resolve',
    title: 'Tactical Drama',
    detail: 'Gritty, disciplined, and built around precision storytelling.',
    tags: ['Precision', 'Grit'],
  },
  {
    label: 'Slow Burn',
    title: 'Character Depth',
    detail: 'Quiet intensity and layered performances that linger long after the credits.',
    tags: ['Layered', 'Enduring'],
  },
];

const weeklyThemes = ['Arena Anthems', 'Rogue Missions', 'Retro Classics', 'Rising Stars'];

const Men = () => {
  return (
    <div className="page-shell men-page">
      <div className="page-hero men-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Curated Lineup</p>
            <h1 className="page-title">Men</h1>
            <p className="page-subtitle mt-4">
              A refined edit of bold performances, cinematic charisma, and unforgettable screen presence.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge">Spotlight</span>
              <span className="badge">Starring Now</span>
              <span className="badge">Top Picks</span>
            </div>
          </div>
          <div className="soft-panel relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-sky-400/25 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-blue-500/15 blur-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent dark:from-slate-900/70" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Highlights</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Focused selections built for big screens, late-night marathons, and legendary rewatches.
              </p>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/60 bg-white/70 px-4 py-4 text-xs uppercase tracking-[0.2em] text-slate-500 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                  >
                    <p className="font-display text-2xl text-slate-900 dark:text-slate-100">{stat.value}</p>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                {heroHighlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-sky-200/60 bg-sky-100/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-sky-700 dark:border-sky-300/30 dark:bg-sky-300/10 dark:text-sky-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Signature Energy</h2>
          <span className="badge">Editorial</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          {highlightSets.map((item) => (
            <div
              key={item.title}
              className="group relative overflow-hidden rounded-[28px] border border-sky-200/60 bg-white/70 p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_-55px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/50"
            >
              <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-sky-400/20 blur-3xl" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-700/80 dark:text-sky-200/80">
                  {item.title}
                </p>
                <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Focus Stories</h2>
          <span className="badge">Moodboard</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {focusStories.map((story) => (
            <div
              key={story.label}
              className="group relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-gradient-to-br from-slate-900/90 via-slate-800/60 to-amber-500/30 p-6 text-white shadow-[0_30px_90px_-60px_rgba(15,23,42,0.6)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_110px_-70px_rgba(15,23,42,0.7)]"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.2),_transparent_60%)] opacity-80" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">{story.label}</p>
                <h3 className="mt-3 font-display text-2xl text-white">{story.title}</h3>
                <p className="mt-3 text-sm text-slate-200">{story.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-100/90"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Weekly Curation</h2>
          <span className="badge">Handpicked</span>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="relative overflow-hidden rounded-[30px] border border-slate-200/70 bg-white/80 p-6 backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Top Themes</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {weeklyThemes.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-slate-200/60 bg-white/70 px-4 py-4 text-sm text-slate-600 shadow-[0_18px_50px_-40px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="soft-panel relative overflow-hidden">
            <div className="absolute -right-16 -top-20 h-32 w-32 rounded-full bg-sky-300/20 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Up Next</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Expect new arrivals every Friday with special spotlight drops and scene collections.
            </p>
            <div className="mt-6 glow-divider" />
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-500">Schedule</p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Friday • 8:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Men;
