import mongoose from 'mongoose';

const movieSchema = new mongoose.Schema(
  {
    imdbId: { type: String, unique: true, required: true },
    title: { type: String, required: true },
    year: String,
    rated: String,
    runtime: String,
    genre: String,
    director: String,
    actors: String,
    plot: String,
    language: String,
    country: String,
    poster: String,
    imdbRating: String,
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;

