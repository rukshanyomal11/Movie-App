export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatRating = (rating) => {
  if (rating === undefined || rating === null) return 'N/A';
  return `${rating.toFixed(1)}/10`;
};