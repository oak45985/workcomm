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
    mutation addTask($taskTitle: String!, $taskContent: String!, $taskDue: String!) {
        addTask(taskTitle: $taskTitle, taskContent: $taskContent, taskDue: $taskDue) {
            _id
            taskTitle
            username
            createdTaskAt
            taskContent
            taskDue
        }   
    }
`