const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const apodRoutes = require('./routes/apod.routes');
const errorHandler = require('./middlewares/errorHandler');
const { getCacheStats } = require('./utils/cache');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120, // 120 requests per minute per IP
});
app.use(limiter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    cache: getCacheStats()
  });
});

// apod routes
app.use('/api/apod', apodRoutes);

// 404 page not found 
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handle
app.use(errorHandler);

module.exports = app;
