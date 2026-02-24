import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="relative overflow-hidden border-t border-slate-200/70 bg-white/80 text-slate-900 backdrop-blur dark:border-white/10 dark:bg-slate-950/90 dark:text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(251,191,36,0.18),_transparent_55%)] opacity-80 dark:opacity-60" />
      <div className="relative container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <p className="font-display text-2xl tracking-[0.25em]">MovieApp</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Curated stories, iconic performances, and visionary directors in one cinematic space.
            </p>
            <div className="mt-6 flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                Instagram
              </a>
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                X / Twitter
              </a>
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                YouTube
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700/80 dark:text-amber-300/80">
              Explore
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Link to="/" className="transition hover:text-slate-900 dark:hover:text-white">
                Home
              </Link>
              <Link to="/movies" className="transition hover:text-slate-900 dark:hover:text-white">
                Movies
              </Link>
              <Link to="/actors" className="transition hover:text-slate-900 dark:hover:text-white">
                Actors
              </Link>
              <Link to="/directors" className="transition hover:text-slate-900 dark:hover:text-white">
                Directors
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700/80 dark:text-amber-300/80">
              Company
            </p>
            <div className="mt-4 flex flex-col gap-2 text-sm text-slate-600 dark:text-slate-300">
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                About
              </a>
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                Press Kit
              </a>
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                Careers
              </a>
              <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
                Contact
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-amber-700/80 dark:text-amber-300/80">
              Stay In Loop
            </p>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              Weekly highlights, trailer drops, and curated watchlists delivered to your inbox.
            </p>
            <form className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full rounded-full border border-slate-200/70 bg-white/80 px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-white dark:placeholder:text-slate-500"
              />
              <button
                type="button"
                className="rounded-full bg-amber-400 px-5 py-2 text-xs uppercase tracking-[0.3em] text-slate-900 shadow-[0_12px_30px_-18px_rgba(251,191,36,0.8)] transition hover:bg-amber-300"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-slate-200/70 pt-6 text-xs text-slate-500 dark:border-white/10 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-3 uppercase tracking-[0.25em] text-slate-400">
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
              Privacy
            </a>
            <span className="text-amber-400/60">&bull;</span>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
              Terms
            </a>
            <span className="text-amber-400/60">&bull;</span>
            <a href="#" className="transition hover:text-slate-900 dark:hover:text-white">
              Support
            </a>
            <span className="text-amber-400/60">&bull;</span>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="transition hover:text-slate-900 dark:hover:text-white"
            >
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
