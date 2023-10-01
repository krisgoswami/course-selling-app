import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Text, Button, Image } from '@chakra-ui/react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../utils/helper';
import CourseCard from '../components/CourseCard';


const Landing = () => {

    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const id = useParams().id;

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
    };
    // const getCourseDetails = async () => {
    //     try {
    //         const { data } = await axios.get(`${BASE_URL}/api/v1/user/course/${id}`);
    //         if (data?.success) {
    //             setCourse(data?.course);
    //             setInputs({
    //                 id: data?.course._id,
    //                 title: data?.course.title,
    //                 description: data?.course.description,
    //                 price: data?.course.price,
    //                 imageLink: data?.course.imageLink,
    //             })
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    useEffect(() => {
        getAllCourses();
    }, [])
    // useEffect(() => {
    //     getCourseDetails();
    // }, [])
    console.log(courses);

    const clickBrowseCourse = () => {
        navigate('/all-courses');
    }

    return (
        <>
            <Box>
                {/* Banner Section */}
                <Box bg="blue.100" color="white" p={10} textAlign="center">
                    <Heading mb={4} fontSize="3xl" textColor="blackAlpha.800">
                        Discover Our Featured Courses
                    </Heading>
                    <Text textColor="blackAlpha.800" fontSize="lg">
                        Explore a wide range of courses to enhance your skills.
                    </Text>

                    {/* Scrollable Images */}
                    <Flex mt={6} overflowX="auto" justifyContent="space-between" gap={4}>
                        {courses?.slice(0, 3).map((course) =>
                            <Image key={course?._id} src={course?.imageLink} boxSize="300px" maxH="300px" maxW="600px" width="100%" objectFit="cover" borderRadius="md" m={4} />
                        )}
                    </Flex>

                    <Button
                        mt={6}
                        colorScheme="yellow"
                        size="lg"
                        boxShadow="lg"
                        onClick={clickBrowseCourse}
                    >
                        Browse Courses
                    </Button>
                </Box>



                {/* Courses Section */}
                <Box p={10} bg="gray.100">
                    <Flex justifyContent={"space-between"}>
                        <Heading mb={4} fontSize="2xl">
                            Our Courses
                        </Heading>
                        <Text onClick={clickBrowseCourse} textColor={'blue.500'} cursor={'pointer'}>View all</Text>
                    </Flex>
                    {/* Add a list of courses here */}
                    <Flex mt={4} overflowX="auto" justifyContent="space-between" gap={2}>
                        {courses?.map((course) =>
                            <Box m={5} maxW="300px" width="100%" transition="transform 0.2s ease-in-out">
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
                                        key={course?._id}
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

                {/* About Section */}
                <Box p={10}>
                    <Heading mb={4} fontSize="2xl">
                        About Us
                    </Heading>
                    <Text fontSize="lg">
                        <p>Welcome to Coursez, your gateway to a world of knowledge and skill enhancement! We believe in the transformative power of education, and our platform is designed to connect learners with top-quality courses from industry experts and leading institutions around the globe.</p>

                        <p>At Coursez, we curate a diverse range of courses spanning various disciplines, from technology and business to arts and personal development. Our mission is to empower individuals to pursue their passions, advance their careers, and achieve their personal goals.</p>

                        <p>With user-friendly navigation and a seamless learning experience, Coursez provides a dynamic platform where learners can discover, enroll, and excel in courses that cater to their unique interests and aspirations. Whether you're a beginner or a seasoned professional, Coursez offers something for everyone.</p>

                        Join us in the journey of lifelong learning and unlock new opportunities. Start exploring our courses today!
                    </Text>
                </Box>

                {/* Footer Section */}
                <Box bg="blue.500" color="white" p={5} textAlign="center">
                    <Text fontSize="lg">
                        <a href="/about" style={{ color: 'white' }}>
                            About Us
                        </a>{' '}
                        |{' '}
                        <a href="/contact" style={{ color: 'white' }}>
                            Contact
                        </a>
                    </Text>
                </Box>
            </Box>
        </>
    )
}

export default Landing