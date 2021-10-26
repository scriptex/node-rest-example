/**
 * External dependencies
 */
import { Request, Response } from 'express';
import { model, Document, Model } from 'mongoose';

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
const deleteError: ErrorObject = {
	message: 'Task successfully deleted!'
};

const createError: ErrorObject = {
	message: 'Error: missing name!'
};

/**
 * Get all items
 */
const listALL = (req: Request, res: Response): void => {
	Task.find({}, (err: Error, task: Model<Document>): void => {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
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

	task.save((err: Error, data: Document): void => {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
};

/**
 * Read an item
 */
const read = (req: Request, res: Response): void => {
	Task.findById(req.params.taskId, (err: Error, task: Model<Document>): void => {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
};

/**
 * Update an item
 */
const update = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.findOneAndUpdate({ _id }, req.body, { new: true }, (err: Error, task: Document): void => {
		if (err) {
			res.send(err);
		} else {
			res.json(task);
		}
	});
};

/**
 * Delete an item
 */
const remove = (req: Request, res: Response): void => {
	const _id = req.params.taskId;

	Task.remove({ _id }, (err: Error): void => {
		if (err) {
			res.send(err);
		} else {
			res.json({ _id });
		}
	});
};

export { listALL, create, read, update, remove };
