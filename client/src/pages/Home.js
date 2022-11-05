import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from '../utils/queries';
// import UserList from '../components/UserList';
// import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';

const Home = () => {
    
    const { loading, data } = useQuery(QUERY_TASKS);

    const tasks = data?.tasks || [];

    return (
        <main>
            <div>
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