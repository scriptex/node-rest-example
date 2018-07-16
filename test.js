/**
 * External dependencies
 */
const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

/**
 * Internal dependencies
 */
const app = require('./server');
const Model = require('./api/models/todoListModel.js');

/**
 * Create the DB model
 */
const Tasks = mongoose.model('Tasks', Model);

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
beforeEach(done => {
	Tasks.remove({})
		.then(() => Tasks.insertMany(items))
		.then(() => done());
});

/**
 * Run the test suite
 */
describe('POST /tasks', () => {
	const name = 'New todo';
	const first = items[0];
	const newName = 'Updated todo';

	it('should list all todos', done => {
		request(app)
			.get('/tasks')
			.send()
			.expect(200)
			.expect(res => expect(res.body.length).toBe(items.length))
			.end((err, res) => (err ? done(err) : done()));
	});

	it('should create a new todo', done => {
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

	it('should not create a new todo if invalid body is supplied', done => {
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

	it('should read a todo', done => {
		request(app)
			.get(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.expect(res => expect(res.body.name).toBe(first.name))
			.end(done);
	});

	it('should update a todo', done => {
		request(app)
			.put(`/tasks/${first._id.toHexString()}`)
			.send({
				name: newName
			})
			.expect(200)
			.expect(res => expect(res.body.name).toBe(newName))
			.end(done);
	});

	it('should delete a todo', done => {
		request(app)
			.delete(`/tasks/${first._id.toHexString()}`)
			.expect(200)
			.end(done);
	});
});
