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
    const handleCreateCourse = () => {
        navigate('/create-course');
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
                // position="fixed"
                width="100%"
                // zIndex="999"
                bg="purple.400">
                <Image src={logo} alt="Logo" boxSize="12" mr={3} />
                <Box alignItems="center" color="white" fontWeight="bold" fontSize="2xl">
                    Coursez
                </Box>

                {isLogin &&
                    <Button
                        ml={100}
                        colorScheme="indigo"
                        fontSize={"lg"}
                        onClick={onCourseClick}
                    >
                        All Courses
                    </Button>
                }


                <Spacer />

                {/* if user is not logged in
				{!isLogin && <>
					<Button
						width={90}
						borderRadius="md"
						textColor={"purple.400"}
						background={"white"}
						m={1}
						onClick={onLoginClick}
					>
						Login
					</Button>

					<Button
						width={90}
						borderRadius="md"
						textColor={"purple.400"}
						background={"white"}
						m={1}
						onClick={onSignupClick}
					>
						Sign Up
					</Button>
				</>} */}

                {/* if user is logged in */}
                {isLogin && <>
                    <Menu>
                        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} colorScheme="purple">
                            {user}
                        </MenuButton>
                        <MenuList>
                            <MenuItem onClick={handleCreateCourse}>Create Course</MenuItem>
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                    {/* <Button
						borderRadius="md"
						colorScheme="indigo"
						fontSize={"lg"}
						m={1}
						onClick={onCreateCourseClick}
					>
						Create Course
					</Button>

					<Button
						borderRadius="md"
						textColor={"purple.400"}
						m={1}
						background={"white"}
						onClick={handleLogout}
					>
						Logout
					</Button> */}
                </>}
            </Flex>
        </>
    )
}

export default AppBar;