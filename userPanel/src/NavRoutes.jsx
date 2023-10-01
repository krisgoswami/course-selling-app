import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';
// import CreateCourse from './pages/CreateCourse';
// import EditCourse from './pages/EditCourse';
import Courses from './pages/Courses';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { Toaster } from 'react-hot-toast';

import React from 'react'
import CourseDetails from './pages/CourseDetails';
import PurchasedCourses from './pages/PurchasedCourses';
import Purchase from '../../client/src/pages/Purchase';

const NavRoutes = () => {
    return (
        <Provider store={store}>
            <Router>
                <AppBar />
                <Toaster />
                <Routes>
                    <Route path='/' element={<Landing />} />
                    {/* <Route path='/landing' element={<Landing />} /> */}
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    {/* <Route path='/create-course' element={<CreateCourse />} /> */}
                    {/* <Route path='/edit-course/:id' element={<EditCourse />} /> */}
                    <Route path='/all-courses' element={<Courses />} />
                    <Route path='/course/:id' element={<CourseDetails />} />
                    <Route path='/purchase/:id' element={<Purchase />} />
                    <Route path='/purchased-courses' element={<PurchasedCourses />} />
                </Routes>
            </Router>
        </Provider>
    )
}

export default NavRoutes;