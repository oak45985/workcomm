import { gql } from '@apollo/client';

//User Items
export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $picture: String!) {
        addUser(username: $username, email: $email, password: $password, picture: $picture) {
            token
            user {
                _id
                username
                picture
            }
        }
    }
`;

//Task Items
export const ADD_TASK = gql`
    mutation addTask($body: taskInput!) {
        addTask(body: $body) {
            _id
            taskTitle
            username
            createdTaskAt
            taskContent
            taskList {
                _id
                listContent
                username
                listCreatedAt
            }
            teamMembers {
                _id
                username
            }
        }
    }
`