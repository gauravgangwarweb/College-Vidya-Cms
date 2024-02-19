import { useEffect } from "react"
import { Link } from "react-router-dom"
import { useBlog } from "../../state/homeState"

const BlogPage = () => {
    const { articles, fetchBlog } = useBlog()
    useEffect(() => {
        fetchBlog()
    }, [])

    const deleteArticle = async (id) => {
        const res = await fetch(`${import.meta.env.VITE_API}/blog/${id}`, {
            method: "DELETE",
        })
        if (res.status == 200) alert("Article deleted successfully")
        if (res.status !== 200) alert("Error deleting article")
    }

    return (
        <div className='w-full max-w-[1320px] py-8'>
            <div class='relative dark:bg-white'>
                <div class='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                    <svg class='w-4 h-4 text-gray-500 dark:text-gray-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'>
                        <path stroke='currentColor' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z' />
                    </svg>
                </div>
                <input type='search' id='default-search' class='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500' placeholder='Search BlogPage by name' required />
                <button type='submit' class='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Search
                </button>
            </div>
            <div>
                <div className='flex justify-between items-center'>
                    <h4 className='text-3xl font-semibold mt-5'>Articles List</h4>
                    <Link to='/BlogPage/new' className='bg-primary text-white font-medium px-4 py-1 rounded-md mt-5'>
                        New BlogPage
                    </Link>
                </div>
                <div className='flex flex-col gap-4 mt-4'>
                    {articles.length > 0 &&
                        articles.map((article, index) => (
                            <div
                                key={index}
                                className='flex justify-between items-center bg-white rounded-md px-4 py-2'
                                style={{
                                    "box-shadow": "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                                }}>
                                <div className='flex items-center gap-2'>
                                    <img src={article.thumbnail} alt='' className='w-20 h-10' />
                                    <h4 className='text-lg font-semibold'>{article.title}</h4>
                                </div>
                                <div className='flex gap-2'>
                                    <Link to={`/blog/edit/${article.id}`} className='bg-primary text-white font-medium px-4 py-1 rounded-md'>
                                        Edit
                                    </Link>
                                    <button onClick={() => deleteArticle(article.id)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

export default BlogPage
