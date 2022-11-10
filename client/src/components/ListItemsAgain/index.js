import React from 'react';
import { Link } from 'react-router-dom'

const ListItemsAgain = ({ list }) => {


    return (
        <li key={list._id}>
            {list.listContent} {' • '}
            <Link to={`/profile/${list.username}`}>
            Added by {list.username}</Link> on {list.listCreatedAt} <button>complete</button> <button>x</button>
        </li>
    )
}

export default ListItemsAgain;