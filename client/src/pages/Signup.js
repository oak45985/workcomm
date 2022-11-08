import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

const Signup = () => {
    
    const [signupFormState, setSignupFormState] = useState({ username: '', email: '', password: '' });
    const [addUser, { error }] = useMutation(ADD_USER);
    
    // set info from form
    const updateChange = (event) => {
        const { name, value } = event.target;

        setSignupFormState({
            ...signupFormState,
            [name]: value,
        });
        console.log(signupFormState);
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