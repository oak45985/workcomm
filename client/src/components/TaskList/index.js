import React from 'react';

const TaskList = ({ tasks }) => {

    if (!tasks.length) {
        return <h3>No Tasks Yet</h3>
    }

    return (
        <div>
            {tasks && tasks.map(task => {
                <div key={task._id}>
                    <p>{task.taskTitle}</p>
                    <p>{task.username}</p>
                    <p>{task.createdTaskAt}</p>
                    <p>{task.taskContent}</p>
                </div>
            })}
        </div>
    )
}

export default TaskList;