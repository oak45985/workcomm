import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_LIST } from '../../utils/mutations';

const ListInput = ({ taskId }) => {
    const [addList] = useMutation(ADD_LIST);
    const [listContent, setListContent] = useState('');

    const updateChange = event => {
        setListContent(event.target.value);
    };

    const handleListForm = async event => {
        event.preventDefault();

        try {
            await addList({
                variables: { listContent, taskId }
            });
            setListContent('');
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <div>
            <form onSubmit={handleListForm}>
                <label>Add an item to accomplish</label>
                <input
                    placeholder="Patch gallery"
                    value={listContent}
                    onChange={updateChange}
                >    
                </input>
                <button type='submit'>
                    Add Item
                </button>
            </form>
        </div>
    )
}

export default ListInput;