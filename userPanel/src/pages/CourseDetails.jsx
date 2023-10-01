import { Box, Flex, Image, Heading, Text, Button } from '@chakra-ui/react';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { BASE_URL } from '../utils/helper';
import CourseCard from '../components/CourseCard';


const CourseDetails = () => {

    const navigate = useNavigate();
    const id = useParams().id;
    const [course, setCourse] = useState({});
    const [inputs, setInputs] = useState({});
    const [courses, setCourses] = useState([]);

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

    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/courses`);
            console.log(data);
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

    const clickBrowseCourse = () => {
        navigate('/all-courses');
    }
    const handleClick = () => {
        // navigate(`/course/${id}`);
        window.location.reload(true);
    }

    return (
        <>
            <Box>
                {/* Banner Section */}
                {/* <Box bg="blackAlpha.800" color="white" p={5} textAlign="center">
                    <Image src={inputs.imageLink} alt={inputs.title} boxSize="100%" objectFit="cover" maxH={"400px"} mx={"auto"} />
                </Box> */}

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
                            <Button mt={4} colorScheme="blue">
                                Purchase Course
                            </Button>
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