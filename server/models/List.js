const { Schema } = require('mongoose');
const dateFormat = require('../utils/dateFormat'); 

const listSchema = new Schema(
    {
        listContent: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        listCreatedAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = listSchema;