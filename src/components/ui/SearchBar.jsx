import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
      setQuery('');
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 rounded-full border border-slate-200/40 bg-white/70 px-3 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, actors..."
        className="w-40 bg-transparent text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none sm:w-56 dark:text-slate-100 dark:placeholder:text-slate-400"
      />
      <button
        type="submit"
        className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-900 transition hover:bg-amber-300"
        aria-label="Search"
      >
        <img src={searchIcon} alt="Search" className="h-4 w-4 dark:invert" />
      </button>
    </form>
  );
};

export default SearchBar;
