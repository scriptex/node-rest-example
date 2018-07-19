/**
 * External dependencies
 */
import { model } from 'mongoose';
import { Request, Response } from 'express';

/**
 * Internal dependencies
 */
import TaskSchema from '../models/todoListModel';

/**
 * Create the DB Model
 */
const Task = model('Tasks', TaskSchema);

/**
 * Custom messages
 */
const deleteError: Object = {
	message: 'Task successfully deleted!'
};

const createError: Object = {
	message: 'Error: missing name!'
};

/**
 * Get all items
 */
const listALL = (req: Request, res: Response): any => {
	Task.find(
		{},
		(err: Object, task: Object): void => {
			if (err) {
				res.send(err);
			} else {
				res.json(task);
			}
		}
	);
};

/**
 * Create an item
 */
const create = (req: Request, res: Response): any => {
	const task = new Task(req.body);

	if (!req.body.name) {
		res.status(400);

		return res.send(createError);
	}

	task.save(
		(err: Object, data: Object): void => {
			if (err) {
				res.send(err);
			} else {
				res.json(task);
			}
		}
	);
};

/**
 * Read an item
 */
const read = (req: Request, res: Response): void => {
	Task.findById(
		req.params.taskId,
		(err: Object, task: Object): void => {
			if (err) {
				res.send(err);
			} else {
				res.json(task);
			}
		}
	);
};

/**
 * Update an item
 */
const update = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.findOneAndUpdate(
		{ _id },
		req.body,
		{ new: true },
		(err: Object, task: Object): void => {
			if (err) {
				res.send(err);
			} else {
				res.json(task);
			}
		}
	);
};

/**
 * Delete an item
 */
const remove = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.remove(
		{ _id },
		(err: Object): void => {
			if (err) {
				res.send(err);
			} else {
				res.json({ _id });
			}
		}
	);
};

export { listALL, create, read, update, remove };
