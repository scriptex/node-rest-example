/**
 * External dependencies
 */
const { Schema } = require('mongoose');

/**
 * Create the DB Schema
 */
module.exports = new Schema({
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
