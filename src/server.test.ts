/**
 * External dependencies
 */
import { model } from 'mongoose';
import { ObjectId } from 'mongodb';
import { beforeEach, describe, it } from 'mocha';

const expect = require('expect');
const request = require('supertest');

/**
 * Internal dependencies
 */
import app from './server';
import TaskSchema from '../api/models/todoListModel';

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

	it('should list all todos', (done): void => {
		request(app)
			.get('/tasks')
			.send()
			.expect(200)
			.expect(res => expect(res.body.length).toBe(items.length))
			.end((err, res) => (err ? done(err) : done()));
	});

	it('should create a new todo', (done): void => {
		request(app)
			.post('/tasks')
			.send({ name })
			.expect(200)
			.expect(res => expect(res.body.name).toBe(name))
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Tasks.find({ name })
					.then(todos => {
						expect(todos.length).toBe(1);
						expect(todos[0].name).toBe(name);
						done();
					})
					.catch(e => done(e));
			});
	});

	it('should not create a new todo if invalid body is supplied', (done): void => {
		request(app)
			.post('/tasks')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Tasks.find()
					.then(todos => {
						expect(todos.length).toBe(items.length);
						done();
					})
					.catch(e => done(e));
			});
	});

	it('should read a todo', (done): void => {
		request(app)
			.get(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.expect(res => expect(res.body.name).toBe(first.name))
			.end(done);
	});

	it('should update a todo', (done): void => {
		request(app)
			.put(`/tasks/${first._id.toHexString()}`)
			.send({
				name: newName
			})
			.expect(200)
			.expect(res => expect(res.body.name).toBe(newName))
			.end(done);
	});

	it('should delete a todo', (done): void => {
		request(app)
			.delete(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.end(done);
	});
});
