import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';

const CoursePost = ({ id, title, description, price, imageLink, published }) => {
    // console.log({ id, title, description, price, imageLink, published });

    const navigate = useNavigate();

    return (
        <>
            <Box
                maxW="lg"
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                m={4}
            >
                <Image
                    src={imageLink}
                    alt="Course Image"
                    style={{ objectFit: 'cover', width: '100%', height: '200px' }}
                />

                <Box p="4">
                    <Text fontSize="xl" fontWeight="semibold" mb="2">
                        {title}
                        <Text as="span" fontSize="sm" color="gray.400" fontWeight={"bold"} mb="2">
                            {!published && " not published"}
                        </Text>
                    </Text>
                    <Text fontSize="md" color="gray.700" mb="2">
                        {description}
                    </Text>
                    <Text fontSize="lg" fontWeight="bold" mb="4">
                        ₹ {price}
                    </Text>
                    <Flex justify="flex-end">
                        <Button
                            textColor={"purple.400"}
                            size="sm"
                            onClick={() => {
                                navigate(`/edit-course/${id}`);
                            }}>
                            Edit
                        </Button>
                    </Flex>
                </Box>
            </Box>
        </>
    )
}

export default CoursePost;