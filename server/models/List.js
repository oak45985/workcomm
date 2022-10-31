const { Schema } = require('mongoose');

const listSchema = new Schema(
    {
        listContent: {
            type: String,
        },
        username: {
            type: String,
            required: true
        },
        listCreatedAt: {
            type: Date,
            default: Date.now
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = listSchema;