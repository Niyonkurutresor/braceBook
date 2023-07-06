/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-duplicates
import http from 'http';
import app from './app.js';
import config from './src/helper/config.js';

const server = http.createServer(app);

process.on('uncaughtException', (err) => {
  console.log(`${err.name} message:${err.message} at ${err.stack}`);
  process.exit(1);
});
const port = config.PORT || 5000;

server.listen(port, () => {
  console.log(`server is listening on port ${port}...`);
});
