import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import { QUERY_ME_LITE } from '../../utils/queries';

const ProfileBadge = () => {
    
    const { data: userData } = useQuery(QUERY_ME_LITE);

    const loggedIn = Auth.loggedIn();

    return (
        <>
            <div>
                {loggedIn && userData ? (
                    <div>
                        <p>{userData.me.username}</p>
                        <p>{userData.me.email}</p>
                        <p>{userData.me.picture}</p>
                    </div>
                ): null}
            </div>
        </>
    );
};

export default ProfileBadge;