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
        if (!inputs.email || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/admin/login`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.admin._id);
                localStorage.setItem("email", data?.admin.email);
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
            <Flex justify="center" align="center" flexDirection={{ base: 'column', md: 'row' }} minHeight="95vh">

                {/* Left Section - Welcome Message and Image */}
                <Box flex={{ base: 'none', md: '1' }} p={8} mx={4} mb={8} textAlign={{ base: 'center', md: 'left' }}>
                    <Box maxW="700px" mx="auto" mb={6}>
                        <Image src={cover} alt="Welcome Image" boxSize="100%" objectFit="cover" />
                    </Box>
                    <Text mt={4} fontSize={{ base: 'xl', md: '2xl' }} textAlign="center">
                        Welcome to Coursez. Please login to continue.
                    </Text>
                </Box>

                {/* Right Section - Login Form */}
                <Box maxW="md" p={8} borderWidth="1px" borderRadius="lg" boxShadow="md" mx={100} my={8} width={{ base: '100%', md: 'auto' }}>
                    <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="bold" mb={4} textAlign="center">
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
                            width={{ base: 'full', md: 'auto' }}
                            textColor={"purple.400"}
                            mb={4}
                        >
                            Login
                        </Button>
                        <Text textAlign="center">
                            Don't have an account?{' '}
                            <Text as="span" color="purple.400" cursor="pointer" onClick={onSignupClick}>
                                Sign up here
                            </Text>
                        </Text>
                    </form>
                </Box>
            </Flex>
        </>
    );
}

export default Login