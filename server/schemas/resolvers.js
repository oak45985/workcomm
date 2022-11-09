const { AuthenticationError } = require('apollo-server-express');
const { User, Task, Event } = require('../models');
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
        },
        task: async (paren, { _id }) => {
            return Task.findOne({ _id });
        },
        events: async () => {
            return Event.find()
                .select('-__v');
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
        },
        addPicture: async (parent, { picture }, context) => {
            if (context.user) {
               const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { picture: picture },
                    { new: true }
                );
                console.log(updatedUser);
                return updatedUser;
            }
            throw new AuthenticationError('Please login to upload image');
        },
        addList: async (parent, { taskId, listContent }, context) => {
            if (context.user) {
                const updatedTask = await Task.findOneAndUpdate(
                    { _id: taskId },
                    { $push: { lists: { listContent, username: context.user.username } } },
                    { new: true }
                );
                return updatedTask;
            }
            throw new AuthenticationError('please login');
        },
        addEvent: async (parent, args, context) => {
            if (context.user) {
                const event = await Event.create({ ...args, username: context.user.username });

                return event;
            }
            throw new AuthenticationError("Please login to create an event");
        },
        deleteTask: async (parent, args, context) => {
            const { id } = args
            if (context.user) {
                const deletedTask = await Task.findByIdAndDelete(id);

                await User.findByIdAndRemove(
                    { _id: context.user._id },
                    { $pull: { tasks: task._id }},
                    { new: true}
                );
                
                console.log('post deleted');
                return null;
            }
            throw new AuthenticationError('Login to delete task.')
        }
    }
}

module.exports = resolvers;