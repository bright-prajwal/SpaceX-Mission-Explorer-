const app = require('./app');
const { port } = require('./config/env');

app.set('env', process.env.NODE_ENV || 5001);

app.listen(port, () => {
  console.log(`NASA APOD API running on http://localhost:${port}`);
});

