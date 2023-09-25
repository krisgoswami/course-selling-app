import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar';
import Signup from './pages/Signup';
import Landing from './pages/Landing';
import Login from './pages/Login';
import CreateCourse from './pages/CreateCourse';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
        <AppBar />
        <Routes>
          <Route path='/landing' element={<Landing />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/create-course' element={<CreateCourse />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
