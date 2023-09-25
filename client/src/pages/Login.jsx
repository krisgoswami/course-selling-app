import React, { useState } from "react";
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    // handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/admin/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                alert("Login success");
                navigate('/landing');
            } else {
                alert("Email or password incorrect");
            }
        } catch (error) {
            console.log(error);
            alert("Email or password incorrect");
        }
    };
    return (
        <div>
            <h1>Welcome Admin. Login to continue</h1>
            <form onSubmit={handleOnSubmit}>
                <input
                    type="email"
                    placeholder="email"
                    name='email'
                    value={inputs.email}
                    onChange={handleOnChange}
                />
                <input
                    type="password"
                    placeholder="password"
                    name="password"
                    value={inputs.password}
                    onChange={handleOnChange}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login