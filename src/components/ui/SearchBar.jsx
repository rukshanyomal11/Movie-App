import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../../assets/icons/search.svg';
import { searchMulti } from '../../features/search/searchAPI';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);
  const navigate = useNavigate();
  const trimmedQuery = query.trim();

  const handleSearch = (e) => {
    e.preventDefault();
    if (trimmedQuery) {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
      setQuery('');
      setSuggestions([]);
      setIsDropdownOpen(false);
    }
  };

  const handleSuggestionSelect = (suggestion) => {
    if (!suggestion) return;

    if (suggestion.type === 'movie') {
      navigate(`/movie/${suggestion.id}`);
    } else if (suggestion.type === 'actor') {
      navigate(`/actor/${suggestion.id}`);
    } else if (suggestion.type === 'director') {
      navigate(`/director/${suggestion.id}`);
    } else {
      navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    }

    setQuery('');
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  const handleViewAll = () => {
    if (!trimmedQuery) return;
    navigate(`/search?query=${encodeURIComponent(trimmedQuery)}`);
    setQuery('');
    setSuggestions([]);
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    if (trimmedQuery.length < 2) {
      requestIdRef.current += 1;
      setSuggestions([]);
      setIsDropdownOpen(false);
      setIsLoading(false);
      return;
    }

    const currentRequestId = requestIdRef.current + 1;
    requestIdRef.current = currentRequestId;
    setIsLoading(true);
    setIsDropdownOpen(true);

    const timeoutId = setTimeout(async () => {
      try {
        const response = await searchMulti(trimmedQuery, 1);
        if (requestIdRef.current !== currentRequestId) return;

        const filtered = response.results
          .filter((item) => {
            if (item.media_type === 'movie') return true;
            if (item.media_type !== 'person') return false;
            return item.known_for_department === 'Acting' || item.known_for_department === 'Directing';
          })
          .slice(0, 6)
          .map((item) => {
            if (item.media_type === 'movie') {
              return {
                id: item.id,
                label: item.title,
                type: 'movie',
                meta: item.release_date ? item.release_date.slice(0, 4) : null,
              };
            }

            const type = item.known_for_department === 'Directing' ? 'director' : 'actor';
            return {
              id: item.id,
              label: item.name,
              type,
              meta: item.known_for_department,
            };
          });

        setSuggestions(filtered);
      } catch (error) {
        if (requestIdRef.current !== currentRequestId) return;
        setSuggestions([]);
      } finally {
        if (requestIdRef.current === currentRequestId) {
          setIsLoading(false);
        }
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [trimmedQuery]);

  return (
    <div className="relative">
      <form
        onSubmit={handleSearch}
        className="flex items-center gap-2 rounded-full border border-slate-200/70 bg-white/80 px-3 py-2 shadow-[0_12px_40px_-30px_rgba(15,23,42,0.25)] backdrop-blur dark:border-white/10 dark:bg-slate-900/60"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => {
            if (suggestions.length) setIsDropdownOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setIsDropdownOpen(false);
              e.currentTarget.blur();
            }
          }}
          placeholder="Search movies, actors..."
          className="w-40 bg-transparent text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none sm:w-56 dark:text-slate-100 dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-400 text-slate-900 shadow-[0_10px_25px_-15px_rgba(251,191,36,0.9)] transition hover:bg-amber-300"
          aria-label="Search"
        >
          <img src={searchIcon} alt="Search" className="h-4 w-4 dark:invert" />
        </button>
      </form>

      {isDropdownOpen && (
        <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-2xl border border-slate-200/70 bg-white/95 p-2 text-xs shadow-[0_18px_50px_-35px_rgba(15,23,42,0.35)] backdrop-blur dark:border-white/10 dark:bg-slate-950/95">
          {isLoading && <div className="px-3 py-2 text-slate-500 dark:text-slate-400">Searching...</div>}

          {!isLoading && suggestions.length === 0 && (
            <div className="px-3 py-2 text-slate-500 dark:text-slate-400">No suggestions found.</div>
          )}

          {!isLoading && suggestions.length > 0 && (
            <div className="flex flex-col gap-1">
              {suggestions.map((suggestion) => (
                <button
                  key={`${suggestion.type}-${suggestion.id}`}
                  type="button"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    handleSuggestionSelect(suggestion);
                  }}
                  className="flex items-center justify-between rounded-xl px-3 py-2 text-left text-sm text-slate-900 transition hover:bg-amber-50/70 dark:text-slate-100 dark:hover:bg-white/5"
                >
                  <span className="font-medium">{suggestion.label}</span>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500 dark:text-slate-400">
                    {suggestion.type}
                    {suggestion.meta ? ` - ${suggestion.meta}` : ''}
                  </span>
                </button>
              ))}
              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleViewAll();
                }}
                className="rounded-xl px-3 py-2 text-left text-xs uppercase tracking-[0.3em] text-amber-700 transition hover:bg-amber-50/70 dark:text-amber-300 dark:hover:bg-white/5"
              >
                View all results for "{trimmedQuery}"
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
