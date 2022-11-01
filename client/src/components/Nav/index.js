import React from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth'

const Nav = () => {

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return(
        <>
        <nav>
            <ul>
                <li>
                <Link to='/'>Home</Link>
                </li>
                {Auth.loggedIn() ? (
                    <>
                        <a href='/' onClick={logout}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <li>
                        <Link to='/login'>Login</Link>
                        </li>
                        <li>
                        <Link to='/signup'>Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
        </>
    )
}

export default Nav;