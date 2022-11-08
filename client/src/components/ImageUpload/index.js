import React, { useState } from 'react';
import Axios from "axios";

const ImageUpload = () => {

const [imageSelected, setImageSelected] = useState("");

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
        console.log(response);
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