import { useState } from "react"
import Editor from "../../components/Editor"
import { useFieldArray, useForm } from "react-hook-form"
import { upload } from "../../utils/upload"

const NewCourse = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        defaultValues: {
            images: ["1"],
            faq: [{ q: "", a: "" }],
        },
    })

    const {
        fields: imageFields,
        append: appendImage,
        remove: removeImage,
    } = useFieldArray({
        control,
        name: "images",
    })

    const {
        fields: faqFields,
        append: appendFaq,
        remove: removeFaq,
    } = useFieldArray({
        control,
        name: "faq",
    })

    const [content, setContent] = useState("")

    const onSubmit = (data) => {
        console.log(content)
    }
    // console.log("watch", watch(onSubmit()))
    return (
        <div className='w-full max-w-[1320px] pt-8 pb-16 relative'>
            <div className='flex justify-between'>
                <h3 className='text-3xl font-semibold text-center'>New Course</h3>
                <button className='bg-red-500 text-white font-medium px-4 py-1 rounded-md'>Save</button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='grid grid-cols-2 gap-x-16 gap-y-6 mt-10'>
                    <div>
                        <label for='university-name' className='block mb-2 text-base font-medium text-gray-900'>
                            Course Name
                        </label>
                        <input type='text' id='courseName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='University Name' />
                    </div>
                    <div>
                        <label for='university-name' className='block mb-2 text-base font-medium text-gray-900'>
                            Course Mode
                        </label>
                        <input type='text' id='courseMode' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Course Mode' />
                    </div>
                    <div className='col-span-2'>
                        <p className='block mb-2 text-base font-medium text-gray-900'>Course Duration</p>
                        <div className='grid grid-cols-2 gap-x-16'>
                            <div>
                                <label htmlFor='year' className='block mb-2 text-sm font-medium text-gray-700'>
                                    Year
                                </label>
                                <input type='number' id='year' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' />
                            </div>
                            <div>
                                <label htmlFor='year' className='block mb-2 text-sm font-medium text-gray-700'>
                                    Month
                                </label>
                                <input type='number' id='month' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' />
                            </div>
                        </div>
                    </div>
                    <div>
                        <label htmlFor='course-fee' className='block mb-2 text-base font-medium text-gray-900'>
                            Course Fee
                        </label>
                        <input type='number' id='courseFee' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' />
                    </div>
                    <div>
                        <label for='course-category' className='block mb-2 text-base font-medium text-gray-900'>
                            Course Category
                        </label>
                        <input type='text' id='courseCategory' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Course Category' />
                    </div>
                    <div className='mt-6 col-span-2'>
                        <div className='flex gap-4 items-center'>
                            <p className='block text-base font-medium text-gray-900'>Images</p>
                            <button onClick={() => appendImage("1")} className='bg-primary text-white font-medium px-4 rounded-md'>
                                Add
                            </button>
                        </div>
                        {imageFields.map((field, index) => (
                            <div key={field.id} className='grid grid-cols-9 gap-x-8 mt-4 border pt-2 pb-3 px-3 rounded-md items-center'>
                                <div className='col-span-8 '>
                                    <input
                                        onChange={async (e) => {
                                            const file = e.target.files[0]
                                            const imageUrl = await upload(file)
                                            setValue(`images[${index}]`, imageUrl)
                                        }}
                                        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none'
                                        id='file_input'
                                        type='file'
                                    />
                                </div>
                                <div>
                                    <button onClick={() => removeImage(index)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md h-fit'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='col-span-2'>
                        <label for='about' className='block mb-2 text-base font-medium text-gray-900'>
                            About
                        </label>
                        <Editor setContent={setContent} />
                    </div>
                </div>
                <div className='mt-16'>
                    <div className='flex gap-4 items-center'>
                        <p className='block text-base font-medium text-gray-900'>Approved By</p>
                        <button onClick={() => appendFaq({ q: "", a: "" })} className='bg-primary text-white font-medium px-4 rounded-md'>
                            Add
                        </button>
                    </div>
                    {faqFields.map((field, index) => (
                        <div key={index} className='flex flex-col gap-4 mt-4 border pt-2 pb-3 px-3 rounded-md'>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='faq-question'>
                                    Question
                                </label>
                                <input {...register(`faq.${index}.q`)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none' id='faqQuestion' type='text' placeholder='Question' />
                            </div>
                            <div>
                                <label htmlFor='faq-answer' className='block mb-2 text-sm font-medium text-gray-900'>
                                    Answer
                                </label>
                                <input {...register(`faq.${index}.a`)} type='text' id='faqAnswer' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Answer' />
                                <button onClick={() => removeFaq(index)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md h-fit mt-2'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </form>
        </div>
    )
}

export default NewCourse
