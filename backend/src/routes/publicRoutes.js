import express from 'express';
import { listTodayShowsPublic, getShowById, createBooking } from '../controllers/publicController.js';
import asyncHandler from '../utils/asyncHandler.js';

const router = express.Router();

router.get('/shows/today', asyncHandler(listTodayShowsPublic));
router.get('/shows/:id', asyncHandler(getShowById));
router.post('/bookings', asyncHandler(createBooking));

export default router;
