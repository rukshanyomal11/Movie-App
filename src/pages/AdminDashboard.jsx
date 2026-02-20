import { useEffect, useRef, useState } from 'react';
import {
  adminLogin,
  adminSearchMovies,
  adminSaveMovie,
  adminGetMovies,
  adminCreateShow,
  adminGetTodayShows,
  adminGetBookings,
} from '../services/adminApi';

const getTodayValue = () => new Date().toISOString().slice(0, 10);

const AdminDashboard = () => {
  const [token, setToken] = useState(() => localStorage.getItem('adminToken') || '');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const searchSeq = useRef(0);
  const searchTimeout = useRef(null);
  const [activeMovie, setActiveMovie] = useState(null);

  const [savedMovies, setSavedMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState('');

  const [showDate, setShowDate] = useState(getTodayValue());
  const [showTime, setShowTime] = useState('19:00');
  const [pricePerSeat, setPricePerSeat] = useState('550');
  const [showMessage, setShowMessage] = useState('');

  const [todayShows, setTodayShows] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;
    setLoading(true);
    Promise.all([
      adminGetMovies(token),
      adminGetTodayShows(token, showDate),
      adminGetBookings(token),
    ])
      .then(([moviesData, showsData, bookingsData]) => {
        setSavedMovies(moviesData.results || []);
        setTodayShows(showsData.results || []);
        setBookings(bookingsData.results || []);
      })
      .catch((error) => setAuthError(error.message))
      .finally(() => setLoading(false));
  }, [token, showDate]);

  useEffect(() => {
    if (!selectedMovieId && savedMovies.length > 0) {
      setSelectedMovieId(savedMovies[0]._id);
    }
  }, [savedMovies, selectedMovieId]);

  const runSearch = async (term) => {
    const seq = ++searchSeq.current;
    setSearchLoading(true);
    setSearchError('');
    try {
      const data = await adminSearchMovies(token, term);
      if (seq !== searchSeq.current) return;
      setSearchResults(data.results || []);
    } catch (error) {
      if (seq !== searchSeq.current) return;
      setSearchError(error.message);
      setSearchResults([]);
    } finally {
      if (seq === searchSeq.current) {
        setSearchLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!token) return;
    const term = searchQuery.trim();
    if (!term) {
      setSearchResults([]);
      setSearchError('');
      setSearchLoading(false);
      return;
    }

    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    searchTimeout.current = setTimeout(() => {
      runSearch(term);
    }, 350);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchQuery, token]);

  const handleLogin = async (event) => {
    event.preventDefault();
    setAuthError('');
    try {
      const data = await adminLogin({ email, password });
      localStorage.setItem('adminToken', data.token);
      setToken(data.token);
      setEmail('');
      setPassword('');
    } catch (error) {
      setAuthError(error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setToken('');
    setSearchQuery('');
    setSearchResults([]);
    setSearchError('');
    setSearchLoading(false);
    setSavedMovies([]);
    setTodayShows([]);
    setBookings([]);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    const term = searchQuery.trim();
    if (!term) return;
    if (searchTimeout.current) clearTimeout(searchTimeout.current);
    runSearch(term);
  };

  const handleSaveMovie = async (movie) => {
    setSearchError('');
    try {
      await adminSaveMovie(token, movie);
      const moviesData = await adminGetMovies(token);
      setSavedMovies(moviesData.results || []);
    } catch (error) {
      setSearchError(error.message);
    }
  };

  const openMovie = (movie) => {
    setActiveMovie(movie);
  };

  const closeMovie = () => {
    setActiveMovie(null);
  };

  const handleCreateShow = async (event) => {
    event.preventDefault();
    setShowMessage('');
    if (!selectedMovieId) {
      setShowMessage('Select a movie first.');
      return;
    }
    try {
      await adminCreateShow(token, {
        movieId: selectedMovieId,
        showDate,
        showTime,
        pricePerSeat: Number(pricePerSeat),
      });
      setShowMessage('Show created successfully.');
      const showsData = await adminGetTodayShows(token, showDate);
      setTodayShows(showsData.results || []);
    } catch (error) {
      setShowMessage(error.message);
    }
  };

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Admin</p>
            <h1 className="page-title">Dashboard</h1>
            <p className="page-subtitle mt-4">
              Manage today&apos;s movies, showtimes, and bookings in one place.
            </p>
          </div>
          <div className="soft-panel">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Operations</p>
            <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
              Search TMDB, save titles, and publish shows with 100 seats.
            </p>
            {token && (
              <button
                type="button"
                onClick={handleLogout}
                className="mt-4 w-full rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>

      {!token && (
        <section className="section-block">
          <div className="section-heading">
            <h2 className="section-title">Admin Login</h2>
            <span className="badge">Secure</span>
          </div>
          <form className="soft-panel max-w-xl" onSubmit={handleLogin}>
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
              required
            />
            <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-500">Password</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
              required
            />
            {authError && <p className="mt-3 text-sm text-red-500">{authError}</p>}
            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-amber-400/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
            >
              Sign In
            </button>
          </form>
        </section>
      )}

      {token && (
        <>
          <section className="section-block">
            <div className="section-heading">
              <h2 className="section-title">Movie Search</h2>
              <span className="badge">TMDB</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <form className="soft-panel" onSubmit={handleSearch}>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Search TMDB</label>
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="e.g. Interstellar"
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
                />
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full border border-slate-200/70 bg-white/70 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-600 transition hover:border-slate-300 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80"
                >
                  Search
                </button>
                {searchError && <p className="mt-3 text-sm text-red-500">{searchError}</p>}
              </form>

              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Results</p>
                <div className="mt-4 space-y-3">
                  {searchLoading && <p className="text-sm text-slate-500 dark:text-slate-300">Searching...</p>}
                  {!searchLoading && searchResults.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                      {searchQuery.trim() ? 'No results found.' : 'Type to see suggestions.'}
                    </p>
                  )}
                  {searchResults.map((movie) => (
                    <div
                      key={movie.imdbID}
                      className="flex items-center justify-between gap-3 rounded-xl border border-transparent p-2 transition hover:border-amber-400/40 hover:bg-white/5"
                    >
                      <button
                        type="button"
                        onClick={() => openMovie(movie)}
                        className="flex flex-1 items-center gap-3 text-left"
                      >
                        <img
                          src={
                            movie.Poster && movie.Poster !== 'N/A'
                              ? movie.Poster
                              : '/assets/placeholders/no-image.jpg'
                          }
                          alt={`${movie.Title} poster`}
                          className="h-14 w-10 rounded-lg border border-slate-200/70 object-cover shadow-sm dark:border-white/10"
                          loading="lazy"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{movie.Title}</p>
                          <p className="text-xs text-slate-500">{movie.Year}</p>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleSaveMovie(movie);
                        }}
                        className="rounded-full border border-amber-400/60 px-3 py-1 text-[10px] uppercase tracking-[0.25em] text-amber-600 dark:text-amber-300"
                      >
                        Save
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <h2 className="section-title">Create Show</h2>
              <span className="badge">100 Seats</span>
            </div>
            <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
              <form className="soft-panel" onSubmit={handleCreateShow}>
                <label className="text-xs uppercase tracking-[0.3em] text-slate-500">Movie</label>
                <select
                  value={selectedMovieId}
                  onChange={(event) => setSelectedMovieId(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
                >
                  {savedMovies.map((movie) => (
                    <option key={movie._id} value={movie._id}>
                      {movie.title}
                    </option>
                  ))}
                </select>

                <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-500">Show Date</label>
                <input
                  type="date"
                  value={showDate}
                  onChange={(event) => setShowDate(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
                  required
                />

                <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-500">Show Time</label>
                <input
                  type="time"
                  value={showTime}
                  onChange={(event) => setShowTime(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
                  required
                />

                <label className="mt-4 block text-xs uppercase tracking-[0.3em] text-slate-500">Price Per Seat</label>
                <input
                  type="number"
                  min="0"
                  value={pricePerSeat}
                  onChange={(event) => setPricePerSeat(event.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
                  required
                />

                {showMessage && <p className="mt-3 text-sm text-slate-500 dark:text-slate-300">{showMessage}</p>}
                <button
                  type="submit"
                  className="mt-4 w-full rounded-full bg-amber-400/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
                >
                  Publish Show
                </button>
              </form>

              <div className="soft-panel">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Saved Movies</p>
                <div className="mt-4 space-y-2 text-sm text-slate-600 dark:text-slate-300">
                  {savedMovies.length === 0 && <p>No movies saved yet.</p>}
                  {savedMovies.map((movie) => (
                    <p key={movie._id}>
                      {movie.title} ({movie.year})
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <h2 className="section-title">Today&apos;s Shows</h2>
              <span className="badge">Live</span>
            </div>
            <div className="soft-panel">
              {loading && <p className="text-sm">Loading...</p>}
              {!loading && todayShows.length === 0 && <p className="text-sm">No shows for today.</p>}
              {!loading && todayShows.length > 0 && (
                <div className="grid gap-4 sm:grid-cols-2">
                  {todayShows.map((show) => (
                    <div key={show._id} className="rounded-2xl border border-slate-200/60 p-4 dark:border-white/10">
                      <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {show.movie?.title}
                      </p>
                      <p className="text-xs text-slate-500">Showtime: {show.showTime}</p>
                      <p className="text-xs text-slate-500">Booked: {show.bookedCount} / {show.seatCount}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>

          <section className="section-block">
            <div className="section-heading">
              <h2 className="section-title">Bookings</h2>
              <span className="badge">Latest</span>
            </div>
            <div className="soft-panel">
              {bookings.length === 0 && <p className="text-sm">No bookings yet.</p>}
              {bookings.length > 0 && (
                <div className="space-y-3">
                  {bookings.slice(0, 8).map((booking) => (
                    <div key={booking._id} className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                          {booking.movie?.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          {booking.customerName} • Seats: {booking.seats.join(', ')}
                        </p>
                      </div>
                      <span className="text-xs uppercase tracking-[0.2em] text-amber-600 dark:text-amber-300">
                        {booking.bookingCode}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </>
      )}
      {activeMovie && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-8">
          <div className="w-full max-w-2xl rounded-[28px] border border-white/10 bg-slate-950/95 p-6 text-slate-100 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-amber-300">TMDB</p>
                <h3 className="mt-2 font-display text-2xl text-white">{activeMovie.Title}</h3>
                <p className="mt-1 text-sm text-slate-300">{activeMovie.Year}</p>
              </div>
              <button
                type="button"
                onClick={closeMovie}
                className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 hover:border-amber-400/60 hover:text-white"
              >
                Close
              </button>
            </div>
            <div className="mt-6 grid gap-6 md:grid-cols-[0.6fr_1fr]">
              <img
                src={
                  activeMovie.Poster && activeMovie.Poster !== 'N/A'
                    ? activeMovie.Poster
                    : '/assets/placeholders/no-image.jpg'
                }
                alt={`${activeMovie.Title} poster`}
                className="w-full rounded-2xl border border-white/10 object-cover"
              />
              <div className="space-y-4 text-sm text-slate-200">
                <p className="leading-relaxed">
                  {activeMovie.Overview || 'No description available yet.'}
                </p>
                {activeMovie.Rating !== null && activeMovie.Rating !== undefined && (
                  <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                    Rating {Number(activeMovie.Rating).toFixed(1)} / 10
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    handleSaveMovie(activeMovie);
                    closeMovie();
                  }}
                  className="rounded-full bg-amber-400/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900"
                >
                  Save Movie
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
