import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import { QUERY_ME_LITE, QUERY_TASKS } from '../../utils/queries';
import "react-datepicker/dist/react-datepicker.css";

const TaskInput = ({closeModal}) => {

    const [addTask] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask }}) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME_LITE });
                cache.writeQuery({
                    query: QUERY_ME_LITE,
                    data: { me: { ...me, tasks: [...me.tasks, addTask] } },
                });
            } catch (e) {
                console.log("ok")
            }

            const { tasks } = cache.readQuery({ query: QUERY_TASKS });

            cache.writeQuery({
                query: QUERY_TASKS,
                data: { tasks: [addTask, ...tasks] }
            });
        }
    });
    const defaultFromData = { taskTitle: '', taskContent: '', taskDue: ''}
    const [formData, setFormData] = useState({ taskTitle: '', taskContent: '', taskDue: ''});

    const updateChange = event => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTaskFormSubmit = async event => {
        event.preventDefault();

        try{
            await addTask({
                variables: { ...formData }
            });
            
            setFormData(defaultFromData);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='modal'>
            <div className='task-input-header'>
                <h3>Add a Task</h3>
                <button className="delete" onClick={() => closeModal(false)}>X</button>
            </div>
                    <form onSubmit={handleTaskFormSubmit} className='task-input-form'>
                        <label>Task Title</label>
                        <input
                            name='taskTitle'
                            placeholder='Your Tasks Title'
                            id='taskTitle'
                            value={formData.taskTitle}
                            onChange={updateChange}
                        />
                        <label>Task Description</label>
                        <textarea
                            name='taskContent'
                            placeholder="A short description of the task"
                            id='taskContent'
                            value={formData.taskContent}
                            onChange={updateChange}
                        />
                        <label>Task's Due Date</label>
                        <input
                            type='date'
                            name='taskDue'
                            id='taskDue'
                            value={formData.taskDue}
                            onChange={updateChange}
                        />
                        <button type='submit'>
                            Add Task
                        </button>
                    </form>
                </div>
    );
};

export default TaskInput;