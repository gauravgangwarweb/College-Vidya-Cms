import React, { useEffect, useState } from "react"
import Editor from "../../components/Editor"
import { useParams } from "react-router"

const EditPage = () => {
    const { id } = useParams()

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API}/blog/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setTitle(data.title)
                setContent(data.content)
                setImageUrl(data.thumbnail)
            })
    }, [])
    const [imageUrl, setImageUrl] = useState(null)
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()

        formData.append("image", file)

        fetch(`${import.meta.env.VITE_API}/media`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((result) => {
                setImageUrl(result.url)
            })
            .catch((error) => {
                console.error("Error:", error)
            })
    }

    const handlePublish = async (e) => {
        e.preventDefault()
        const res = await fetch(`${import.meta.env.VITE_API}/blog/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, content, thumbnail: imageUrl }),
        })
        const data = await res.json()
        console.log(data)
        if (res.status === 200) alert("Article Updated successfully")
    }

    return (
        <form onSubmit={handlePublish} className='mt-6 mx-auto max-w-4xl'>
            <div className='mb-5'>
                <label for='base-input' className='block mb-2 text-sm font-medium text-gray-900 '>
                    Title
                </label>
                <input onChange={(e) => setTitle(e.target.value)} value={title} type='text' id='base-input' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ' />
            </div>
            <div className='mb-5'>
                <label className='block mb-2 text-sm font-medium text-gray-900 ' for='file_input'>
                    Thumbnail
                </label>
                <input className='block w-full  text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 p-2.5' id='file_input' type='file' onChange={handleFileChange} />
            </div>
            {imageUrl && (
                <div className='mb-5'>
                    <label className='block mb-2 text-sm font-medium text-gray-900 ' for='file_input'>
                        Preview
                    </label>
                    <img className='max-h-[300px]' src={imageUrl} alt='Thumbnail' />
                </div>
            )}
            <div className='mb-5'>
                <label for='base-input' className='block mb-2 text-sm font-medium text-gray-900 '>
                    Content
                </label>
                <Editor prev={content} setContent={setContent} />
            </div>
            <button type='submit' className='text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-md px-5 py-2.5 me-2 mt-8 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
                Update
            </button>
        </form>
    )
}

export default EditPage
