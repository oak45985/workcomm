import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../utils/auth';
import { QUERY_ME_LITE, QUERY_USERS } from '../utils/queries';
import UserList from '../components/UserList';

const Home = () => {
    
    const { data: userData } = useQuery(QUERY_ME_LITE);

    const { data } = useQuery(QUERY_USERS);

    const username = data?.username || [];
    const email = data?.email || [];
    const picture = data?.picture || [];

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
                    <UserList 
                        username={username}
                        email={email}
                        picture={picture}
                    />
                </div>
            </div>
        </main>
    );
};

export default Home;