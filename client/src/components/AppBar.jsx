import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../redux/store';
import toast from 'react-hot-toast';
import { Box, Flex, Spacer, Image, Button } from '@chakra-ui/react';
import logo from '../assets/images/logo.png';

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
	const onCourseClick = () => {
		navigate('/courses');
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
			<Flex alignItems={"center"} p={3} bg="purple.400">
				<Image src={logo} alt="Logo" boxSize="12" mr={3} />
				<Box alignItems="center" color="white" fontWeight="bold" fontSize="2xl">
					E-Learn (Admin Panel)
				</Box>

				{isLogin &&
					<Button
						ml={100}
						colorScheme="indigo"
						fontSize={"lg"}
						onClick={onCourseClick}
					>
						Courses
					</Button>
				}


				<Spacer />

				{/* if user is not logged in */}
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
				</>}

				{/* if user is logged in */}
				{isLogin && <>
					<Button
						borderRadius="md"
						textColor={"purple.400"}
						m={1}
						background={"white"}
						onClick={handleLogout}
					>
						Logout
					</Button>
				</>}
			</Flex>
		</>
	)
}

export default AppBar;