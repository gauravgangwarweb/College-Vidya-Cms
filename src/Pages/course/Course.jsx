import { Link, useParams } from "react-router-dom"
import { useOneUni } from "../../state/homeState"
import { useEffect } from "react"

const Course = () => {
    const { id } = useParams()
    const { university, fetchOneUni } = useOneUni()
    useEffect(() => {
        fetchOneUni(id)
    }, [])
    return (
        <div className='w-full max-w-[1320px] py-8'>
            <div className='relative dark:bg-white'>
                <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg className='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                        <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                    </svg>
                </div>
                <input type='search' id='default-search' className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 outline-none' placeholder='Search Course by name' required />
                <button type='submit' className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Search
                </button>
            </div>
            <div>
                <div className='flex justify-between items-center'>
                    <h4 className='text-3xl font-semibold mt-5'>Courses List</h4>
                    <Link to={`/university/${id}/course/new`} className='bg-primary text-white font-medium px-4 py-1 rounded-md mt-5'>
                        New Course
                    </Link>
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                    {university?.courses?.length > 0 ? (
                        university.courses.map((course, index) => (
                            <div
                                key={index}
                                className='flex justify-between items-center bg-white rounded-md px-4 py-2'
                                style={{
                                    "box-shadow": "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                                }}>
                                <div className='flex items-center gap-2'>
                                    <img src={course.icon} alt='' className='w-20 h-10' />
                                    <h4 className='text-lg font-semibold'>{course.name}</h4>
                                </div>
                                <div className='flex gap-2'>
                                    <button className='bg-primary text-white font-medium px-4 py-1 rounded-md'>Edit</button>
                                    <button className='bg-red-500 text-white font-medium px-4 py-1 rounded-md'>Delete</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1 className='text-2xl font-semibold mt-4 text-red-700'>No Courses Found</h1>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Course
