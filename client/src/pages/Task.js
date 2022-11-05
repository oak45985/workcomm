import React from 'react';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_TASK, QUERY_ME_LITE, QUERY_TASKS } from '../utils/queries';
import { DELETE_TASK } from '../utils/mutations'
import ListInput from '../components/ListInput';
import ListItems from '../components/ListItems';

const Task = props => {
    const { id: taskId } = useParams();

    const { loading, data } = useQuery(QUERY_TASK, {
        variables: { id: taskId }
    });

    const [deleteTask] = useMutation(DELETE_TASK, {
        update(cache, { data: { deleteTask }}) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME_LITE });
                cache.writeQuery({
                    query: QUERY_ME_LITE,
                    data: { me: { ...me, tasks: [...me.tasks, deleteTask] } },
                });
            } catch (e) {
                console.log("ok")
            }

            const { tasks } = cache.readyQuery({ query: QUERY_TASKS });

            cache.writeQuery({
                query: QUERY_TASKS,
                data: { tasks: [deleteTask, ...tasks] }
            });
        }
    });

    const task = data?.task || {};

    if (loading) {
        return <div>Loading</div>;
    }

    const id = taskId;

    const handleTaskDelete = async event => {

        try{
            await deleteTask({
                variables: { id }
            });
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <div>
                <h2>{task.taskTitle}</h2>
                <h3>{task.username}</h3>
                <h4>{task.createdTaskAt}</h4>
                <p>{task.id}</p>
            </div>
            <div>
                <p>{task.taskContent}</p>
                <ListItems lists={task.lists} />
                {Auth.loggedIn() && <ListInput taskId={task._id} />}
                <h4>This task is due: {task.taskDue}</h4>
                {Auth.loggedIn() && <button type="submit" onClick={() => handleTaskDelete(task.id) }>
                    DELETE TASK
                </button>}
            </div>
        </div>
    );
};

export default Task;