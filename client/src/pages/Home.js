import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { QUERY_ME_LITE, QUERY_USERS, QUERY_TASKS } from '../utils/queries';
import UserList from '../components/UserList';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const Home = () => {
    
    const { loading, items } = useQuery(QUERY_TASKS);
    const { data: userData } = useQuery(QUERY_ME_LITE);

    const { data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    const tasks = items?.tasks || [];

    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                {loggedIn && userData ? (
                    <div>
                        <p>{userData.me.username}</p>
                        <p>{userData.me.email}</p>
                        <p>{userData.me.picture}</p>
                    </div>
                ): null}
                <div>
                    <UserList users={users}
                    />
                </div>
                <div>
                    <TaskInput />
                </div>
                <div>
                    <TaskList tasks={tasks} />
                </div>
            </div>
        </main>
    );
};

export default Home;