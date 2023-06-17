/* eslint-disable import/no-duplicates */
/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import ExpressMongoSanitize from 'express-mongo-sanitize';
// import xss from 'xss';
import databaseconnection from './src/database/dbConnection.js';
// import requestLImiter from './src/helper/requestLimiter.js';
import routes from './src/routes/index.js';
import USerServicies from './src/database/services/userservicies.js';
import PostServicies from './src/database/services/PostsServicies.js';
import { users, posts } from './defaultData.js';

const app = express();

databaseconnection();

async function createDefaultData() {
  await USerServicies.deleteUsers();
  await PostServicies.deletePosts();
  await USerServicies.createUsers(users);
  await PostServicies.createPosts(posts);
}

createDefaultData();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(ExpressMongoSanitize());
// app.use(xss());
// app.use('/api', requestLImiter);
app.use('/api/v1', routes);

export default app;
