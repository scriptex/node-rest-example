"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const mongoose_1 = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
/**
 * Internal dependencies
 */
const todoListRoutes_1 = require("../api/routes/todoListRoutes");
const todoListModel_1 = require("../api/models/todoListModel");
/**
 * Init
 */
const app = express();
const port = process.env.PORT || 3000;
/**
 * Mongo setup
 */
mongoose_1.model('Tasks', todoListModel_1.default);
mongoose_1.connect('mongodb://localhost/Tododb');
/**
 * Dependencies setup
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
/**
 * Assign routes
 */
todoListRoutes_1.default(app);
/**
 * Listen
 */
app.listen(port);
exports.default = app;
//# sourceMappingURL=server.js.map