import { useState } from 'react';
import axios from 'axios';
import { Box, Input, Button, Text } from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { BASE_URL } from '../utils/helper';
import { useParams, useNavigate } from 'react-router-dom';

const Purchase = () => {
    const [cardNumber, setCardNumber] = useState('');
    const id = useParams().id;
    const token = localStorage.getItem('token');
    const email = localStorage.getItem('email');
    const navigate = useNavigate();

    const handlePurchase = async () => {
        try {
            if (cardNumber === '1234-5678-1234-5678') {
                const { data } = await axios.post(`${BASE_URL}/api/v1/user/purchaseCourse/${id}`, {
                    email: email,
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                console.log(data);
                if (data.success) {
                    toast.success("Course Purchased");
                    navigate('/purchased-courses');
                }
            } else {
                toast.error('Invalid card number');
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <>
            <Box maxW="400px" mx="auto" p={4}>
                <h1>Purchase Course</h1>
                <Input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="Enter Credit Card Number"
                    mb={4}
                />
                <Text
                    textColor={"blackAlpha.500"}
                    fontWeight={"bold"}
                    mb={4}
                >Enter this card number (1234-5678-1234-5678) to purchase the course.
                </Text>
                <Button colorScheme="blue" onClick={handlePurchase} mb={4}>
                    Purchase
                </Button>
            </Box>
        </>
    );
};

export default Purchase;





