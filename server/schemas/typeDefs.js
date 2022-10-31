const { gql } = require('apollo-server-express');


// insert User items for messages & tasks
const typeDefs = gql`
    type Task {
        _id: ID
        taskTitle: String
        username: String
        createdTaskAt: String
        taskContent: String
        taskList: [List]
        teamMembers: [User]
    }

    type List {
        _id: ID
        listContent: String
        username: String
        listCreatedAt: String
    }

    type User {
        _id: ID
        username: String
        email: String
        picture: String
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, picture: String): Auth
        addTask(taskTitle: String!, taskContent: String!, taskDue: String!): Task
    }
`;

module.exports = typeDefs;