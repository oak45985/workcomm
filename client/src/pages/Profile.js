import React from 'react';
import { useQuery } from '@apollo/client';
import { Navigate, useParams} from 'react-router-dom';
// import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import { QUERY_USER, QUERY_ME_LITE } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {

    const { username: userParam } = useParams();

    const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME_LITE, {
        variables: { username: userParam }
    });

    const user = data?.me || data?.user || {};

    if(Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
        return <Navigate to='/profile' />;
    }

    if (loading) {
        return <div>loading...</div>;
    }

    if(!user?.username) {
        return (
            <h4>
                Try when you're logged in.
            </h4>
        );
    }

    return (
        <div>
            <div>
                <h2>
                    {userParam ? `${user.username}` : "Your"} Tasks
               </h2>
            </div>
            <div>
                {/* <div>{!userParam && <TaskInput />}</div> */}
                <div>
                    <TaskList tasks={user.tasks} />
                </div>
            </div>
        </div>
    );
};

export default Profile;