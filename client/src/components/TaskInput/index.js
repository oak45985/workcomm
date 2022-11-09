import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import { QUERY_ME_LITE, QUERY_TASKS } from '../../utils/queries';
import "react-datepicker/dist/react-datepicker.css";

const TaskInput = () => {

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

            const taskCache = cache.readQuery({ query: QUERY_TASKS });
            console.log(taskCache);

            cache.writeQuery({
                query: QUERY_TASKS,
                data: { tasks: [addTask] }
            });
        }
    });
    const defaultFromData = { taskTitle: '', taskContent: '', taskDue: ''}
    const [formData, setFormData] = useState(defaultFromData);

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
        <main>
            <div>
                <h3>Add a Task</h3>
                <div>
                    <form onSubmit={handleTaskFormSubmit}>
                        <input
                            name='taskTitle'
                            placeholder='Your Tasks Title'
                            id='taskTitle'
                            value={formData.taskTitle}
                            onChange={updateChange}
                        />
                        <textarea
                            name='taskContent'
                            placeholder="A short description of the task"
                            id='taskContent'
                            value={formData.taskContent}
                            onChange={updateChange}
                        />
                        <input
                            type='date'
                            name='taskDue'
                            id='taskDue'
                            value={formData.taskDue}
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