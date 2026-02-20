import mongoose from 'mongoose';

const showSchema = new mongoose.Schema(
  {
    movie: { type: mongoose.Schema.Types.ObjectId, ref: 'Movie', required: true },
    showDate: { type: Date, required: true },
    showTime: { type: String, required: true },
    pricePerSeat: { type: Number, required: true },
    seatCount: { type: Number, default: 100 },
    bookedSeats: { type: [Number], default: [] },
    status: { type: String, default: 'active' },
  },
  { timestamps: true }
);

const Show = mongoose.model('Show', showSchema);

export default Show;

