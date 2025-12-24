// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const morgan = require('morgan');
// const rateLimit = require('express-rate-limit');
// const apodRoutes = require('./routes/apod.routes');
// const errorHandler = require('./middlewares/errorHandler');
// const { getCacheStats } = require('./utils/cache');

// const app = express();

// app.use(helmet());
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));


// // app.use(cors({   //new for deployment
// //   origin: "*"
// // }));


// const limiter = rateLimit({
//   windowMs: 60 * 1000,
//   max: 120, // 120 requests per minute per IP
// });
// app.use(limiter);

// // Health check
// app.get('/api/health', (req, res) => {
//   res.json({
//     status: 'ok',
//     timestamp: new Date().toISOString(),
//     cache: getCacheStats()
//   });
// });

// // apod routes
// app.use('/api/apod', apodRoutes);

// // 404 page not found 
// app.use((req, res) => {
//   res.status(404).json({ success: false, message: 'Route not found' });
// });


// app.use(cors({   //new for deployment
//   origin: "*"
// }));

// // Error handle
// app.use(errorHandler);

// module.exports = app;

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const apodRoutes = require('./routes/apod.routes');
const errorHandler = require('./middlewares/errorHandler');
const { getCacheStats } = require('./utils/cache');

const app = express();

/* ========================
   GLOBAL MIDDLEWARE
======================== */
app.use(helmet());
app.use(cors({ origin: "*" })); // ✅ CORS FIRST
app.use(express.json());
app.use(morgan('dev'));

/* ========================
   RATE LIMIT
======================== */
const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 120,
});
app.use(limiter);

/* ========================
   HEALTH CHECK
======================== */
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    status: 'ok',
    timestamp: new Date().toISOString(),
    cache: getCacheStats()
  });
});

/* ========================
   API ROUTES
======================== */
app.use('/api/apod', apodRoutes);

/* ========================
   404 HANDLER (LAST ROUTE)
======================== */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

/* ========================
   ERROR HANDLER (VERY LAST)
======================== */
app.use(errorHandler);

module.exports = app;
