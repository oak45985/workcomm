import React, { useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import 'filepond/dist/filepond.min.css';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

registerPlugin(FilePondPluginFileEncode, FilePondPluginImagePreview, FilePondPluginImageResize)

const Signup = () => {
    const [files, setFiles] = useState(); 
    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '', picture: '' });
    const [addUser, { error }] = useMutation(ADD_USER);

    // set info from form
    const updateChange = (event) => {

        const { name, value } = event.target;
        console.log(files);

        setSignupFormState({
            ...signupFormState,
            [name]: value,
        });
        // console.log(signupFormState);
    };

    // submit info from form
    const handleSignupFormSubmit = async event => {
        event.preventDefault();
        console.log(signupFormState);

        try {
            const { data } = await addUser({
                variables: { ...signupFormState }
            });
            Auth.login(data.addUser.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div>
                <div>
                    <h3>Sign Up</h3>
                    <div>
                        <form onSubmit={handleSignupFormSubmit}>
                            <div>
                                <label>Your Name</label>
                                <input
                                    placeholder='Your username'
                                    name='username'
                                    type='username'
                                    id='username'
                                    value={signupFormState.username}
                                    onChange={updateChange}
                                />
                            </div>
                            <div>
                                <label>Your Email</label>   
                                <input
                                    placeholder='Your email'
                                    name='email'
                                    type='email'
                                    id='email'
                                    value={signupFormState.email}
                                    onChange={updateChange}
                                />
                            </div>
                            <div>
                                <label>Your Password</label>
                                <input
                                    placeholder='Your password'
                                    name='password'
                                    type='password'
                                    id='password'
                                    checked={false}
                                    value={signupFormState.password.checked}
                                    onChange={updateChange}
                                />
                            </div>
                            <div>
                                <label>Your Profile Image</label>
                                {/* <input
                                    name='picture'
                                    type='file'
                                    id='picture'
                                    className='filepond'
                                    value={signupFormState.picture}
                                    onChange={updateChange}
                                /> */}
                                <FilePond 
                                    files={files}
                                    onupdatefiles={setFiles}
                                    allowMultiple={false}
                                    name="picture"
                                    labelIdle='Drag & drop your photo'
                                    // image resize
                                    allowImageResize="true"
                                    imageResizeTargetWidth="170px"
                                    imageResizeMode='cover'
                                    // file encode
                                    allowFileEncode="true"
                                />
                            </div>
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                        {error && <div>Please Sign Up Using All Fields!</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Signup;