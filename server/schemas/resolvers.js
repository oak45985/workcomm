const { AuthenticationError } = require('apollo-server-express');
const { User, Task } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('tasks');
                return userData;
            }
            throw new AuthenticationError('Please log in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('tasks');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('tasks');
        },
        tasks: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Task.find(params).sort({ createdTaskAt: -1 });
        }
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if(!user) {
                throw new AuthenticationError('User does not exist!');
            }

            const validPw = await user.isCorrectPassword(password);

            if (!validPw) {
                throw new AuthenticationError('Password is incorrect');
            }
            const token = signToken(user);
            return { token, user };
        },
        addTask: async (parent, args, context) => {
            if (context.user) {
                const task = await Task.create({ ...args, username: context.user.username });

                 await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { tasks: task._id }},
                    { new: true}
                );

                return task;
            }
            throw new AuthenticationError('Please login to create a task');
        }
    }
}

module.exports = resolvers;