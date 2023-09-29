import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, FormControl, FormLabel, Input, Switch, Text, InputGroup, InputLeftAddon, Textarea } from '@chakra-ui/react';


const EditCourse = () => {

    const navigate = useNavigate();
    const id = useParams().id;
    const token = localStorage.getItem('token');
    // console.log(token);

    const [inputs, setInputs] = useState({});
    const [course, setCourse] = useState({});

    //handle publish switch change
    const handleSwitchChange = () => {
        setInputs(prevState => ({
            ...prevState,
            published: !prevState.published
        }))
    }

    const getCourseDetails = async () => {
        try {
            const { data } = await axios.get(`${BASE_URL}/api/v1/admin/course/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log(data);
            if (data?.success) {
                const fetchedCourse = data?.course;
                setCourse(fetchedCourse);
                console.log(fetchedCourse);
                setInputs({
                    title: fetchedCourse.title,
                    description: fetchedCourse.description,
                    price: fetchedCourse.price,
                    imageLink: fetchedCourse.imageLink,
                    published: fetchedCourse.published,
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCourseDetails();
    }, []);

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
                const { data } = await axios.put(`${BASE_URL}/api/v1/admin/updateCourse/${id}`, {
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
                    alert("Course updated");
                    navigate('/courses');
                } else {
                    alert("Something went wrong");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/deleteCourse/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                alert("Course deleted");
                navigate('/courses');
            }
        } catch (error) {
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
                    Edit Course Details
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
                            Published
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
                        Save Changes
                    </Button>
                </form>
            </Box>



            <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', width: 400 }}>
                <form onSubmit={handleOnSubmit}>
                    <div style={{ display: 'flex', flexDirection: "column" }}>
                        <label htmlFor='title' >Title</label>
                        <input
                            type="text"
                            id="title"
                            name='title'
                            value={inputs.title}
                            onChange={handleOnChange}
                        />


                        <label htmlFor='description' >Description</label>
                        <input
                            type="text"
                            id="description"
                            name='description'
                            value={inputs.description}
                            onChange={handleOnChange}
                        />


                        <label htmlFor='price' >Price</label>
                        <input
                            type="text"
                            id="price"
                            name='price'
                            value={inputs.price}
                            onChange={handleOnChange}
                        />


                        <label htmlFor='img' >Image link</label>
                        <input
                            type="text"
                            id="img"
                            name='imageLink'
                            value={inputs.imageLink}
                            onChange={handleOnChange}
                        />


                        <label htmlFor='published' >Publish?</label>
                        <select
                            id="published"
                            name="published"
                            value={inputs.published}
                            onChange={handleOnChange}
                        >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                        </select>
                        <button type='submit'>Update</button>
                    </div>
                </form>
                <button type='submit' onClick={handleDelete}>Delete</button>
            </div>
        </>
    )
}

export default EditCourse;