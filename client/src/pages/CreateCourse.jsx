import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box, Button, FormControl, FormLabel, Input, Switch, Text, InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react';

const CreateCourse = () => {

    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    // console.log(token);

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price: "",
        imageLink: "",
        published: false,
    });

    //handle publish switch change
    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }))
    }

    //handle input change
    const handleOnChange = (e) => {
        setInputs(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();

        try {
            if (token) {
                const { data } = await axios.post(`${BASE_URL}/api/v1/admin/createCourse`, {
                    title: inputs.title,
                    description: inputs.description,
                    price: inputs.price,
                    imageLink: inputs.imageLink,
                    published: inputs.published,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (data.success) {
                    toast.success("Course created");
                    navigate('/all-courses');
                } else {
                    toast.error("Something went wrong");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <>

            <Box
                maxW="md"
                p={8}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                boxShadow="md"
                mx="auto"
                mt={16}
            >
                <Text fontSize="xl" fontWeight="bold" mb={4} textAlign="center">
                    Create Course
                </Text>
                <form onSubmit={handleOnSubmit}>
                    <FormControl id="title" mb={4}>
                        <FormLabel>Title</FormLabel>
                        <Input
                            type="text"
                            name='title'
                            value={inputs.title}
                            onChange={handleOnChange}
                            placeholder="Enter course title"
                            size="md"
                            focusBorderColor="purple.400"
                            autoFocus />
                    </FormControl>

                    <FormControl id="description" mb={4}>
                        <FormLabel>Description</FormLabel>
                        <Textarea
                            name='description'
                            value={inputs.description}
                            onChange={handleOnChange}
                            placeholder="Enter course description"
                            size="md"
                            resize="vertical"
                            minHeight="100px"
                            focusBorderColor="purple.400" // Adjust the height as needed
                        />
                    </FormControl>

                    <FormControl id="price" mb={4}>
                        <FormLabel>Price</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children='₹' />
                            <Input
                                type='number'
                                name='price'
                                value={inputs.price}
                                onChange={handleOnChange}
                                placeholder='Enter course price'
                                focusBorderColor="purple.400" />
                        </InputGroup>
                    </FormControl>

                    <FormControl id="imageLink" mb={4}>
                        <FormLabel>Image Link</FormLabel>
                        <Input
                            type="text"
                            name='imageLink'
                            value={inputs.imageLink}
                            onChange={handleOnChange}
                            placeholder="Enter image link"
                            size="md"
                            focusBorderColor="purple.400" />
                    </FormControl>

                    <FormControl display="flex" alignItems="center" mb={6}>
                        <FormLabel htmlFor="published" mb="0">
                            Publish?
                        </FormLabel>
                        <Switch
                            id="published"
                            size="md"
                            colorScheme="purple"
                            isChecked={inputs.published}
                            onChange={handleSwitchChange}
                        />
                    </FormControl>

                    <Button type="submit" textColor={"purple.400"} size="md" width="full" mb={4}>
                        Create Course
                    </Button>
                </form>
            </Box>
        </>
    )
}

export default CreateCourse;