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
            required: True
        },
        createdTaskAt: {
            type: Date,
            default: Date.now
        },
        taskContent: {
            type: String
        },
        taskList: [listSchema],
        taskDue: {
            type: Date
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