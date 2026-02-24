import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';
import logo from '../../assets/logo/logo-dark.png';
import menuIcon from '../../assets/icons/menu.svg';

const Navbar = ({ theme, toggleTheme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/actors', label: 'Actors' },
    { to: '/directors', label: 'Directors' },
    { to: '/today-shows', label: 'Today Shows' },
    { to: '/admin', label: 'Admin' },
  ];

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 text-slate-900 shadow-[0_20px_50px_-35px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70 dark:text-white">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3" onClick={handleLogoClick}>
          <img src={logo} alt="Logo" className="h-9 w-9 rounded-md dark:invert" />
          <div className="leading-tight">
            <span className="block font-display text-2xl tracking-[0.2em] text-slate-900 dark:text-white">
              MovieApp
            </span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-600/80 dark:text-amber-300/80">
              Curated
            </span>
          </div>
        </NavLink>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-900 dark:text-slate-300/80 dark:hover:text-white ${
                  isActive ? 'text-slate-900 dark:text-white' : ''
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <SearchBar />
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-amber-400/50 dark:hover:text-white"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>

        <button
          className="lg:hidden rounded-full border border-slate-200/70 bg-white/70 p-2 text-slate-700 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <img src={menuIcon} alt="Menu" className="h-5 w-5 dark:invert" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200/70 bg-white/95 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/95 sm:px-6">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-xs uppercase tracking-[0.3em] text-slate-500 transition hover:text-slate-900 dark:text-slate-300/80 dark:hover:text-white ${
                    isActive ? 'text-slate-900 dark:text-white' : ''
                  }`
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-3">
            <SearchBar />
            <button
              type="button"
              onClick={toggleTheme}
              className="w-full rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-amber-400/50 dark:hover:text-white"
            >
              {isDark ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
