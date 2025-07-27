import { TMDB_IMAGE_BASE_URL } from './constants';

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return '/assets/placeholders/no-image.jpg';
  return `${TMDB_IMAGE_BASE_URL}/${size}${path}`;
};

export const truncateText = (text, maxLength) => {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};