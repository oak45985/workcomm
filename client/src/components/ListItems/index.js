import React from 'react';
import { Link } from 'react-router-dom';

const ListItems = ({ lists }) => {
    return (
        <ul>
            { lists && lists.map(list => (
                <li key={list._id}>
                    {list.listContent} {' • '}
                    <Link to={`/profile/${list.username}`}>
                        Added by {list.username}</Link> on {list.listCreatedAt} <button>complete</button> <button>x</button>
                </li>
            ))}
        </ul>
    );
};

export default ListItems;