"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoose_1 = require("mongoose");
const mocha_1 = require("mocha");
const expect = require('expect');
const request = require('supertest');
/**
 * Internal dependencies
 */
const server_1 = require("./server");
const todoListModel_1 = require("../api/models/todoListModel");
/**
 * Create the DB model
 */
const Tasks = mongoose_1.model('Tasks', todoListModel_1.default);
/**
 * Mock data
 */
const items = [
    {
        _id: new mongodb_1.ObjectId(),
        name: 'First todo',
        Created_date: new Date().getTime(),
        status: 'pending'
    },
    {
        _id: new mongodb_1.ObjectId(),
        name: 'Second todo',
        Created_date: new Date().getTime(),
        status: 'ongoing'
    }
];
/**
 * Empty and then populate the DB
 */
mocha_1.beforeEach((done) => {
    Tasks.remove({})
        .then(() => Tasks.insertMany(items))
        .then(() => done());
});
/**
 * Run the test suite
 */
mocha_1.describe('API', () => {
    const name = 'New todo';
    const first = items[0];
    const newName = 'Updated todo';
    mocha_1.it('should list all todos', (done) => {
        request(server_1.default)
            .get('/tasks')
            .send()
            .expect(200)
            .expect((res) => {
            expect(res.body.length).toBe(items.length);
        })
            .end((err, res) => {
            if (err) {
                done(err);
            }
            else {
                done();
            }
        });
    });
    mocha_1.it('should create a new todo', (done) => {
        request(server_1.default)
            .post('/tasks')
            .send({ name })
            .expect(200)
            .expect((res) => {
            expect(res.body.name).toBe(name);
        })
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            Tasks.find({ name }, (err, todos) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(todos.length).toBe(1);
                    expect(todos[0].name).toBe(name);
                    done();
                }
            });
        });
    });
    mocha_1.it('should not create a new todo if invalid body is supplied', (done) => {
        request(server_1.default)
            .post('/tasks')
            .send({})
            .expect(400)
            .end((err, res) => {
            if (err) {
                return done(err);
            }
            Tasks.find((err, todos) => {
                if (err) {
                    done(err);
                }
                else {
                    expect(todos.length).toBe(items.length);
                    done();
                }
            });
        });
    });
    mocha_1.it('should read a todo', (done) => {
        request(server_1.default)
            .get(`/tasks/${first._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
            expect(res.body.name).toBe(first.name);
        })
            .end(done);
    });
    mocha_1.it('should update a todo', (done) => {
        request(server_1.default)
            .put(`/tasks/${first._id.toHexString()}`)
            .send({
            name: newName
        })
            .expect(200)
            .expect((res) => {
            expect(res.body.name).toBe(newName);
        })
            .end(done);
    });
    mocha_1.it('should delete a todo', (done) => {
        request(server_1.default)
            .delete(`/tasks/${first._id.toHexString()}`)
            .expect(200)
            .end(done);
    });
});
//# sourceMappingURL=server.test.js.map