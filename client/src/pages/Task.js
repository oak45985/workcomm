import React from 'react';
import { useMutation } from '@apollo/client';
import { Navigate, useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import { QUERY_TASK, QUERY_ME_LITE, QUERY_TASKS } from '../utils/queries';
import { DELETE_TASK } from '../utils/mutations'
import ListInput from '../components/ListInput';
import ListItems from '../components/ListItems';
// import Nav from '../components/Nav';

const Task = props => {

    const { id: taskId } = useParams();

    const navigate = useNavigate();

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

    const task = data?.task || <Navigate to='/profile' />;


    if (loading) {
        return <div>Loading</div>;
    }

    const id = taskId;

    // console.log(id);

    const handleTaskDelete = async event => {

        try{
            await deleteTask({
                variables: { id }
            });

        } catch (e) {
            console.log(e);
        }
    }


    if(task.data === null) {
        return <Navigate to='/profile' />
    }

    if(Auth.loggedIn() && Auth.getProfile().data.username === task.username) {
        return <div className='page-task'>
        <div className='task-card'>
            <header>
                <h2>{task.taskTitle}</h2>
                <p>Task Due: {task.taskDue}</p>
                {/* <p>{task.id}</p> */}
            </header>
            <div className='task-content'>
                <h4>{task.username} created task on: {task.createdTaskAt}</h4>
                <div className='task-desc'>
                    <p>Task Description</p>
                    <p>{task.taskContent}</p>
                </div>
                    <ListItems lists={task.lists} />
                    {Auth.loggedIn() && <ListInput taskId={task._id} />}
                    <p>Task Created: {task.createdTaskAt}</p>
            </div>
            <button type="submit" onClick={() => handleTaskDelete(task.id) } className="delete">
                DELETE TASK
            </button>
        </div>
        <Link
            to={'..'}
            onClick={(e) => {
            e.preventDefault();
            navigate(-1);
        }}
        >Head Back</Link>
    </div>
    }

    return (
        <div className='page-task'>
            <div className='task-card'>
                <header>
                    <h2>{task.taskTitle}</h2>
                    <h3>{task.username}</h3>
                    <h4>Task Due: {task.taskDue}</h4>
                    <p>{task.id}</p>
                </header>
                <div className='task-content'>
                    <p>{task.taskContent}</p>
                    <ListItems lists={task.lists} />
                    {Auth.loggedIn() && <ListInput taskId={task._id} />}
                    <p>{task.createdTaskAt}</p>
                </div>
            </div>
            <Link
        to={'..'}
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >Head Back</Link>
        </div>
    );
};

export default Task;