import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../utils/helper';
import CoursePost from '../components/CoursePost';


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
            // if (data && data.success) {
            //     if (Array.isArray(data?.courses)) {
            //         setCourses(data && data.courses);
            //     } else if (typeof data?.courses === "object") {
            //         const courseArray = Object.values(data?.courses);
            //         setCourses(courseArray);
            //     }
            // }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getAllCourses();
    }, [])
    console.log(courses);

    return (
        <div>
            <h1>Courses</h1>
            {courses?.map((course) => <CoursePost
                id={course?._id}
                title={course?.title}
                description={course?.description}
                price={course?.price}
                imageLink={course?.imageLink}
            />
            )}
        </div>
    )
}

export default Courses;