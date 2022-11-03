import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { QUERY_ME_LITE, QUERY_TASKS } from '../utils/queries';
// import UserList from '../components/UserList';
// import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const Home = () => {
    
    const { loading, data } = useQuery(QUERY_TASKS);
    const { data: userData } = useQuery(QUERY_ME_LITE);

    const tasks = data?.tasks || [];

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
                {loading ? (
                <div>Loading...</div>
                ):(
                    <TaskList tasks={tasks} />
                )}
            </div>
        </main>
    );
};

export default Home;