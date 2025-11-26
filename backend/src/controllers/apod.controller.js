const {
  getApodByDate,
  getApodToday,
  getRecent,
  getRange
} = require('../services/apod.service');

async function today(req, res) {
  const data = await getApodToday();
  res.json({ success: true, data });
}

async function byDate(req, res) {
  const { date } = req.params;
  const data = await getApodByDate(date);
  res.json({ success: true, data });
}

async function recent(req, res) {
  const { count } = req.query;
  const data = await getRecent(count);
  res.json({ success: true, count: data.length || 1, data });
}

async function range(req, res) {
  const { start_date, end_date } = req.query;
  const data = await getRange(start_date, end_date);
  res.json({ success: true, count: data.length || 0, data });
}

module.exports = {
  today,
  byDate,
  recent,
  range
};
