import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';

const AppBar = () => {

    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [state, setState] = useState();


    const onLoginClick = () => {
        navigate('/login');
    }
    const onSignupClick = () => {
        navigate('/signup');
    }
    const onLogoClick = () => {
        navigate('/courses');
    }

    //handle logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            localStorage.clear();
            alert("You've been logged out");
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div style={{ backgroundColor: "black", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ cursor: 'pointer' }} onClick={onLogoClick}>Coursez</h3>
            <div>
                {!isLogin && <>
                    <button onClick={onLoginClick}>Login</button>
                    <button onClick={onSignupClick}>Signup</button>
                </>
                }
                {isLogin && <button onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export default AppBar;