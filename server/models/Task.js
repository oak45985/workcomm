const { Schema, model } = require('mongoose');
const listSchema = require('./List');

const taskSchema = new Schema(
    {
        taskTitle: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        createdTaskAt: {
            type: String,
        },
        taskContent: {
            type: String
        },
        taskList: [listSchema],
        taskDue: {
            type: String
        },
        teamMembers: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ],
    },
    {
        toJSON: {
            getters: true
        }
    }
);

const Task = model('Task', taskSchema);

module.exports = Task;