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
                <Link to='/' style={{textDecoration: "none"}}>Home</Link>
                </li>
                {Auth.loggedIn() ? (
                    <>
                        <Link to="/profile" style={{textDecoration: "none"}}>Profile</Link>
                        <button onClick={() => {
                            setOpenModal(true);
                            }}>Add Task</button>
                        <a href='/' onClick={logout} style={{textDecoration: "none"}}>
                            Logout
                        </a>
                        <ProfileBadge />
                    </>
                ) : (
                    <>
                        <li>
                        <Link to='/login' style={{textDecoration: "none"}}>Login</Link>
                        </li>
                        <li>
                        <Link to='/signup' style={{textDecoration: "none"}}>Signup</Link>
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