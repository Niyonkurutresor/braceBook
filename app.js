/* eslint-disable import/no-duplicates */
/* eslint-disable import/named */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/extensions */
// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import swaggerUI from 'swagger-ui-express';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
// import xss from 'xss';
import { readFile } from 'fs/promises';
import databaseconnection from './src/database/dbConnection.js';
// import requestLImiter from './src/helper/requestLimiter.js';
import routes from './src/routes/index.js';
import USerServicies from './src/database/services/userservicies.js';
import PostServicies from './src/database/services/PostsServicies.js';
import { users, posts } from './defaultData.js';
import googleSignup from './src/controller/signupWithGoogleController.js';
import facebookSignup from './src/controller/signupWithFacebook.js';
import errorController from './src/controller/errorController.js';

const app = express();

databaseconnection();

// populating data.
async function createDefaultData() {
  await USerServicies.deleteUsers();
  await PostServicies.deletePosts();
  await USerServicies.createUsers(users);
  await PostServicies.createPosts(posts);
}

const somethingIntoDatabase = await USerServicies.findAllUsers();
if (somethingIntoDatabase.length === 0) {
  createDefaultData();
}

// swagger
const docs = JSON.parse(
  await readFile(new URL('./swagger.json', import.meta.url))
);

app.use(morgan('dev'));
app.use(cors({
  origin: ['http://127.0.0.1:5501', 'http://localhost:5501']
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(ExpressMongoSanitize());
app.use(googleSignup);
app.use(facebookSignup);
// app.use(xss());
// app.use('/api', requestLImiter);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(docs));
app.use('/api/v1', routes);
app.use(errorController);

export default app;
