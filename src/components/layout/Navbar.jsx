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
    { to: '/categories', label: 'Categories' },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 text-white shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-9 w-9 invert" />
          <div className="leading-tight">
            <span className="block font-display text-2xl tracking-[0.18em] text-white">MovieApp</span>
            <span className="text-[10px] uppercase tracking-[0.35em] text-amber-300/80">Curated</span>
          </div>
        </NavLink>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm uppercase tracking-[0.25em] text-slate-200/80 transition hover:text-white ${
                  isActive ? 'text-white' : ''
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
            className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-amber-400/50 hover:text-white"
          >
            {isDark ? 'Light' : 'Dark'}
          </button>
        </div>

        <button
          className="lg:hidden rounded-full border border-white/10 bg-white/5 p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <img src={menuIcon} alt="Menu" className="h-5 w-5 invert" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/10 bg-slate-950/95 px-4 py-4 backdrop-blur sm:px-6">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `text-sm uppercase tracking-[0.25em] text-slate-200/80 transition hover:text-white ${
                    isActive ? 'text-white' : ''
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
              className="w-full rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 transition hover:border-amber-400/50 hover:text-white"
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
