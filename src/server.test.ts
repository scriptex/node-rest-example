/**
 * External dependencies
 */
import { model } from 'mongoose';
import { ObjectId, ObjectID } from 'mongodb';
import { beforeEach, describe, it } from 'mocha';
import { Request, Response } from 'express';

const expect = require('expect');
const request = require('supertest');

/**
 * Internal dependencies
 */
import app from './server';
import TaskSchema from '../api/models/todoListModel';

interface Todo {
	_id: ObjectID;
	name: string;
	Created_date: number;
	status: string;
}

interface Todos extends Array<Todo> {
	body: Array<Todo>;
}

interface TodoResponse extends Response {
	body: Todo;
}

/**
 * Create the DB model
 */
const Tasks = model('Tasks', TaskSchema);

/**
 * Mock data
 */
const items = [
	{
		_id: new ObjectId(),
		name: 'First todo',
		Created_date: new Date().getTime(),
		status: 'pending'
	},
	{
		_id: new ObjectId(),
		name: 'Second todo',
		Created_date: new Date().getTime(),
		status: 'ongoing'
	}
];

/**
 * Empty and then populate the DB
 */
beforeEach((done): void => {
	Tasks.remove({})
		.then((): any => Tasks.insertMany(items))
		.then((): any => done());
});

/**
 * Run the test suite
 */
describe('API', () => {
	const name: string = 'New todo';
	const first = items[0];
	const newName: string = 'Updated todo';

	it('should list all todos', (done: Function): void => {
		request(app)
			.get('/tasks')
			.send()
			.expect(200)
			.expect(
				(res: Todos): void => {
					expect(res.body.length).toBe(items.length);
				}
			)
			.end(
				(err: Object, res: TodoResponse): void => {
					if (err) {
						done(err);
					} else {
						done();
					}
				}
			);
	});

	it('should create a new todo', (done: Function): void => {
		request(app)
			.post('/tasks')
			.send({ name })
			.expect(200)
			.expect(
				(res): void => {
					expect(res.body.name).toBe(name);
				}
			)
			.end(
				(err: Object, res: TodoResponse): void => {
					if (err) {
						return done(err);
					}

					Tasks.find(
						{ name },
						(err, todos: Todos): void => {
							if (err) {
								done(err);
							} else {
								expect(todos.length).toBe(1);
								expect(todos[0].name).toBe(name);
								done();
							}
						}
					);
				}
			);
	});

	it('should not create a new todo if invalid body is supplied', (done: Function): void => {
		request(app)
			.post('/tasks')
			.send({})
			.expect(400)
			.end(
				(err: Object, res: TodoResponse): void => {
					if (err) {
						return done(err);
					}

					Tasks.find(
						(err: any, todos: Todos): void => {
							if (err) {
								done(err);
							} else {
								expect(todos.length).toBe(items.length);
								done();
							}
						}
					);
				}
			);
	});

	it('should read a todo', (done: Function): void => {
		request(app)
			.get(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.expect(
				(res: TodoResponse): void => {
					expect(res.body.name).toBe(first.name);
				}
			)
			.end(done);
	});

	it('should update a todo', (done: Function): void => {
		request(app)
			.put(`/tasks/${first._id.toHexString()}`)
			.send({
				name: newName
			})
			.expect(200)
			.expect(
				(res: TodoResponse): void => {
					expect(res.body.name).toBe(newName);
				}
			)
			.end(done);
	});

	it('should delete a todo', (done: Function): void => {
		request(app)
			.delete(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.end(done);
	});
});
