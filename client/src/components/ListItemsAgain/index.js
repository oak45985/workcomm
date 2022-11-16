import React from 'react';
import { Link } from 'react-router-dom'
import UserImage from '../UserImage';

const ListItemsAgain = ({ list }) => {


    return (
        <li key={list._id} className={"list-items"}>
            <p>"{list.listContent}"<br/></p>
            Added by<button><Link to={`/profile/${list.username}`} style={{textDecoration: "none", color: "black"}}>{list.username}</Link></button>on {list.listCreatedAt} {/*<button>complete</button> <button>x</button>*/}
            <UserImage username={list.username} />
        </li>
    )
}

export default ListItemsAgain;