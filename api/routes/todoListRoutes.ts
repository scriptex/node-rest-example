/**
 * External dependencies
 */
import { Application } from 'express';

/**
 * Internal dependencies
 */
import { listALL, create, read, update, remove } from '../controllers/todoListController';

/**
 * Application routes
 */
export default (app: Application): void => {
	/**
	 * GLobal routes
	 */
	app.route('/tasks').get(listALL).post(create);

	/**
	 * Single item routes
	 */
	app.route('/tasks/:taskId').get(read).put(update).delete(remove);
};
