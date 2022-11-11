import React from 'react';
import { Link } from 'react-router-dom'
import ListItems from "../ListItems";

const TaskList = ({ tasks }) => {

    if (!tasks.length) {
        return <h3>No Tasks Yet</h3>
    }

    return (
        <div className="task-list" //style={{ width: "50%", overflow: "auto", display: "flex", background: "grey" }}>
            >
            {tasks && tasks.map(task => {
                return(
                <div key={task._id} className="task-card">
                    <Link to={`/task/${task._id}`} style={{textDecoration: "none"}}>
                    <header>
                    <h2>
                            {task.taskTitle}
                    </h2>
                    <p>Task Due: {task.taskDue}</p>
                    </header>
                    </Link>
                    <div className='task-content'>
                        <h4><Link to={`/profile/${task.username}`} style={{textDecoration: "none", color: "black"}}>{task.username}</Link>created task on: {task.createdTaskAt}</h4>
                        <div className='task-desc'>
                            <p>Task Description</p>
                            <p className="task-para">{task.taskContent}</p>
                            <br/>
                        </div>
                         <ListItems task={task} />
                    </div>
                </div>
                )
            })}
        </div>
    )
}

export default TaskList;