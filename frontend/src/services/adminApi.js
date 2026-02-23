const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

const request = async (path, options = {}) => {
  const response = await fetch(`${API_BASE}${path}`, options);
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.message || 'Request failed';
    const err = new Error(message);
    err.status = response.status;
    throw err;
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

export const adminDeleteMovie = async (token, movieId) => {
  return request(`/admin/movies/${movieId}`, {
    method: 'DELETE',
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

export const adminDeleteShow = async (token, showId) => {
  return request(`/admin/shows/${showId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminGetBookings = async (token, date) => {
  const query = date ? `?date=${encodeURIComponent(date)}` : '';
  return request(`/admin/bookings${query}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const adminSearchCustomers = async (token, q) => {
  return request(`/admin/customers/search?q=${encodeURIComponent(q)}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

