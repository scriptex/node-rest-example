/**
 * External dependencies
 */
import { model, connect } from 'mongoose';
import * as express from 'express';
import * as bodyParser from 'body-parser';

/**
 * Internal dependencies
 */
import routes from '../api/routes/todoListRoutes';
import TaskSchema from '../api/models/todoListModel';

/**
 * Init
 */
const app: express.Application = express();
const port = process.env.PORT || 3000;

/**
 * Mongo setup
 */
model('Tasks', TaskSchema);
connect('mongodb://localhost/Tododb');

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

export default app;
