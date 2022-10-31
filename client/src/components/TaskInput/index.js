import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TASK } from '../../utils/mutations';
import { QUERY_ME_LITE, QUERY_TASKS } from '../../utils/queries';

const TaskInput = () => {
    const [addTask, { error }] = useMutation(ADD_TASK, {
        update(cache, { data: { addTask }}) {
            
            try {
                const { me } = cache.readQuery({ query: QUERY_ME_LITE });
                cache.writeQuery({
                    query: QUERY_ME_LITE,
                    data: { me: { ...me, tasks: [...me.tasks, addTask] } },
                });
            } catch (e) {
                console.warn('ok')
            }

            const { tasks } = cache.readQuery({ query: QUERY_TASKS });

            cache.writeQuery({
                query: QUERY_TASKS,
                data: { tasks: [addTask, ...tasks] }
            });
        }
    });

    const [formState, setFormState] = useState({ taskTitle: '', taskContent: '', taskDue: '' });

    const updateChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleTaskFormSubmit = async event => {
        event.preventDefault();

        try {
            await addTask({
                variables: { ...formState }
            });
            setFormState('');
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
                    {error && <div>Couldn't upload task</div>}
                </div>
            </div>
        </main>
    );
};

export default TaskInput;