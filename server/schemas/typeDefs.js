const { gql } = require('apollo-server-express');


// insert User items for messages & tasks
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        picture: String
        messages: [Message]
        status: String
    }

    type Message {
        _id: ID
        content: String
        from: [User]
        to: [User]
        socketid: String
        createdAt: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        messages: [Message]
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, picture: String): Auth
    }

    type Subscription {
        postCreated: Post
    }

`;

module.exports = typeDefs;