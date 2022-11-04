import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_TASK } from '../utils/queries';
import ListInput from '../components/ListInput';
import ListItems from '../components/ListItems';

const Task = props => {
    const { id: taskId } = useParams();

    const { loading, data } = useQuery(QUERY_TASK, {
        variables: { id: taskId }
    });

    const task = data?.task || {};

    if (loading) {
        return <div>Loading</div>;
    }

    return (
        <div>
            <div>
                <h2>{task.taskTitle}</h2>
                <h3>{task.username}</h3>
                <h4>{task.createdTaskAt}</h4>
            </div>
            <div>
                <p>{task.taskContent}</p>
                <ListItems lists={task.lists} />
                {Auth.loggedIn() && <ListInput taskId={task._id} />}
                <h4>This task is due: {task.taskDue}</h4>
            </div>
        </div>
    );
};

export default Task;