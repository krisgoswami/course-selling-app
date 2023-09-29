import React, { useState } from "react";
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

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

    //login logic
    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/admin/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.admin._id);
                dispatch(authActions.login());
                toast.success("Logged in");
                navigate('/courses');
            } else {
                toast.error("Email or password incorrect");
            }
        } catch (error) {
            console.log(error);
            toast.error("Email or password incorrect");
        }
    };

    const onSignupClick = () => {
        navigate('/signup');
    }

    return (
        <>
            <Flex
                direction="column"
                align="center"
                justify="center"
                minHeight="100vh"
                bg={"#f5f5f5"}
                p={8}
            >
                <Box width="300px" p={8} borderRadius="md" shadow="lg" bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Login
                    </Text>
                    <Input
                        placeholder="Email"
                        name='email'
                        value={inputs.email}
                        onChange={handleOnChange}
                        mb={4}
                        variant="flushed"
                        focusBorderColor="purple.400"
                        size="md"
                        autoFocus
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={inputs.password}
                        onChange={handleOnChange}
                        mb={6}
                        variant="flushed"
                        focusBorderColor="purple.400"
                        size="md"
                    />
                    <Button
                        borderRadius="md"
                        width={'full'}
                        textColor={"purple.400"}
                        mb={4}
                        onClick={handleOnSubmit}
                    >
                        Login
                    </Button>
                    <Text>
                        Don't have an account?{' '}
                        <Text as="span" color="purple.400" cursor="pointer" onClick={onSignupClick}>
                            Sign up here
                        </Text>
                    </Text>
                </Box >
            </Flex >
        </>
    );
}

export default Login