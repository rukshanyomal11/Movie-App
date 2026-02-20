import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import asyncHandler from '../utils/asyncHandler.js';
import {
  adminLogin,
  searchMovies,
  saveMovie,
  listMovies,
  createShow,
  listTodayShows,
  listBookings,
} from '../controllers/adminController.js';

const router = express.Router();

router.post('/login', asyncHandler(adminLogin));
router.get('/movies/search', adminAuth, asyncHandler(searchMovies));
router.post('/movies', adminAuth, asyncHandler(saveMovie));
router.get('/movies', adminAuth, asyncHandler(listMovies));
router.post('/shows', adminAuth, asyncHandler(createShow));
router.get('/shows/today', adminAuth, asyncHandler(listTodayShows));
router.get('/bookings', adminAuth, asyncHandler(listBookings));

export default router;

