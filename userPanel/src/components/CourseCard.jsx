import { Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { useNavigate, Link } from 'react-router-dom';


const CourseCard = ({ id, title, imageLink, price }) => {

    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`/course/${id}`);
        window.location.reload(true);
    }

    return (
        <>
            <Link to={`/course/${id}`}>
                <Box
                    maxW="300px"
                    minH="400px"
                    width="100%"
                    bgColor={'white'}
                    borderRadius={5}
                >
                    <Box
                        maxW="300px"
                        height="170px"
                    >
                        <Image
                            src={imageLink}
                            alt={title}
                            boxSize="100%"
                            objectFit="cover"
                            borderRadius="md"
                        />
                    </Box>
                    <Box p={4}>
                        <Text minH="100px" fontWeight="bold" fontSize="lg">{title}</Text>
                        <Flex justifyContent="space-between" mt={2}>
                            <Text fontSize="md" fontWeight={'bold'}>₹ {price}</Text>
                        </Flex>
                    </Box>
                </Box>
            </Link>
        </>
    )
}

export default CourseCard;

export const AllCoursesCard = ({ id, title, description, price, imageLink, published }) => {

    const navigate = useNavigate();
    return (
        <Box
            maxW={{ base: '100%', md: 'lg' }} // Full width on small screens, limited width on medium and larger screens
            maxH="lg"
            borderWidth="1px"
            borderRadius="lg"
            overflow="hidden"
            boxShadow="md"
            bgColor={'white'}
            m={4}
        >
            <Image
                src={imageLink}
                alt="Course Image"
                style={{ objectFit: 'cover', width: '100%', height: '250px' }}
            />

            <Box p={{ base: 2, md: 4 }}>
                <Text fontSize={{ base: 'xl', md: '2xl' }} fontWeight="semibold" mb={{ base: 1, md: 2 }}>
                    {title}
                </Text>
                <Text fontSize={{ base: 'md', md: 'lg' }} color="gray.700" mb={{ base: 1, md: 2 }}>
                    {description}
                </Text>
                <Text fontSize={{ base: 'lg', md: 'xl' }} fontWeight="bold" mb={{ base: 2, md: 4 }}>
                    ₹ {price}
                </Text>
                <Flex justify="flex-end">
                    <Button
                        textColor={"blue.400"}
                        size={{ base: 'sm', md: 'md' }} // Adjust button size for smaller screens
                        onClick={() => {
                            navigate(`/course/${id}`);
                        }}
                    >
                        View Course
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}