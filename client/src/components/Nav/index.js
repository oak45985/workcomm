import React, { useState } from "react";
import { Link } from 'react-router-dom';
import Auth from '../../utils/auth';
import TaskInput from '../TaskInput';
import ProfileBadge from '../ProfileBadge';

const Nav = () => {

    const [openModal, setOpenModal] = useState(false);

    const logout = event => {
        event.preventDefault();
        Auth.logout();
    }

    return(
        <>
        <nav className="P-nav-bar">
            <ul>
                <li>
                <Link to='/'>Home</Link>
                </li>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/profile">Profile</Link>
                        <button onClick={() => {
                            setOpenModal(true);
                            }}>Add Task</button>
                        <a href='/' onClick={logout}>
                            Logout
                        </a>
                        <Link to="/profile"><ProfileBadge /></Link>
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
            {openModal && <TaskInput closeModal={setOpenModal} />}
        </nav>
        </>
    )
}

export default Nav;