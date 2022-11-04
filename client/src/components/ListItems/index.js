import React from 'react';
import { Link } from 'react-router-dom';

const ListItems = ({ lists }) => {
    return (
        <ul>
            { lists && lists.map(list => (
                <li key={list._id}>
                    {list.listContent} {'// '}
                    <Link to={`/profile/${list.username}`}>
                        Added by {list.username} on {list.listCreatedAt}
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default ListItems;