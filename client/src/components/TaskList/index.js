import React from 'react';

const TaskList = ({ tasks }) => {

    if (!tasks.length) {
        return <h3>No Tasks Yet</h3>
    }

    return (
        <div>
            {tasks && tasks.map(task => {
                return(
                <div key={task._id}>
                    <h2>{task.taskTitle}</h2>
                    <h3>{task.username}</h3>
                    <p>{task.createdTaskAt}</p>
                    <p>{task.taskContent}</p>
                    <p>This task will be due: {task.taskDue}</p>
                </div>
                );
            })}
        </div>
    )
}

export default TaskList;