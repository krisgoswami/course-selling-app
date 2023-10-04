import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { Box, Flex, Spacer, Image, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import logo from '../assets/images/logo.png';

const AppBar = () => {

    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');

    let user = localStorage.getItem("email");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginClick = () => {
        navigate('/login');
    }
    const onSignupClick = () => {
        navigate('/signup');
    }
    const onCourseClick = () => {
        navigate('/all-courses');
    }
    const purchasedCourses = () => {
        navigate('/purchased-courses');
    }
    const handleLogoClick = () => {
        navigate('/');
    }

    //handle logout
    const handleLogout = () => {
        try {
            dispatch(authActions.logout());
            localStorage.clear();
            toast("You've been logged out", {
                icon: '⚠️',
            });
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Flex
                align="center"
                justify="space-between"
                p={3}
                bg="blue.500"
                direction={{ base: 'column', md: 'row' }} // Stack on small screens, row on medium and larger screens
                wrap="wrap" // Wrap content on smaller screens
            >
                <Image src={logo} alt="Logo" boxSize="12" mb={{ base: 2, md: 0 }} mr={{ base: 0, md: 3 }} /> {/* Adjust margin on smaller screens */}
                <Box
                    alignItems="center"
                    color="white"
                    fontWeight="bold"
                    fontSize={{ base: 'xl', md: '2xl' }} // Adjust font size for smaller screens
                    cursor={'pointer'}
                    onClick={handleLogoClick}
                >
                    Coursez
                </Box>

                <Button
                    mt={{ base: 2, md: 0 }} // Adjust margin on smaller screens
                    colorScheme="indigo"
                    fontSize={{ base: 'md', md: 'lg' }} // Adjust font size for smaller screens
                    onClick={onCourseClick}
                >
                    All Courses
                </Button>

                <Spacer />

                {!isLogin && (
                    <>
                        <Button
                            width={{ base: '100%', md: 'auto' }} // Full width on small screens, auto width on medium and larger screens
                            borderRadius="md"
                            textColor="black"
                            background="white"
                            m={1}
                            mb={{ base: 2, md: 0 }} // Adjust margin on smaller screens
                            onClick={onLoginClick}
                        >
                            Login
                        </Button>

                        <Button
                            width={{ base: '100%', md: 'auto' }} // Full width on small screens, auto width on medium and larger screens
                            borderRadius="md"
                            textColor="black"
                            background="white"
                            m={1}
                            mb={{ base: 2, md: 0 }} // Adjust margin on smaller screens
                            onClick={onSignupClick}
                        >
                            Sign Up
                        </Button>
                    </>
                )}

                {isLogin && (
                    <Menu>
                        <MenuButton
                            as={Button}
                            rightIcon={<ChevronDownIcon />}
                            colorScheme="white"
                            mb={{ base: 2, md: 0 }} // Adjust margin on smaller screens
                        >
                            {user}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={purchasedCourses}>Purchased Courses</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                )}
            </Flex>
        </>
    )
}

export default AppBar;