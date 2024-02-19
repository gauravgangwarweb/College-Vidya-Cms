import { BrowserRouter, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import HomePage from "./Pages/home/HomePage"
import University from "./Pages/university/University"
import NewUni from "./Pages/university/NewUni"
import AddPage from "./Pages/blog/AddPage"
import Auth from "./Pages/auth/Auth"
import BlogPage from "./Pages/blog/BlogPage"
import EditPage from "./Pages/blog/EditPage"
import Course from "./Pages/course/Course"
import NewCourse from "./Pages/course/NewCourse"

const App = () => {
    return (
        <div className='w-full'>
            <BrowserRouter>
                <Navbar />
                <div className='w-full flex justify-center'>
                    <Routes>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/university' element={<University />} />
                        <Route path='/university/new' element={<NewUni />} />
                        <Route path='/university/:id/course' element={<Course />} />
                        <Route path='/university/:id/course/new' element={<NewCourse />} />
                        <Route path='/blog' element={<BlogPage />} />
                        <Route path='/blog/new' element={<AddPage />} />
                        <Route path='/blog/edit/:id' element={<EditPage />} />
                    </Routes>
                </div>
            </BrowserRouter>
            <Auth />
        </div>
    )
}

export default App
