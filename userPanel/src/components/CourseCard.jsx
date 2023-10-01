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
            maxW="lg"
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

            <Box p="4">
                <Text fontSize="xl" fontWeight="semibold" mb="2">
                    {title}
                    {/* <Text as="span" fontSize="sm" color="gray.400" fontWeight={"bold"} mb="2">
                        {!published && " not published"}
                    </Text> */}
                </Text>
                <Text fontSize="md" color="gray.700" mb="2">
                    {description}
                </Text>
                <Text fontSize="lg" fontWeight="bold" mb="4">
                    ₹ {price}
                </Text>
                <Flex justify="flex-end">
                    <Button
                        textColor={"blue.400"}
                        size="sm"
                        onClick={() => {
                            navigate(`/course/${id}`);
                        }}>
                        View Course
                    </Button>
                </Flex>
            </Box>
        </Box>
    )
}