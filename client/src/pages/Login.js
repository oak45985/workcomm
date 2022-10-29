import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

const Login = (props) => {
    const [loginFormState, setLoginFormState] = useState({ email: '', password: ''});
    const [login, { error }] = useMutation(LOGIN_USER);
    
    // gets login form input info
    const updateChange = (event) => {
        const { name, value } = event.target;
        setLoginFormState({
            ...loginFormState,
            [name]: value,
        });
    };

    //submits login
    const handleLoginFormSubmit = async event => {
        event.preventDefault();

        try {
            const { data } = await login({
                variables: { ...loginFormState }
            });
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <main>
            <div>
                <div>
                    <h3>Login</h3>
                    <div>
                        <form onSubmit={handleLoginFormSubmit}>
                            <input
                                className='form-input'
                                placeholder='youremail@email.com'
                                name='email'
                                type='email'
                                id='email'
                                value={loginFormState.email}
                                onChange={updateChange}
                            />
                            <input
                                className='form-input'
                                name='password'
                                type='password'
                                id='password'
                                value={loginFormState.password}
                                onChange={updateChange}
                            />
                            <button type='submit'>
                                Submit
                            </button>
                        </form>
                        {error && <div>Please Try Again!</div>}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Login;