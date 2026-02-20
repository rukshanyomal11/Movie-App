import { customAlphabet } from 'nanoid';
import Show from '../models/Show.js';
import Movie from '../models/Movie.js';
import Booking from '../models/Booking.js';

const bookingId = customAlphabet('ABCDEFGHJKLMNPQRSTUVWXYZ23456789', 8);

const getDateRange = (dateInput) => {
  const date = dateInput ? new Date(dateInput) : new Date();
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return { start, end };
};

export const listTodayShowsPublic = async (req, res) => {
  const { start, end } = getDateRange(req.query.date);
  const shows = await Show.find({ showDate: { $gte: start, $lte: end }, status: 'active' })
    .populate('movie')
    .sort({ showTime: 1 });

  const results = shows.map((show) => ({
    ...show.toObject(),
    bookedCount: show.bookedSeats.length,
  }));

  return res.json({ results });
};

export const getShowById = async (req, res) => {
  const show = await Show.findById(req.params.id).populate('movie');
  if (!show) {
    return res.status(404).json({ message: 'Show not found' });
  }
  return res.json(show);
};

export const createBooking = async (req, res) => {
  const { showId, seats, customerName, customerEmail, customerPhone } = req.body || {};
  if (!showId || !Array.isArray(seats) || seats.length === 0) {
    return res.status(400).json({ message: 'showId and seats are required' });
  }
  if (!customerName || !customerEmail) {
    return res.status(400).json({ message: 'customerName and customerEmail are required' });
  }

  const normalizedSeats = [...new Set(seats.map((seat) => Number(seat)))].filter(
    (seat) => Number.isInteger(seat) && seat >= 1 && seat <= 100
  );

  if (normalizedSeats.length === 0) {
    return res.status(400).json({ message: 'Invalid seats selection' });
  }

  const show = await Show.findOneAndUpdate(
    { _id: showId, status: 'active', bookedSeats: { $nin: normalizedSeats } },
    { $addToSet: { bookedSeats: { $each: normalizedSeats } } },
    { new: true }
  );

  if (!show) {
    return res.status(409).json({ message: 'One or more seats already booked' });
  }

  const movie = await Movie.findById(show.movie);
  if (!movie) {
    return res.status(404).json({ message: 'Movie not found for this show' });
  }

  const totalAmount = normalizedSeats.length * show.pricePerSeat;
  const bookingCode = bookingId();

  const booking = await Booking.create({
    show: show._id,
    movie: movie._id,
    seats: normalizedSeats,
    customerName,
    customerEmail,
    customerPhone,
    totalAmount,
    bookingCode,
  });

  return res.status(201).json({
    booking,
    ticket: {
      bookingCode,
      showId: show._id,
      seats: normalizedSeats,
      movieTitle: movie.title,
      showTime: show.showTime,
      showDate: show.showDate,
      totalAmount,
    },
  });
};

