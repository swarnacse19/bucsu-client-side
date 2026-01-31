/**
 * Format date to readable string
 * @param {string|Date} date 
 * @param {object} options 
 * @returns {string}
 */
export const formatDate = (date, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  return new Date(date).toLocaleDateString('en-US', defaultOptions);
};

/**
 * Format date with time
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDateTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get time remaining until a date
 * @param {string|Date} endDate 
 * @returns {object}
 */
export const getTimeRemaining = (endDate) => {
  const total = new Date(endDate) - new Date();
  
  if (total <= 0) {
    return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isEnded: true };
  }

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds, isEnded: false };
};

/**
 * Check if date is in the past
 * @param {string|Date} date 
 * @returns {boolean}
 */
export const isPast = (date) => {
  return new Date(date) < new Date();
};

/**
 * Check if date is in the future
 * @param {string|Date} date 
 * @returns {boolean}
 */
export const isFuture = (date) => {
  return new Date(date) > new Date();
};

/**
 * Check if election is ongoing
 * @param {string|Date} startDate 
 * @param {string|Date} endDate 
 * @returns {boolean}
 */
export const isOngoing = (startDate, endDate) => {
  const now = new Date();
  return new Date(startDate) <= now && now <= new Date(endDate);
};
