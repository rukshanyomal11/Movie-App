import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import SearchBar from '../ui/SearchBar';
import logo from '../../assets/logo/logo-dark.png';
import menuIcon from '../../assets/icons/menu.svg';

const Navbar = ({ theme }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/movies', label: 'Movies' },
    { to: '/actors', label: 'Actors' },
    { to: '/directors', label: 'Directors' },
    { to: '/categories', label: 'Categories' },
  ];

  return (
    <nav className="bg-[linear-gradient(to_right,#010101,#1a1a1a)] text-white shadow-md sticky top-0 z-50 dark:bg-gray-900 dark:text-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/" className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-8" />
          <span className="text-xl font-bold">MovieApp</span>
        </NavLink>

        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? 'font-semibold border-b-2 border-white' : ''}`
              }
            >
              {link.label}
            </NavLink>
          ))}
          <SearchBar />
        </div>

        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <img src={menuIcon} alt="Menu" className="h-6 w-6" />
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-800 px-4 py-2 dark:bg-gray-900 dark:text-white">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `block py-2 hover:text-gray-300 ${isActive ? 'font-semibold' : ''}`
              }
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="py-2">
            <SearchBar />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
