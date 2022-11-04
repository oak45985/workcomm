const { Schema, model } = require('mongoose');
const listSchema = require('./List');
const dateFormat = require('../utils/dateFormat'); 

const taskSchema = new Schema(
    {
        taskTitle: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 75
        },
        username: {
            type: String,
            required: true
        },
        createdTaskAt: {
            type: Date,
            default: Date.now,
            get: timestamp => dateFormat(timestamp)
        },
        taskContent: {
            type: String
        },
        lists: [listSchema],
        taskDue: {
            type: String
        },
        // teamMembers: [
        //     {
        //         type: Schema.Types.OjectId,
        //         ref: 'User'
        //     }
        // ]

        },
    {
        toJSON: {
            getters: true
        }
    }
);

const Task = model('Task', taskSchema);

module.exports = Task;