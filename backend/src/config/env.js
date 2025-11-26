const dotenv = require('dotenv');
dotenv.config();

const config = {
  env: process.env.NODE_ENV ,
  port: parseInt(process.env.PORT,10),
  nasaApiKey: process.env.NASA_API_KEY ,
  nasaBaseUrl: process.env.NASA_API_BASE,
  cacheTtlMs: parseInt(process.env.CACHE_TTL_MS,10),
  cacheMaxItems: parseInt(process.env.CACHE_MAX_ITEMS,10),
  requestTimeoutMs: parseInt(process.env.REQUEST_TIMEOUT_MS, 10)
};

if (!process.env.NASA_API_KEY) {
  console.warn(' NASA_API_KEY not set. Using DEMO_KEY rate limited.');
}

module.exports = config;
