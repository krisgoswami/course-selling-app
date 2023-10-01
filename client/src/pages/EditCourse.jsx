import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Box, Button, FormControl, FormLabel, Input, Switch, Text, InputGroup, InputLeftAddon, Textarea, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Modal } from '@chakra-ui/react';


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
        if (!inputs.title || !inputs.description || !inputs.price || !inputs.imageLink) {
            toast.error("Fields cannot be empty");
            return;
        }

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
                    toast.success("Course updated");
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

    const handleDelete = async () => {
        try {
            const { data } = await axios.delete(`${BASE_URL}/api/v1/admin/deleteCourse/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            });
            if (data?.success) {
                toast.success("Course deleted");
                navigate('/all-courses');
            }
        } catch (error) {
            console.log(error);
        }
    }
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);


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

                    <Button
                        type="button"
                        colorScheme='red'
                        size="md"
                        width="full"
                        mb={4}
                        onClick={() => setShowDeleteConfirmation(true)}
                    >
                        Delete Course
                    </Button>

                    <Modal isOpen={showDeleteConfirmation} onClose={() => setShowDeleteConfirmation(false)}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Delete Course</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Are you sure you want to delete this course?
                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme="red" mr={3} onClick={handleDelete}>
                                    Yes, Delete
                                </Button>
                                <Button variant="ghost" onClick={() => setShowDeleteConfirmation(false)}>
                                    Cancel
                                </Button>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </form>
            </Box>
        </>
    )
}

export default EditCourse;