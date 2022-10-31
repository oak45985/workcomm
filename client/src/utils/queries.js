import { gql } from '@apollo/client';

//User Items
export const QUERY_USER = gql`
    query user($username: String!) {
        user(username: $username) {
            _id
            username
            email
            picture
        }
    }
`;


export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            picture
        }
    }
`;


export const QUERY_ME_LITE = gql`
    {
        me {
            _id
            username
            email
            picture
            tasks {
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
    }
`;

//Task Items
export const QUERY_TASK = gql`
    query task($id: ID!) {
        task(_id: $id) {
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

export const QUERY_TASKS = gql`
    query tasks($username: String) {
        tasks(username: $username) {
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