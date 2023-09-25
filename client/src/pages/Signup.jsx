import React, { useState } from "react";
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
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
            const { data } = await axios.post(`${BASE_URL}/api/v1/admin/signup`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (!data.success) {
                alert("Signup success");
                navigate('/login');
            } else {
                alert("Fill all fields");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <h1>Welcome. Sign up to continue</h1>
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
                <button type="submit">Signup</button>
            </form>
        </div>
    );
};

export default Signup;
