import API_URL from '../utils/api';

export function getImageUrl(image) {
  if (!image) return '/default-tote.jpg';
  const id = typeof image === 'object' ? image._id : image;
  return `${API_URL}/api/images/${id}`;
}
