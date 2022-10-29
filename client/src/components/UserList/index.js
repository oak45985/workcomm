import React from 'react';

const UserList = ({ username, email, picture }) => {
    
    return (
        <div>
            <h4>
                {username}
            </h4>
            <p>email: {email} + picture: {picture} </p>
        </div>
    )
}

export default UserList;