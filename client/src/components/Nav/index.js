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
                {Auth.loggedIn() ? (
                    <>
                        <button style={{textDecoration: "none"}}><Link to="/" style={{textDecoration: "none", color: "black"}}>All Tasks</Link></button>
                        <button style={{textDecoration: "none"}}><Link to="/profile" style={{textDecoration: "none", color: "black"}}>Profile</Link></button>
                        <button onClick={() => {
                            setOpenModal(true);
                            }}>Add Task</button>
                        <button style={{textDecoration: "none", color: "black"}}  onClick={logout}>Logout</button>
                        <ProfileBadge />
                    </>
                ) : (
                    <>
                        <button style={{textDecoration: "none", color: "black"}}><Link to='/login' style={{textDecoration: "none", color: "black"}}>Login</Link></button>
                        <button style={{textDecoration: "none", color: "black"}}><Link to='/signup' style={{textDecoration: "none", color: "black"}}>Signup</Link></button>  
                    </>
                )}
            </ul>
            {openModal && <TaskInput closeModal={setOpenModal} />}
        </nav>
        </>
    )
}

export default Nav;