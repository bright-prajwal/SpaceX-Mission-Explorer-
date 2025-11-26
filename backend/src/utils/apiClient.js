const axios = require('axios');
const { nasaBaseUrl, nasaApiKey, requestTimeoutMs } = require('../config/env');
const cache = require('./cache');  

const instance = axios.create({
  baseURL: nasaBaseUrl,
  timeout: requestTimeoutMs
});


async function cachedGet(path, params = {}) {
  const fullParams = { ...params, api_key: nasaApiKey };

  const queryKey = new URLSearchParams(fullParams).toString();
  const cacheKey = `${path}?${queryKey}`;

  const cached = cache.get(cacheKey);
  if (cached) return cached;

  try {
  const res = await instance.get(path, { params: fullParams });
  cache.set(cacheKey, res.data);
  return res.data;
} catch (err) {
  console.error("NASA API ERROR:", err.response?.status, err.response?.data || err.message);
  throw err;
}

  cache.set(cacheKey, res.data);

  return res.data;
}

module.exports = { cachedGet };
