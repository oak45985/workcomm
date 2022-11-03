const { gql } = require('apollo-server-express');


// insert User items for messages & tasks
const typeDefs = gql`
    type Task {
        _id: ID
        taskTitle: String
        username: String
        createdTaskAt: String
        taskContent: String
        taskDue: String
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
        tasks: [Task]
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        tasks(username: String): [Task]
        task: Task
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!, picture: String): Auth
        addTask(taskTitle: String!, taskContent: String, taskDue: String): Task
    }
`;

module.exports = typeDefs;