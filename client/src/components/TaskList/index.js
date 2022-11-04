import React from 'react';
import { Link } from 'react-router-dom'

const TaskList = ({ tasks }) => {

    if (!tasks.length) {
        return <h3>No Tasks Yet</h3>
    }

    return (
        <div>
            {tasks && tasks.map(task => {
                return(
                <div key={task._id}>
                    <h2>
                        <Link to={`/task/${task._id}`}>
                            {task.taskTitle}
                        </Link>
                    </h2>
                    <h3>{task.username}</h3>
                    <p>created task on: {task.createdTaskAt}</p>
                    <p>{task.taskContent}</p>
                    <p>This task will be due: {task.taskDue}</p>
                </div>
                );
            })}
        </div>
    )
}

export default TaskList;