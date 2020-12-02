"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.read = exports.create = exports.listALL = void 0;
const mongoose_1 = require("mongoose");
/**
 * Internal dependencies
 */
const todoListModel_1 = require("../models/todoListModel");
/**
 * Create the DB Model
 */
const Task = mongoose_1.model('Tasks', todoListModel_1.default);
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
const listALL = (req, res) => {
    Task.find({}, (err, task) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
};
exports.listALL = listALL;
/**
 * Create an item
 */
const create = (req, res) => {
    const task = new Task(req.body);
    if (!req.body.name) {
        res.status(400);
        return res.send(createError);
    }
    task.save((err, data) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
};
exports.create = create;
/**
 * Read an item
 */
const read = (req, res) => {
    Task.findById(req.params.taskId, (err, task) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
};
exports.read = read;
/**
 * Update an item
 */
const update = (req, res) => {
    const _id = req.params.taskId;
    Task.findOneAndUpdate({ _id }, req.body, { new: true }, (err, task) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json(task);
        }
    });
};
exports.update = update;
/**
 * Delete an item
 */
const remove = (req, res) => {
    const _id = req.params.taskId;
    Task.remove({ _id }, (err) => {
        if (err) {
            res.send(err);
        }
        else {
            res.json({ _id });
        }
    });
};
exports.remove = remove;
//# sourceMappingURL=todoListController.js.map