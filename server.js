/**
 * External dependencies
 */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

/**
 * Internal dependencies
 */
const routes = require('./api/routes/todoListRoutes');
const TaskSchema = require('./api/models/todoListModel');

/**
 * Init
 */
const app = express();
const port = process.env.PORT || 3000;

/**
 * Mongo setup
 */
mongoose.Promise = global.Promise;
mongoose.model('Tasks', TaskSchema);
mongoose.connect('mongodb://localhost/Tododb');

/**
 * Dependencies setup
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * Assign routes
 */
routes(app);

/**
 * Listen
 */
app.listen(port);

module.exports = app;
