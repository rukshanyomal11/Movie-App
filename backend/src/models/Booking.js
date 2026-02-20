import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show', required: true },
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    seats: { type: [Number], required: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: String,
    totalAmount: { type: Number, required: true },
    bookingCode: { type: String, required: true, unique: true },
    status: { type: String, default: 'confirmed' },
  },
  { timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;

