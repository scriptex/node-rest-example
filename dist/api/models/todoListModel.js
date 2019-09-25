"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * External dependencies
 */
const mongoose_1 = require("mongoose");
/**
 * Create the DB Schema
 */
exports.default = new mongoose_1.Schema({
    name: {
        type: String,
        required: 'Enter the name of the task'
    },
    Created_date: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [
            {
                type: String,
                enum: ['pending', 'ongoing', 'completed']
            }
        ],
        default: ['pending']
    }
});
//# sourceMappingURL=todoListModel.js.map