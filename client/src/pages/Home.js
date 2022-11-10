import React from 'react';
import { useQuery } from "@apollo/client";
import { QUERY_TASKS } from '../utils/queries';
import TaskList from '../components/TaskList';
import OrgCalendar from "../components/Calendar";

const Home = () => {
    
    const { loading, data } = useQuery(QUERY_TASKS);

    const tasks = data?.tasks || [];

    return (
        <main className="page-home">
            <h1>All Tasks</h1>
            <div>
                {loading ? (
                <div>Loading...</div>
                ):(
                    <TaskList tasks={tasks} />
                )}
            </div>
            <br/>
            <div>
                <OrgCalendar />
            </div>
        </main>
    );
};

export default Home;