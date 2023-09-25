import axios from 'axios';
import React, { useState } from 'react';
import { BASE_URL } from '../utils/helper';

const CreateCourse = () => {

    const token = localStorage.getItem('token');
    // console.log(token);

    const [inputs, setInputs] = useState({
        title: "",
        description: "",
        price: "",
        imageLink: "",
        published: false,
    });

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
                    alert("Course created");
                } else {
                    alert("Something went wrong");
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
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
                        name="published"
                        id="published"
                        value={inputs.published}
                        onChange={handleOnChange}
                    >
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    <button type='submit'>Create</button>
                </div>
            </form>
        </div>
    )
}

export default CreateCourse;