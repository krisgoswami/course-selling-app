import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateCourse from './pages/CreateCourse';
import EditCourse from './pages/EditCourse';
import Courses from './pages/Courses';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import React from 'react'

const NavRoutes = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppBar />
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/landing' element={<Landing />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route path='/create-course' element={<CreateCourse />} />
                    <Route path='/edit-course/:id' element={<EditCourse />} />
                    <Route path='/courses' element={<Courses />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default NavRoutes;