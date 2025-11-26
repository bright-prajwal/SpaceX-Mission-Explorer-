const LRU = require('lru-cache');
const { LRUCache } = require("lru-cache");


const cache = new LRUCache({
  max: 100,
  ttl: 1000 * 60 * 10,
});



function getCacheStats() {
  return {
    size: cache.size,
    max: cache.max,
    ttlMs: cache.ttl
  };
}

module.exports = {
  cache,
  getCacheStats
};

//

module.exports = cache;