/**
 * Application routes
 */
module.exports = app => {
	const todoList = require('../controllers/todoListController');

	/**
	 * GLobal routes
	 */
	app.route('/tasks')
		.get(todoList.listALL)
		.post(todoList.create);

	/**
	 * Single item routes
	 */
	app.route('/tasks/:taskId')
		.get(todoList.read)
		.put(todoList.update)
		.delete(todoList.delete);
};
