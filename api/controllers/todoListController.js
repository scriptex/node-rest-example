/**
 * External dependencies
 */
const mongoose = require('mongoose');

/**
 * Create the DB Model
 */
const Task = mongoose.model('Tasks');

/**
 * Custom messages
 */
const deleteError = {
	message: 'Task successfully deleted!'
};

const createError = {
	message: 'Error: missing name!'
};

/**
 * Get all items
 */
exports.listALL = (req, res) =>
	Task.find({}, (err, task) => (err ? res.send(err) : res.json(task)));

/**
 * Create an item
 */
exports.create = (req, res) => {
	const task = new Task(req.body);

	if (!req.body.name) {
		res.status(400);

		return res.send(createError);
	}

	task.save((err, data) => (err ? res.send(err) : res.json(data)));
};

/**
 * Read an item
 */
exports.read = (req, res) =>
	Task.findById(
		req.params.taskId,
		(err, task) => (err ? req.send(err) : res.json(task))
	);

/**
 * Update an item
 */
exports.update = (req, res) => {
	console.log(req.params.taskId);

	Task.findOneAndUpdate(
		{
			_id: req.params.taskId
		},
		req.body,
		{
			new: true
		},
		(err, task) => (err ? res.send(err) : res.json(task))
	);
};

/**
 * Delete an item
 */
exports.delete = (req, res) =>
	Task.remove(
		{
			_id: req.params.taskId
		},
		(err, task) => (err ? res.send(err) : res.json(deleteError))
	);
