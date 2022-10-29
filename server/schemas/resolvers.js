const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password');
                return userData;
            }
            throw new AuthenticationError('Please log in');
        },
        users: async () => {
            return User.find()
                .select('-__v -password');
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password');
        }
    },
    Mutations: {
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
        }
    }
}

module.exports = resolvers;