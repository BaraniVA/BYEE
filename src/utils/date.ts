export const formatTimeAgo = (date: Date | string): string => {
  const now = new Date();
  const past = new Date(date);
  const diffInMinutes = Math.floor((now.getTime() - past.getTime()) / (1000 * 60));

  if (diffInMinutes < 60) {
    return `${diffInMinutes} minutes`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hours`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days`;
};