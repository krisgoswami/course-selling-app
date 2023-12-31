import React, { useState } from "react";
import { BASE_URL } from '../utils/helper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from 'react-hot-toast';
import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';

const Signup = () => {

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

    //signup logic
    const handleOnSubmit = async (e) => {
        e.preventDefault();
        if (!inputs.email || !inputs.password) {
            toast.error("Fields cannot be empty");
            return;
        }

        try {
            const { data } = await axios.post(`${BASE_URL}/api/v1/user/signup`, {
                email: inputs.email,
                password: inputs.password,
            });
            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem("userId", data?.user._id);
                localStorage.setItem("email", data?.user.email);
                dispatch(authActions.login());
                toast.success("Signup success");
                navigate('/all-courses');
            } else {
                alert("Fill all fields");
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onLoginClick = () => {
        navigate('/login');
    };

    return (
        <>
            <Flex
                direction="column"
                align="center"
                justify="center"
                minHeight="100vh"
                bg={"#white"}
                p={8}


            >
                <Box maxW="md" mb={200} p={8} borderWidth="1px" borderRadius="lg" boxShadow="md">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Sign Up
                    </Text>
                    <form onSubmit={handleOnSubmit}>
                        <Input
                            placeholder="Email"
                            name='email'
                            value={inputs.email}
                            onChange={handleOnChange}
                            mb={4}
                            variant="flushed"
                            focusBorderColor="blue.500"
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
                            focusBorderColor="blue.500"
                            size="md"
                        />
                        <Button
                            type="submit"
                            borderRadius="md"
                            width={'full'}
                            textColor={"blue.500"}
                            mb={4}
                        >
                            Submit
                        </Button>
                        <Text>
                            Have an account?{' '}
                            <Text as="span" color="blue.500" cursor="pointer" onClick={onLoginClick}>
                                Login here
                            </Text>
                        </Text>
                    </form>
                </Box>

                {/* <Box width="300px" p={8} borderRadius="md" shadow="lg" bg="white">
                    <Text fontSize="xl" fontWeight="bold" mb={4}>
                        Sign Up
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
                        Submit
                    </Button>
                    <Text>
                        Have an account?{' '}
                        <Text as="span" color="purple.400" cursor="pointer" onClick={onLoginClick}>
                            Login here
                        </Text>
                    </Text>
                </Box > */}
            </Flex >
        </>
    )
}

export default Signup;