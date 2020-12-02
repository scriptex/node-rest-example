/**
 * External dependencies
 */
import { Schema } from 'mongoose';

/**
 * Create the DB Schema
 */
export default new Schema({
	name: String,
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
