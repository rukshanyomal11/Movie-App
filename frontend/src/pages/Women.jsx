const highlightSets = [
  {
    title: 'Leading Icons',
    description: 'Magnetic performances, daring choices, and characters that command the story.',
  },
  {
    title: 'Rising Voices',
    description: 'Fresh talent redefining genres and delivering unforgettable on-screen energy.',
  },
  {
    title: 'Festival Favorites',
    description: 'Critically celebrated roles and the quiet power of prestige cinema.',
  },
  {
    title: 'Global Stars',
    description: 'International performances shaping the next era of blockbuster storytelling.',
  },
];

const heroStats = [
  { value: '9', label: 'Curated Lists' },
  { value: '80+', label: 'Scene Notes' },
  { value: '24', label: 'On-Set Diaries' },
  { value: '5', label: 'Premieres' },
];

const heroHighlights = ['Editorial Notes', 'Behind the Lens', 'Composer Picks'];

const focusStories = [
  {
    label: 'Golden Hour',
    title: 'Radiant Stories',
    detail: 'Warm palettes, emotional arcs, and intimate moments that resonate.',
    tags: ['Tender', 'Luminous'],
  },
  {
    label: 'Electric Edge',
    title: 'Bold Choices',
    detail: 'Fearless roles with striking visuals and genre-bending momentum.',
    tags: ['Provocative', 'Modern'],
  },
  {
    label: 'Soft Power',
    title: 'Quiet Strength',
    detail: 'Measured performances where every frame speaks volumes.',
    tags: ['Subtle', 'Poised'],
  },
];

const weeklyThemes = ['Trailblazers', 'Modern Mythos', 'Indie Icons', 'Future Leading'];

const Women = () => {
  return (
    <div className="page-shell women-page">
      <div className="page-hero women-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Curated Lineup</p>
            <h1 className="page-title">Women</h1>
            <p className="page-subtitle mt-4">
              Celebrating leading voices, unforgettable portrayals, and the creative force behind modern cinema.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="badge">Spotlight</span>
              <span className="badge">New Wave</span>
              <span className="badge">Award Ready</span>
            </div>
          </div>
          <div className="soft-panel relative overflow-hidden">
            <div className="absolute -right-16 -top-16 h-36 w-36 rounded-full bg-rose-400/25 blur-3xl" />
            <div className="absolute -left-10 bottom-0 h-24 w-24 rounded-full bg-amber-300/20 blur-2xl" />
            <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white/70 to-transparent dark:from-slate-900/70" />
            <div className="relative">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Highlights</p>
              <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
                Curated playlists that celebrate excellence, originality, and luminous screen presence.
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
                    className="rounded-full border border-rose-200/60 bg-rose-100/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-rose-700 dark:border-rose-300/30 dark:bg-rose-300/10 dark:text-rose-200"
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
              className="group relative overflow-hidden rounded-[28px] border border-rose-200/60 bg-white/70 p-6 shadow-[0_24px_70px_-50px_rgba(15,23,42,0.35)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:shadow-[0_32px_90px_-55px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-slate-950/50"
            >
              <div className="absolute -right-14 -top-14 h-32 w-32 rounded-full bg-rose-400/20 blur-3xl" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-rose-600/80 dark:text-rose-200/80">
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
              className="group relative overflow-hidden rounded-[30px] border border-rose-200/30 bg-gradient-to-br from-rose-500/20 via-fuchsia-400/20 to-amber-200/30 p-6 text-slate-900 shadow-[0_30px_90px_-60px_rgba(15,23,42,0.5)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_35px_110px_-70px_rgba(15,23,42,0.6)] dark:border-white/10 dark:bg-gradient-to-br dark:from-rose-500/30 dark:via-fuchsia-400/20 dark:to-amber-200/20"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.25),_transparent_60%)] opacity-80" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.3em] text-amber-700/80 dark:text-amber-200/80">
                  {story.label}
                </p>
                <h3 className="mt-3 font-display text-2xl text-slate-900 dark:text-white">{story.title}</h3>
                <p className="mt-3 text-sm text-slate-700 dark:text-slate-200">{story.detail}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {story.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/60 bg-white/40 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-slate-700 dark:border-white/20 dark:bg-white/10 dark:text-white/80"
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
            <div className="absolute -right-10 top-10 h-32 w-32 rounded-full bg-rose-300/20 blur-3xl" />
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
            <div className="absolute -right-16 -top-20 h-32 w-32 rounded-full bg-amber-300/20 blur-3xl" />
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Up Next</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              New curated lists land midweek with behind-the-scenes highlights and editorial picks.
            </p>
            <div className="mt-6 glow-divider" />
            <p className="mt-5 text-xs uppercase tracking-[0.3em] text-slate-500">Schedule</p>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-200">Wednesday • 6:00 PM</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Women;
