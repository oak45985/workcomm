const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
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
        addTask: async (parent, { body }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { tasks: body }},
                    { new: true}
                    ).populate('tasks');

                return updatedUser;
            }
            throw new AuthenticationError('Please login to create a task');
        }
    }
}

module.exports = resolvers;