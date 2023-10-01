import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { AllCoursesCard } from '../components/CourseCard';
import { Box, Grid, Flex, Image, Text } from '@chakra-ui/react';

const PurchasedCourses = () => {
    const [purchasedCourses, setPurchasedCourses] = useState([]);
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');

    const getAllCourses = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/user/purchasedCourses`, {
                headers: {
                    'email': email,
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data.success) {
                setPurchasedCourses(data.purchasedCourses);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    console.log(purchasedCourses);

    return (
        <>
            <Box m={4}>
                <Grid templateColumns="repeat(auto-fill, minmax(400px, 1fr))" gap={2}>
                    {purchasedCourses?.map((course) => <AllCoursesCard
                        key={course?._id}
                        id={course?._id}
                        title={course?.title}
                        description={course?.description}
                        price={course?.price}
                        imageLink={course?.imageLink}
                        published={course?.published}
                    />
                    )}
                    {purchasedCourses.length === 0 &&
                        <Text textColor="blackAlpha.800" fontSize="lg" fontWeight={"bold"}>
                            You have not purchased any courses yet.
                        </Text>
                    }
                </Grid>
            </Box>
        </>
    )
}

export default PurchasedCourses;