import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from "axios";
import { useMutation, useQuery } from '@apollo/client';
import { ADD_PICTURE } from '../../utils/mutations';
import { QUERY_USER, QUERY_ME_LITE } from '../../utils/queries';
import Auth from '../../utils/auth';



const ImageUpload = () => {

const { username: userParam } = useParams();
const { data } = useQuery(userParam ? QUERY_USER : QUERY_ME_LITE, {
    variables: { username: userParam }
})
const user = data?.me || {}

console.log(user._id)
console.log(user.picture)

const [imageSelected, setImageSelected] = useState("");
const [addPicture] = useMutation(ADD_PICTURE, {
    update(cache, { data: { addPicture }}) {
        try {
            const { me } = cache.readQuery({ query: QUERY_ME_LITE });
            cache.writeQuery({
                query: QUERY_ME_LITE,
                data: { me: { ...me, picture: addPicture } },
            });
        } catch (e) {
            console.log(e)
        };
    }
});

const updateChangeImage = (event) => {
    setImageSelected(event.target.files[0]);
    console.log(imageSelected);
}

const uploadImage = async event => {
    event.preventDefault()
    const formData = new FormData()
    formData.append("file", imageSelected);
    formData.append("upload_preset", "pwy5dxrj")

    Axios.post('https://api.cloudinary.com/v1_1/dmyxg5y4f/image/upload', 
        formData
    ).then((response) => {
        console.log(response.data.public_id);
        // send to User image string
        // ASK TIM YAGER
        const picture = response.data.public_id;
        if(Auth.loggedIn()){
            try {
            addPicture({
                    variables: { picture: picture }
                })
            } catch (e) {
                console.log(e);
            }
        }
    });
};

    return(
        <form onSubmit={uploadImage}>
             <div>
                <input
                    name='picture'
                    type='file'
                    id='picture'
                    onChange={updateChangeImage}
                />
            </div>
            <button type='submit'>
                Submit
            </button>
        </form>
    );
};

export default ImageUpload;