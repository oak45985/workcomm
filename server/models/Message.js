const { Schema, model } = require('mongoose');

const messageSchema = new Schema(
    {
        content: {
            type: String,
        },
        from: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        to: [
            {
                type: Schema.Types.ObjectId,
                ref: "User"
            }
        ],
        socketid: {
            type: String
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    },
    {
        toJSON: {
            virtuals: true
        }
    }
)

const Message = model('Message', userSchema);

module.exports = Message;