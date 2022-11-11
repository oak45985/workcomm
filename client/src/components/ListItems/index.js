import { React, useState } from 'react';
import ListItemsAgain from '../ListItemsAgain';
import ListInput from '../ListInput';

const ListItems = ({ task }) => {

    let [toggle, setToggle] = useState(false);
    const [text, setText] = useState("Show Items");
    const [textTwo, setTextTwo] = useState("Add Items");

    let toggler = () => {
        toggle ? setToggle(false) : setToggle(true);
        toggle ? setText("Show Items") : setText("Hide");
        toggle ? setTextTwo("Add Items") : setTextTwo("Hide");
    }

    if (!task.lists.length) {
        return <div key={task._id}>
            {toggle ? <ListInput taskId={task._id} /> : <p>No Items to show!</p> }
            <button onClick={toggler}>{textTwo}</button>
            </div>
    }

    return (
        <div key={task._id}>
            {toggle ? null : <p>{task.lists.length} items to show. </p> }
            { task.lists && task.lists.map(list => {
                return(
                    <ul key={list._id}>
                    {toggle ? <ListItemsAgain list={list}/> : null }
                    </ul>
                );
            })}
            {toggle ? <ListInput taskId={task._id} /> : null }
        <button onClick={toggler}>{text}</button>
        </div>
    )
};

export default ListItems;