import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import CoursePost from '../components/CoursePost';
import { Box, Grid, Flex, Image, Text } from '@chakra-ui/react';


const Courses = () => {

    const token = localStorage.getItem('token');
    const [courses, setCourses] = useState([]);
    // console.log(courses);

    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/courses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setCourses(data.courses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    console.log(courses);

    return (
        <>
            <Box m={4}>
                <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={2}>
                    {courses?.map((course) => <CoursePost
                        id={course?._id}
                        title={course?.title}
                        description={course?.description}
                        price={course?.price}
                        imageLink={course?.imageLink}
                        published={course?.published}
                    />
                    )}
                </Grid>
            </Box>
        </>
    )
}

export default Courses;