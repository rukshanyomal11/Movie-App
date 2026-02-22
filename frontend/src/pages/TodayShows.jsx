import { useEffect, useState, useRef } from 'react';
import { getTodayShows, createBooking } from '../services/publicApi';
import Loading from '../components/common/Loading';
import Error from '../components/common/Error';

const getTodayValue = () => new Date().toISOString().slice(0, 10);

const TodayShows = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState(getTodayValue());

  const [activeShow, setActiveShow] = useState(null);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(null);
  const [isBooking, setIsBooking] = useState(false);
  
  const formRef = useRef(null);

  useEffect(() => {
    const fetchShows = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await getTodayShows(selectedDate);
        setShows(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShows();
  }, [selectedDate]);

  useEffect(() => {
    if (selectedSeats.length > 0 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [selectedSeats.length]);

  const openBooking = (show) => {
    setActiveShow(show);
    setSelectedSeats([]);
    setCustomerName('');
    setCustomerEmail('');
    setCustomerPhone('');
    setBookingError('');
    setBookingSuccess(null);
  };

  const closeBooking = () => {
    setActiveShow(null);
    setSelectedSeats([]);
    setBookingError('');
    setBookingSuccess(null);
  };

  const toggleSeat = (seatNumber) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
    }
  };

  const handleBooking = async (event) => {
    event.preventDefault();
    setBookingError('');
    setIsBooking(true);

    try {
      const bookingData = {
        showId: activeShow._id,
        seats: selectedSeats,
        customerName,
        customerEmail,
        customerPhone,
      };

      const response = await createBooking(bookingData);
      setBookingSuccess(response.ticket);

      // Refresh shows to update booked seats
      const data = await getTodayShows(selectedDate);
      setShows(data.results || []);

      // Update active show
      const updatedShow = data.results.find((s) => s._id === activeShow._id);
      if (updatedShow) {
        setActiveShow(updatedShow);
      }
    } catch (err) {
      setBookingError(err.message);
    } finally {
      setIsBooking(false);
    }
  };

  const renderSeats = () => {
    const seats = [];
    for (let i = 1; i <= 100; i++) {
      const isBooked = activeShow.bookedSeats.includes(i);
      const isSelected = selectedSeats.includes(i);

      seats.push(
        <button
          key={i}
          type="button"
          disabled={isBooked}
          onClick={() => toggleSeat(i)}
          className={`h-8 w-8 rounded text-xs font-semibold transition ${
            isBooked
              ? 'cursor-not-allowed bg-slate-300 text-slate-500 dark:bg-slate-700 dark:text-slate-500'
              : isSelected
              ? 'bg-amber-400 text-slate-900'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          {i}
        </button>
      );
    }
    return seats;
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <div className="page-shell">
      <div className="page-hero">
        <div className="hero-grid">
          <div>
            <p className="page-kicker">Cinema</p>
            <h1 className="page-title">Today&apos;s Shows</h1>
            <p className="page-subtitle mt-4">Book your tickets for today&apos;s movie screenings.</p>
          </div>
          <div className="soft-panel">
            <label className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
              Select Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-200/70 bg-white/80 px-4 py-3 text-sm text-slate-700 focus:border-amber-400/60 focus:outline-none dark:border-white/10 dark:bg-slate-900/60 dark:text-slate-100"
            />
          </div>
        </div>
      </div>

      <section className="section-block">
        <div className="section-heading">
          <h2 className="section-title">Available Shows</h2>
          <span className="badge">{shows.length} Shows</span>
        </div>

        {shows.length === 0 && (
          <div className="soft-panel">
            <p className="text-sm text-slate-600 dark:text-slate-300">No shows available for this date.</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {shows.map((show) => (
            <div key={show._id} className="soft-panel">
              <div className="flex items-start gap-4">
                <img
                  src={
                    show.movie?.poster && show.movie.poster !== 'N/A'
                      ? show.movie.poster
                      : '/assets/placeholders/no-image.jpg'
                  }
                  alt={`${show.movie?.title} poster`}
                  className="h-32 w-24 rounded-lg border border-slate-200/70 object-cover shadow-sm dark:border-white/10"
                  loading="lazy"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{show.movie?.title}</h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {show.movie?.year} • {show.movie?.genre}
                  </p>
                  <div className="mt-3 space-y-1 text-sm text-slate-600 dark:text-slate-300">
                    <p>
                      <span className="font-semibold">Time:</span> {show.showTime}
                    </p>
                    <p>
                      <span className="font-semibold">Price:</span> Rs. {show.pricePerSeat}
                    </p>
                    <p>
                      <span className="font-semibold">Available:</span> {show.seatCount - show.bookedCount} /{' '}
                      {show.seatCount}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => openBooking(show)}
                    disabled={show.bookedCount >= show.seatCount}
                    className={`mt-4 w-full rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] transition ${
                      show.bookedCount >= show.seatCount
                        ? 'cursor-not-allowed bg-slate-200 text-slate-500 dark:bg-slate-800 dark:text-slate-500'
                        : 'bg-amber-400/90 text-slate-900 hover:bg-amber-300'
                    }`}
                  >
                    {show.bookedCount >= show.seatCount ? 'Sold Out' : 'Book Now'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {activeShow && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 px-4 py-8">
          <div className="relative mx-auto my-8 w-full max-w-4xl rounded-[28px] border border-white/10 bg-slate-950/95 text-slate-100 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.7)] backdrop-blur">
            {!bookingSuccess ? (
              <>
                <div className="sticky top-0 z-20 flex flex-wrap items-start justify-between gap-4 rounded-t-[28px] border-b border-white/10 bg-slate-950 p-6 backdrop-blur">
                  <div>
                    <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Book Tickets</p>
                    <h3 className="mt-2 font-display text-2xl text-white">{activeShow.movie?.title}</h3>
                    <p className="mt-1 text-sm text-slate-300">
                      {activeShow.showTime} • Rs. {activeShow.pricePerSeat} per seat
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={closeBooking}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.3em] text-slate-200 hover:border-amber-400/60 hover:text-white"
                  >
                    Close
                  </button>
                </div>

                <div className="p-6 pb-8">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Select Seats</p>
                  <div className="grid grid-cols-10 gap-2">{renderSeats()}</div>

                  <div className="mt-4 flex flex-wrap gap-4 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-slate-100 dark:bg-slate-800"></div>
                      <span className="text-slate-300">Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-amber-400"></div>
                      <span className="text-slate-300">Selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded bg-slate-300 dark:bg-slate-700"></div>
                      <span className="text-slate-300">Booked</span>
                    </div>
                  </div>

                {selectedSeats.length > 0 && (
                  <form ref={formRef} onSubmit={handleBooking} className="mt-6 space-y-4">
                    <div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                      <p className="text-sm text-slate-200">
                        <span className="font-semibold">Selected Seats:</span> {selectedSeats.sort((a, b) => a - b).join(', ')}
                      </p>
                      <p className="mt-1 text-sm text-slate-200">
                        <span className="font-semibold">Total Amount:</span> Rs. {selectedSeats.length * activeShow.pricePerSeat}
                      </p>
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Name</label>
                      <input
                        type="text"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-amber-400/60 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Email</label>
                      <input
                        type="email"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-amber-400/60 focus:outline-none"
                        required
                      />
                    </div>

                    <div>
                      <label className="text-xs uppercase tracking-[0.3em] text-slate-400">Phone</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="mt-2 w-full rounded-xl border border-slate-700 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 focus:border-amber-400/60 focus:outline-none"
                      />
                    </div>

                    {bookingError && <p className="text-sm text-red-400">{bookingError}</p>}

                    <button
                      type="submit"
                      disabled={isBooking}
                      className="w-full rounded-full bg-amber-400/90 px-4 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300 disabled:opacity-50"
                    >
                      {isBooking ? 'Processing...' : 'Confirm Booking'}
                    </button>
                  </form>
                )}
                </div>
              </>
            ) : (
              <div className="p-6 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                  <svg
                    className="h-8 w-8 text-green-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display text-2xl text-white">Booking Confirmed!</h3>
                <p className="mt-2 text-sm text-slate-300">Your tickets have been reserved successfully.</p>

                <div className="mt-6 rounded-xl border border-green-400/20 bg-green-400/5 p-6 text-left">
                  <p className="text-xs uppercase tracking-[0.3em] text-green-400">Booking Code</p>
                  <p className="mt-2 font-mono text-2xl font-bold text-white">{bookingSuccess.bookingCode}</p>

                  <div className="mt-4 space-y-2 text-sm text-slate-200">
                    <p>
                      <span className="font-semibold">Movie:</span> {bookingSuccess.movieTitle}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{' '}
                      {new Date(bookingSuccess.showDate).toLocaleDateString()}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span> {bookingSuccess.showTime}
                    </p>
                    <p>
                      <span className="font-semibold">Seats:</span> {bookingSuccess.seats.join(', ')}
                    </p>
                    <p>
                      <span className="font-semibold">Total:</span> Rs. {bookingSuccess.totalAmount}
                    </p>
                  </div>
                </div>

                <p className="mt-4 text-xs text-slate-400">
                  Please save your booking code. You&apos;ll need it at the cinema.
                </p>

                <button
                  type="button"
                  onClick={closeBooking}
                  className="mt-6 rounded-full bg-amber-400/90 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 transition hover:bg-amber-300"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TodayShows;
