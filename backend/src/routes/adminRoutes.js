import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  adminLogin,
  searchMovies,
  saveMovie,
  listMovies,
  deleteMovie,
  createShow,
  listTodayShows,
  deleteShow,
  listBookings,
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', asyncHandler(adminLogin));
router.get('/movies/search', adminAuth, asyncHandler(searchMovies));
router.post('/movies', adminAuth, asyncHandler(saveMovie));
router.get('/movies', adminAuth, asyncHandler(listMovies));
router.delete('/movies/:id', adminAuth, asyncHandler(deleteMovie));
router.post('/shows', adminAuth, asyncHandler(createShow));
router.get('/shows/today', adminAuth, asyncHandler(listTodayShows));
router.delete('/shows/:id', adminAuth, asyncHandler(deleteShow));
router.get('/bookings', adminAuth, asyncHandler(listBookings));

export default router;

