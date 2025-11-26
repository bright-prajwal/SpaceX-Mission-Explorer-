// Central error handler
// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const status = err.status || err.response?.status || 500;
  const message =
    err.message ||
    err.response?.data?.error?.message ||
    err.response?.data?.msg ||
    'Internal Server Error';

  const payload = {
    success: false,
    message
  };

  if (req.app.get('env') !== 'production') {
    payload.stack = err.stack;
    if (err.response?.data) payload.upstream = err.response.data;
  }

  res.status(status).json(payload);
}

module.exports = errorHandler;
