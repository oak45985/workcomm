import React, { useState } from 'react';
import Axios from "axios";
import { useMutation } from '@apollo/client';
import { ADD_PICTURE } from '../../utils/mutations';
// import { QUERY_ME_LITE } from "../../utils/queries";


const ImageUpload = () => {

const [imageSelected, setImageSelected] = useState("");
const [addPicture] = useMutation(ADD_PICTURE);

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
        console.log(JSON.stringify(response.data.public_id));
        // send to User image string
        // ASK TIM YAGER
        // const picture = JSON.stringify(response.data.public_id);

        // try {
        //    addPicture({
        //         variables: picture
        //     })
        // } catch (e) {
        //     console.log(e);
        // }
    });
};

    return(
        <form onSubmit={uploadImage}>
             <div>
                 <label>Your Profile Image</label>
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