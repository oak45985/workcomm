import React from 'react';
import { useQuery } from "@apollo/client";
import { Link } from 'react-router-dom';
import { QUERY_USER } from '../../utils/queries';
import { Image } from "cloudinary-react";

const UserImage = ({ username }) => {

    const { data } = useQuery(QUERY_USER, {
        variables: { username: username }
    });

    const user = data?.user || {};

    return (
        <div className='profile-badge-nav-img'>
            <Link to="/profile">
            <Image
                    cloudName="dmyxg5y4f"
                    publicId={`https://res.cloudinary.com/dmyxg5y4f/image/upload/c_fill,h_50,w_50/r_100/${user.picture}`}
                    >
                </Image>
                </Link>
        </div>
    );
};

export default UserImage;