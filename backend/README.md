# NASA APOD Explorer — Backend (Node.js + Express)

A clean, production-quality backend for the NASA APOD Explorer project.

## Features
- Node.js + Express server
- Cached NASA API requests
- LRU Cache with TTL + max size
- Route handlers for:
  - `/api/apod/today`
  - `/api/apod/:date`
  - `/api/apod/recent?count=`
  - `/api/apod/range?start_date=X&end_date=Y`
- Error handling middleware
- Helmet + CORS + Morgan logging
- Works locally with frontend


