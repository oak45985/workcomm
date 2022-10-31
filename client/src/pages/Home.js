import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { QUERY_ME_LITE, QUERY_USERS } from '../utils/queries';
import UserList from '../components/UserList';
import TaskInput from '../components/TaskInput';

const Home = () => {
    
    const { data: userData } = useQuery(QUERY_ME_LITE);

    const { data } = useQuery(QUERY_USERS);

    const users = data?.users || [];

    const loggedIn = Auth.loggedIn();

    return (
        <main>
            <div>
                {loggedIn && userData ? (
                    <div>
                        <p>{userData.me.username}</p>
                        <p>{userData.me.email}</p>
                        <p>{userData.me.picture}</p>
                    </div>
                ): null}
                <div>
                    <UserList users={users}
                    />
                </div>
                <div>
                    <TaskInput />
                </div>
            </div>
        </main>
    );
};

export default Home;