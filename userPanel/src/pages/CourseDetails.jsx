import { Box, Flex, Image, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from '../utils/helper';
import CourseCard from '../components/CourseCard';
import toast from 'react-hot-toast';
import { useSelector, useDispatch } from 'react-redux';


const CourseDetails = () => {


    //global state
    let isLogin = useSelector((state) => state.isLogin);
    isLogin = isLogin || localStorage.getItem('userId');
    // let user = localStorage.getItem("email");

    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const id = useParams().id;
    const [course, setCourse] = useState({});
    const [inputs, setInputs] = useState({});
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    // get details of a perticular course
    const getCourseDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/course/${id}`);
            if (data?.success) {
                setCourse(data?.course);
                setInputs({
                    title: data?.course.title,
                    description: data?.course.description,
                    price: data?.course.price,
                    imageLink: data?.course.imageLink,
                })
            }
        } catch (error) {
            console.log(error);
        }
    }

    //get all courses for display
    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/courses`);
            // console.log(data);
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);
    useEffect(() => {
        getAllCourses();
    }, []);


    //navigations and click handles
    const onLoginClick = () => {
        navigate('/login');
    }
    const clickBrowseCourse = () => {
        navigate('/all-courses');
    }
    const handleClick = () => {
        window.location.reload(true);
    }

    const handlePurchaseClick = () => {
        navigate(`/purchase/${id}`);
    }
    // const handlePurchase = async () => {
    //     try {
    //         const { data } = await axios.post(`${BASE_URL}/api/v1/user/purchaseCourse/${id}`, {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`,
    //             }
    //         });
    //         console.log(data);
    //         if (data.success) {
    //             toast.success("Course Purchased");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <>
            <Box>
                {/* Course Details Section */}
                <Box p={10} bg="blackAlpha.800" minH={"300px"} maxH={"500px"}>
                    <Flex>
                        {/* Course Image */}
                        <Box w="350px" h="200px">
                            <Image src={inputs.imageLink} alt={inputs.title} boxSize="100%" objectFit="cover" borderRadius={10} />
                        </Box>

                        {/* Course Info */}
                        <Box ml={6}>
                            <Heading mb={2} fontSize="2xl" color="white">{inputs.title}</Heading>
                            <Text mb={4} color="white">{inputs.description}</Text>
                            <Text fontSize="xl" fontWeight="bold" color="white">₹ {inputs.price}</Text>
                            {isLogin && <Button
                                onClick={handlePurchaseClick}
                                mt={4}
                                colorScheme="blue"
                            >
                                Purchase Course
                            </Button>}
                            {!isLogin && <Button
                                onClick={onLoginClick}
                                mt={4}
                                colorScheme="blue"
                            >
                                Login to Purchase
                            </Button>}

                        </Box>
                    </Flex>
                </Box>

                {/* Courses Section */}
                <Box p={10} bg="gray.100">
                    <Flex justifyContent={"space-between"}>
                        <Heading mb={4} fontSize="2xl">
                            Similar Courses
                        </Heading>
                        <Text onClick={clickBrowseCourse} textColor={'blue.500'} cursor={'pointer'}>View all</Text>
                    </Flex>
                    {/* Add a list of courses here */}
                    <Flex mt={4} overflowX="auto" justifyContent="space-between" gap={2}>
                        {courses?.map((course) =>
                            <Box
                                m={5}
                                maxW="300px"
                                width="100%"
                                transition="transform 0.2s ease-in-out"
                                onClick={handleClick}
                            >
                                <Box
                                    minW="300px"
                                    maxW="350px"
                                    height="350px"
                                    overflow="hidden"
                                    borderRadius="md"
                                    position="relative"
                                    transition="transform 0.3s ease-in-out"
                                    _hover={{ transform: 'scale(1.02)', cursor: 'pointer' }}
                                >
                                    <CourseCard
                                        id={course?._id}
                                        title={course?.title}
                                        price={course?.price}
                                        imageLink={course?.imageLink}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default CourseDetails;