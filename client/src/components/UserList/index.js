import React from 'react';

const UserList = ({ users }) => {

    if(!users.length) {
        return <h3>No users yet!</h3>;
    }
    
    return (
        <div>
            {users && users.map(user => (
                <div key={user._id}>
                    <h4>
                        {user.username}
                    </h4>
                    <p>
                        email: {user.email} + picture: {user.picture}
                    </p>
                </div>
            ))}
        </div>
    )
}

export default UserList;