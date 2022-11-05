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
                    {toggle ? <ListItems lists={task.lists} /> : null}
                    <button onClick={toggler}>{text}</button>
                    <p>This task will be due: {task.taskDue}</p>
                </div>
                );
            })}
        </div>
    )
}

export default TaskList;