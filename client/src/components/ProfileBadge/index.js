import React from 'react';
import { useQuery } from "@apollo/client";
import Auth from '../../utils/auth';
import { QUERY_ME_BADGE } from '../../utils/queries';
import { Image } from "cloudinary-react";
import ImageUpload from '../ImageUpload';

const ProfileBadge = () => {
    
    const { data: userData } = useQuery(QUERY_ME_BADGE);

    const loggedIn = Auth.loggedIn();

    return (
        <>
            <div>
                {loggedIn && userData ? (
                    <div>
                        <p>{userData?.me?.username}</p>
                        <p>{userData?.me?.email}</p>
                        { !userData?.me?.picture ? (
                            <ImageUpload />
                        ) : (
                        <Image
                            style={{width: 75}}
                            cloudName="dmyxg5y4f"
                            publicId={`https://res.cloudinary.com/dmyxg5y4f/image/upload/${userData.me.picture}`}
                        >
                        </Image>
                        )}
                    </div>
                ): null}
            </div>
        </>
    );
};

export default ProfileBadge;