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

export const adminLogin = async (payload) => {
  return request('/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
};

export const adminSearchMovies = async (token, query) => {
  return request(`/admin/movies/search?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminSaveMovie = async (token, movie) => {
  return request('/admin/movies', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(movie),
  });
};

export const adminGetMovies = async (token) => {
  return request('/admin/movies', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminCreateShow = async (token, payload) => {
  return request('/admin/shows', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
};

export const adminGetTodayShows = async (token, date) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return request(`/admin/shows/today${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminGetBookings = async (token) => {
  return request('/admin/bookings', {
    headers: { Authorization: `Bearer ${token}` },
  });
};

