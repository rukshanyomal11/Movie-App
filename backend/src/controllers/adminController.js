import jwt from 'jsonwebtoken';
import Movie from '../models/Movie.js';
import Show from '../models/Show.js';
import Booking from '../models/Booking.js';

const getDateRange = (dateInput) => {
  const date = dateInput ? new Date(dateInput) : new Date();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid admin credentials' });
  }

  const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '12h' });
  return res.json({ token, email });
};

export const searchMovies = async (req, res) => {
  const query = req.query.query;
  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  const tmdbKey = process.env.TMDB_API_KEY || process.env.OMDB_API_KEY;
  if (!tmdbKey) {
    return res.status(500).json({ message: 'TMDB_API_KEY is not set' });
  }

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${tmdbKey}&query=${encodeURIComponent(query)}`
  );
  const data = await response.json();

  if (!data.results || data.results.length === 0) {
    return res.status(404).json({ message: 'No results found', results: [] });
  }

  const results = data.results.map((movie) => ({
    imdbID: String(movie.id),
    Title: movie.title,
    Year: movie.release_date ? movie.release_date.split('-')[0] : 'N/A',
    Poster: movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '',
    Overview: movie.overview || '',
    Rating: movie.vote_average ?? null,
  }));

  return res.json({ results });
};

export const saveMovie = async (req, res) => {
  const body = req.body || {};
  const imdbId = body.imdbId || body.imdbID;
  if (!imdbId) {
    return res.status(400).json({ message: 'imdbId is required' });
  }

  const existing = await Movie.findOne({ imdbId });
  if (existing) {
    return res.status(200).json(existing);
  }

  const movie = await Movie.create({
    imdbId,
    title: body.title || body.Title,
    year: body.year || body.Year,
    rated: body.rated || body.Rated,
    runtime: body.runtime || body.Runtime,
    genre: body.genre || body.Genre,
    director: body.director || body.Director,
    actors: body.actors || body.Actors,
    plot: body.plot || body.Plot || body.overview || body.Overview,
    language: body.language || body.Language,
    country: body.country || body.Country,
    poster: body.poster || body.Poster,
    imdbRating: body.imdbRating,
  });

  return res.status(201).json(movie);
};

export const listMovies = async (_req, res) => {
  const movies = await Movie.find().sort({ createdAt: -1 });
  return res.json({ results: movies });
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Movie ID is required' });
  }

  const movie = await Movie.findByIdAndDelete(id);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  return res.json({ message: 'Movie deleted successfully' });
};

export const createShow = async (req, res) => {
  const { movieId, showDate, showTime, pricePerSeat } = req.body || {};
  if (!movieId || !showDate || !showTime || !pricePerSeat) {
    return res.status(400).json({ message: 'movieId, showDate, showTime, pricePerSeat are required' });
  }

  const movie = await Movie.findById(movieId);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found' });
  }

  const show = await Show.create({
    movie: movie._id,
    showDate: new Date(showDate),
    showTime,
    pricePerSeat: Number(pricePerSeat),
    seatCount: 100,
    bookedSeats: [],
  });

  return res.status(201).json(show);
};

export const listTodayShows = async (req, res) => {
  const { start, end } = getDateRange(req.query.date);
  const shows = await Show.find({ showDate: { $gte: start, $lte: end } })
    .populate('movie')
    .sort({ showTime: 1 });

  const results = shows.map((show) => ({
    ...show.toObject(),
    bookedCount: show.bookedSeats.length,
  }));

  return res.json({ results });
};

export const deleteShow = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Show ID is required' });
  }

  const show = await Show.findByIdAndDelete(id);
  if (!show) {
    return res.status(404).json({ message: 'Show not found' });
  }

  return res.json({ message: 'Show deleted successfully' });
};

export const listBookings = async (req, res) => {
  const { start, end } = getDateRange(req.query.date);
  const bookings = await Booking.find({ createdAt: { $gte: start, $lte: end } })
    .populate('movie')
    .populate('show')
    .sort({ createdAt: -1 });
  return res.json({ results: bookings });
};

export const searchCustomers = async (req, res) => {
  const q = (req.query.q || '').trim();
  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  const regex = new RegExp(q, 'i');
  const bookings = await Booking.find({
    $or: [
      { customerName: regex },
      { customerEmail: regex },
      { customerPhone: regex },
    ],
  })
    .populate('movie')
    .populate('show')
    .sort({ createdAt: -1 })
    .limit(50);

  return res.json({ results: bookings });
};

