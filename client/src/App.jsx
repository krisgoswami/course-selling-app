import { useState } from 'react'
import './App.css'
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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Provider store={store}>
        <Router>
          <AppBar />
          <Routes>
            <Route path='/landing' element={<Landing />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/create-course' element={<CreateCourse />} />
            <Route path='/edit-course/:id' element={<EditCourse />} />
            <Route path='/courses' element={<Courses />} />
          </Routes>
        </Router>
      </Provider>
    </>
  )
}

export default App
