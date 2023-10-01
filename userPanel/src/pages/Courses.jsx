import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { AllCoursesCard } from '../components/CourseCard';
import { Box, Grid, Flex, Image, Text } from '@chakra-ui/react';

const Courses = () => {

    const [courses, setCourses] = useState([]);

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
        getAllCourses();
    }, [])
    console.log(courses);

    return (
        <>
            <Box m={4}>
                <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={2}>
                    {courses?.map((course) => <AllCoursesCard
                        key={course?._id}
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

export default Courses