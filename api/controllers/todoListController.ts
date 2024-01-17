/**
 * External dependencies
 */
import { model, Document } from 'mongoose';
import { Request, Response } from 'express';

/**
 * Internal dependencies
 */
import TaskSchema from '../models/todoListModel';

interface ErrorObject {
	message: string;
}

/**
 * Create the DB Model
 */
const Task = model('Tasks', TaskSchema);

/**
 * Custom messages
 */
const createError: ErrorObject = {
	message: 'Error: missing name!'
};

/**
 * Get all items
 */
const listALL = (req: Request, res: Response): void => {
	Task.find({}).then(res.json).catch(res.send);
};

/**
 * Create an item
 */
const create = (req: Request, res: Response): Response | void => {
	const task: Document = new Task(req.body);

	if (!req.body.name) {
		res.status(400);

		return res.send(createError);
	}

	task.save()
		.then(() => {
			res.json(task);
		})
		.catch(res.send);
};

/**
 * Read an item
 */
const read = (req: Request, res: Response): void => {
	Task.findById(req.params.taskId).then(res.json).catch(res.send);
};

/**
 * Update an item
 */
const update = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.findOneAndUpdate({ _id }, req.body, { new: true }).then(res.json).catch(res.send);
};

/**
 * Delete an item
 */
const remove = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.findByIdAndDelete({ _id })
		.then(() => res.json({ _id }))
		.catch(res.send);
};

export { listALL, create, read, update, remove };
