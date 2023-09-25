import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AppBar = () => {
    const navigate = useNavigate();
    const onLoginClick = () => {
        navigate('/login');
    }
    const onSignupClick = () => {
        navigate('/signup');
    }
    return (
        <div style={{ backgroundColor: "black", color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Corsez</h3>
            <div>
                <button onClick={onLoginClick}>Login</button>
                <button onClick={onSignupClick}>Signup</button>
            </div>
        </div>
    )
}

export default AppBar;