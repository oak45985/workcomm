import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import ListItems from "../ListItems";

const TaskList = ({ tasks }) => {


    let [toggle, setToggle] = useState(false);
    const [text, setText] = useState("Show Items");

    let toggler = () => {
        toggle ? setToggle(false) : setToggle(true);
        toggle ? setText("Show Items") : setText("Hide");
    }

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
                    </header>
                    </Link>
                    <div className='task-content'>
                        <h4>{task.username}</h4>
                        <p>created task on: {task.createdTaskAt}</p>
                        <p>{task.taskContent}</p>
                        {toggle ? <ListItems lists={task.lists} /> : null}
                        <button onClick={toggler}>{text}</button>
                        <p>This task will be due: {task.taskDue}</p>
                    </div>
                </div>
                );
            })}
        </div>
    )
}

export default TaskList;