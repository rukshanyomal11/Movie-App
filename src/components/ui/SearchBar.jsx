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
    <form onSubmit={handleSearch} className="flex items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies, actors..."
        className="px-3 py-1 rounded-l-md text-black focus:outline-none"
      />
      <button type="submit" className="bg-primary px-3 py-1 rounded-r-md">
        <img src={searchIcon} alt="Search" className="h-5 w-5" />
      </button>
    </form>
  );
};

export default SearchBar;