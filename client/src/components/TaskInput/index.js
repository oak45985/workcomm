import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import Auth from '../../utils/auth'
// import { QUERY_ME_LITE, QUERY_TASKS } from '../../utils/queries';

const TaskInput = () => {

    const [taskData, setTaskData] = useState([]);

    const [addTask] = useMutation(ADD_TASK);

    const [formState, setFormState] = useState({ taskTitle: '', taskContent: '', taskDue: '' });

    const updateChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });

        const { items } = formState;

        try {
            const taskInput = items.map((task) => ({
                taskTitle: task.taskTitle,
                taskContent: task.taskContent,
                taskDue: task.taskDue
            }));

            console.log(taskInput);
            setTaskData(taskInput);      
        } catch (err) {
            console.log(err);
        }
    };

    const handleTaskFormSubmit = async ( event, taskId) => {
        event.preventDefault();

        const taskToSave = taskData.find((task) => task.taskId === taskId);
        
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            await addTask({
                variables: { body: { ...taskToSave } }
            });
            console.log(formState);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div>
                <h3>Add a Task</h3>
                <div>
                    <form onSubmit={handleTaskFormSubmit}>
                        <input
                            name='taskTitle'
                            placeholder='Your Tasks Title'
                            id='taskTitle'
                            value={formState.taskTitle}
                            onChange={updateChange}
                        />
                        <textarea
                            name='taskContent'
                            placeholder="A short description of the task"
                            id='taskContent'
                            value={formState.taskContent}
                            onChange={updateChange}
                        />
                        <input
                            name='taskDue'
                            placeholder='12/1/2022'
                            id='taskDue'
                            value={formState.taskDue}
                            onChange={updateChange}
                        />
                        <button type='submit'>
                            Submit
                        </button>
                    </form>
                    {/* {error && <div>Couldn't upload task</div>} */}
                </div>
            </div>
        </main>
    );
};

export default TaskInput;