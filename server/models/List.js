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
            type: String
        },
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = listSchema;