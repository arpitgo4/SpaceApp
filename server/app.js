
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');

const { errorHandler } = require('./middlewares');

const spaceRouter = require('./routes/space');
const userRouter = require('./routes/user');

const app = express();

app.set('json spaces', 4);
app.disable('etag'); 
app.use(cors());

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// routes
app.get('/misc/health', (_, res) => res.status(200).json({}));
app.use('/space', spaceRouter);
app.use('/users', userRouter);

app.use('*', (req, res) => res.status(404).json({ message: 'API server error, support notified' }));

app.use(errorHandler);

module.exports = app;
