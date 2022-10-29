const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        picture: String
        messages: [Message]
        tasks: [Task]
    }

    type Query {
        me: User
        users: [Users]
        user(username: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, picture: String): Auth
    }
`;

module.exports = typeDefs;