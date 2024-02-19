import { useEffect } from "react"
import { useBlog, useCourse, useUni } from "../../state/homeState"

const HomePage = () => {
    const { universities, fetchUni } = useUni()
    const { courses, fetchCourse } = useCourse()
    const { articles, fetchBlog } = useBlog()
    useEffect(() => {
        fetchUni()
        fetchCourse()
        fetchBlog()
    }, [])
    console.log(articles)
    return (
        <div className='w-full max-w-[1320px] py-8'>
            <h3 className='text-3xl font-extrabold text-center'>Welcome User!</h3>
            <div className='grid grid-cols-3 gap-8 mt-14'>
                <div className='flex flex-col rounded-lg py-4' style={{ "box-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
                    <h5 className='text-2xl text-center font-semibold'>Universities</h5>
                    <p className='text-5xl font-bold text-primary text-center mt-8'>{universities.length}</p>
                </div>
                <div className='flex flex-col rounded-lg py-4' style={{ "box-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
                    <h5 className='text-2xl text-center font-semibold'>Courses</h5>
                    <p className='text-5xl font-bold text-primary text-center mt-8'>{courses.length}</p>
                </div>
                <div className='flex flex-col rounded-lg py-4' style={{ "box-shadow": "rgba(0, 0, 0, 0.1) 0px 4px 12px" }}>
                    <h5 className='text-2xl text-center font-semibold'>Blogs</h5>
                    <p className='text-5xl font-bold text-primary text-center mt-8'>{articles.length}</p>
                </div>
            </div>
        </div>
    )
}

export default HomePage
