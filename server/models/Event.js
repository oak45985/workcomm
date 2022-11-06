const { Schema, model } = require('mongoose');

const eventSchema = new Schema(
    {
        eventTitle: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 25
        },
        allDay: {
            type: Boolean,
            default: true
        },
        start: {
            type: String,
            required: true
        },
        end: {
            type: String,
            required: true
        }

        }
);

const Event = model('Event', eventSchema);

module.exports = Event;