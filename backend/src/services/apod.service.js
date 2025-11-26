const { cachedGet } = require('../utils/apiClient');

async function getApodByDate(date) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    const e = new Error('Invalid date format. Use YYYY-MM-DD.');
    e.status = 400;
    throw e;
  }
  return cachedGet('/planetary/apod', { date });
}


async function getApodToday() {
  return cachedGet('/planetary/apod', {});
}


async function getRecent(count = 20) {
  const n = Math.min(Math.max(parseInt(count, 20) || 20, 1), 100);
  return cachedGet('/planetary/apod', { count: n, thumbs: true });
}


async function getRange(start_date, end_date) {
  if (!start_date || !end_date) {
    const e = new Error('start_date and end_date are required (YYYY-MM-DD).');
    e.status = 400;
    throw e;
  }
  return cachedGet('/planetary/apod', {
    start_date,
    end_date,
    thumbs: true
  });
}

module.exports = {
  getApodByDate,
  getApodToday,
  getRecent,
  getRange
};
