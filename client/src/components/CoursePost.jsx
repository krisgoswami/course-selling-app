import React from 'react'
import { useNavigate } from 'react-router-dom';

const CoursePost = ({ id, title, description, price, imageLink }) => {
    // console.log({ id, title, description, price, imageLink });

    const navigate = useNavigate();

    return (
        <div>
            <img src={imageLink} />
            <h1>{title}</h1>
            <p>{description}</p>
            <p>{price}</p>
            <button onClick={() => {
                navigate(`/edit-course/${id}`);
            }}>Edit</button>
        </div>

    )
}

export default CoursePost;