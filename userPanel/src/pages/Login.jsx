import React, { useState } from "react";
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';
import { Box, Button, Flex, Image, Input, Text } from '@chakra-ui/react';
import cover from '../assets/images/cover.jpg';

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
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.user._id);
                localStorage.setItem("email", data?.user.email);
                dispatch(authActions.login());
                toast.success("Logged in");
                navigate('/all-courses');
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
            <Flex justify="center" align="center" height="95vh">
                {/* Left Section - Welcome Message and Image */}
                <Box flex="1" p={8} mr={350} mb={200}>
                    <Box maxW="700px" mx="auto" mb={6}>
                        <Image src={cover} alt="Welcome Image" boxSize="100%" objectFit="cover" />
                    </Box>
                    <Text mt={4} fontSize="xl" textAlign="center">
                        Welcome to Coursez. Please login to continue.
                    </Text>
                </Box>

                {/* Right Section - Login Form */}
                <Box maxW="md" mr={200} mb={200} p={8} borderWidth="1px" borderRadius="lg" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Login
                    </Text>
                    <form onSubmit={handleOnSubmit}>
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
                            type="submit"
                            borderRadius="md"
                            width={'full'}
                            textColor={"purple.400"}
                            mb={4}
                        >
                            Login
                        </Button>
                        <Text>
                            Don't have an account?{' '}
                            <Text as="span" color="purple.400" cursor="pointer" onClick={onSignupClick}>
                                Sign up here
                            </Text>
                        </Text>
                    </form>
                </Box>
            </Flex>
        </>
    )
}

export default Login;