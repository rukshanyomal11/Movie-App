const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || 'Request failed';
    throw new Error(message);
  }
  return data;
};

export const getTodayShows = async (date) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return request(`/public/shows/today${query}`);
};

export const getShowById = async (showId) => {
  return request(`/public/shows/${showId}`);
};

export const createBooking = async (bookingData) => {
  return request('/public/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bookingData),
  });
};
