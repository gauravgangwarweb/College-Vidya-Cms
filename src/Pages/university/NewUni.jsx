import { useState } from "react"
import Editor from "../../components/Editor"
import { useFieldArray, useForm } from "react-hook-form"
import { upload } from "../../utils/upload"

const NewUni = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
        control,
        setValue,
    } = useForm({
        defaultValues: {
            approvals: [{ name: "", logo: "" }],
            images: ["1"],
            faqs: [{ q: "", a: "" }],
            uniLogo: "",
        },
    })

    const {
        fields: approvalsFields,
        append: appendapprovals,
        remove: removeapprovals,
    } = useFieldArray({
        control,
        name: "approvals",
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
        fields: faqsFields,
        append: appendfaqs,
        remove: removefaqs,
    } = useFieldArray({
        control,
        name: "faqs",
    })

    const [content, setContent] = useState("")

    const onSubmit = async (data) => {
        console.log(data)
        const res = await fetch(`${import.meta.env.VITE_API}/institute`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
            credentials: "include",
        })
        if (res.status == 201) {
            alert("University Added Successfully")
        } else if (res.status == 400) {
            alert("Institute Already Exist")
        } else {
            alert("Something Went Wrong")
        }
    }
    console.log("watch", watch())

    return (
        <div className='w-full max-w-[1320px] pt-8 pb-16 relative'>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex justify-between'>
                    <h3 className='text-3xl font-semibold text-center'>New University</h3>
                    <button type='submit' className='bg-red-500 text-white font-medium px-4 py-1 rounded-md'>
                        Save
                    </button>
                </div>
                <div className='grid grid-cols-2 gap-x-16 gap-y-6 mt-10'>
                    <div>
                        <label for='university-name' className='block mb-2 text-base font-medium text-gray-900'>
                            University Name
                        </label>
                        <input {...register("name")} type='text' id='universityName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='University Name' />
                    </div>
                    <div>
                        <label for='established-in' className='block mb-2 text-base font-medium text-gray-900'>
                            Established In
                        </label>
                        <input type='number' {...register("establishment_year")} id='establishedIn' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='' />
                    </div>
                    <div>
                        <label for='official-mail' className='block mb-2 text-base font-medium text-gray-900'>
                            Official Mail Id
                        </label>
                        <input type='email' {...register("email")} id='officialMail' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='uni@mail.com' />
                    </div>
                    <div>
                        <label for='official-website-link' className='block mb-2 text-base font-medium text-gray-900'>
                            Official Website
                        </label>
                        <input type='text' {...register("website")} id='officialWebsiteLink' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='https://www.uni.com' />
                    </div>
                    <div>
                        <label for='official-website-link' className='block mb-2 text-base font-medium text-gray-900'>
                            University Type
                        </label>
                        <input {...register("type")} type='text' id='universityType' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='University Type' />
                    </div>
                    <div>
                        <label for='state' className='block mb-2 text-base font-medium text-gray-900'>
                            State
                        </label>
                        <input {...register("state")} type='text' id='state' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='State' />
                    </div>
                    <div>
                        <label for='city' className='block mb-2 text-base font-medium text-gray-900'>
                            City
                        </label>
                        <input {...register("city")} type='text' id='city' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='City' />
                    </div>
                    <div>
                        <label for='pincode' className='block mb-2 text-base font-medium text-gray-900'>
                            Pincode
                        </label>
                        <input {...register("pincode")} type='text' id='city' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='pincode' />
                    </div>
                    <div>
                        <label for='videoEmbed' className='block mb-2 text-base font-medium text-gray-900'>
                            Video Embed
                        </label>
                        <input {...register("embed")} type='text' id='videoEmbed' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='https://youtube/video' />
                    </div>
                </div>
                <div className='mt-6'>
                    <div className='flex gap-4 items-center'>
                        <p className='block text-base font-medium text-gray-900'>Approved By</p>
                        <button onClick={() => appendapprovals({ name: "", logo: "" })} className='bg-primary text-white font-medium px-4 rounded-md' type='button'>
                            Add
                        </button>
                    </div>
                    {approvalsFields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-9 gap-x-8 mt-4 border pt-2 pb-3 px-3 rounded-md items-center'>
                            <div className='col-span-4'>
                                <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='file_input'>
                                    logo
                                </label>
                                <input
                                    onChange={async (e) => {
                                        const file = e.target.files[0]
                                        const imageUrl = await upload(file)
                                        setValue(`approvals[${index}].logo`, imageUrl)
                                    }}
                                    className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none'
                                    id='file_input'
                                    type='file'
                                />
                            </div>
                            <div className='col-span-4'>
                                <label htmlFor='approved-by-name' className='block mb-2 text-sm font-medium text-gray-900'>
                                    Name
                                </label>
                                <input {...register(`approvals.${index}.name`)} type='text' id='approvalsName' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Organisation Name' />
                            </div>
                            <div>
                                <label htmlFor='approved-by-name' className='block mb-2 text-sm font-medium text-white'>
                                    Delete
                                </label>
                                <button onClick={() => removeapprovals(index)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md h-fit'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='mt-6'>
                    <div className='flex gap-4 items-center'>
                        <p className='block text-base font-medium text-gray-900'>Images</p>
                        <button onClick={() => appendImage("1")} className='bg-primary text-white font-medium px-4 rounded-md' type='button'>
                            Add
                        </button>
                    </div>
                    {imageFields.map((field, index) => (
                        <div key={field.id} className='grid grid-cols-9 gap-x-8 mt-4 border pt-2 pb-3 px-3 rounded-md items-center'>
                            <div className='col-span-8'>
                                <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='file_input'>
                                    Image
                                </label>
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
                                <label htmlFor='approved-by-name' className='block mb-2 text-sm font-medium text-white'>
                                    Delete
                                </label>
                                <button onClick={() => removeImage(index)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md h-fit'>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-2 gap-x-16 gap-y-6 mt-6'>
                    <div>
                        <label className='block mb-2 text-base font-medium text-gray-900' htmlFor='file_input'>
                            University Logo
                        </label>
                        <input
                            onChange={async (e) => {
                                const file = e.target.files[0]
                                const imageUrl = await upload(file)
                                setValue("uniLogo", imageUrl)
                            }}
                            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none'
                            id='universityLogo'
                            type='file'
                        />
                    </div>
                    <div>
                        <label for='facebook-link' className='block mb-2 text-base font-medium text-gray-900'>
                            Facebook Link
                        </label>
                        <input {...register("facebook")} type='text' id='facebookLink' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Facebook' />
                    </div>
                    <div>
                        <label for='twitter-link' className='block mb-2 text-base font-medium text-gray-900'>
                            Twitter Link
                        </label>
                        <input {...register("twitter")} type='text' id='twitterLink' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Twitter' />
                    </div>
                    <div>
                        <label for='twitter-link' className='block mb-2 text-base font-medium text-gray-900'>
                            Linkedin Link
                        </label>
                        <input {...register("linkedin")} type='text' id='twitterLink' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Linkedin' />
                    </div>
                    <div>
                        <label for='Instagram-link' className='block mb-2 text-base font-medium text-gray-900'>
                            Instagram Link
                        </label>
                        <input {...register("instagram")} type='text' id='instagramLink' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Instagram' />
                    </div>
                </div>
                <div className='mt-6'>
                    <label for='about' className='block mb-2 text-base font-medium text-gray-900'>
                        About
                    </label>
                    <Editor setContent={setContent} />
                </div>

                <div className='mt-16'>
                    <div className='flex gap-4 items-center'>
                        <p className='block text-base font-medium text-gray-900'>Approved By</p>
                        <button onClick={() => appendfaqs({ q: "", a: "" })} className='bg-primary text-white font-medium px-4 rounded-md' type='button'>
                            Add
                        </button>
                    </div>
                    {faqsFields.map((field, index) => (
                        <div key={index} className='flex flex-col gap-4 mt-4 border pt-2 pb-3 px-3 rounded-md'>
                            <div>
                                <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor='faqs-question'>
                                    Question
                                </label>
                                <input {...register(`faqs.${index}.q`)} className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 outline-none' id='faqsQuestion' type='text' placeholder='Question' />
                            </div>
                            <div>
                                <label htmlFor='faqs-answer' className='block mb-2 text-sm font-medium text-gray-900'>
                                    Answer
                                </label>
                                <input {...register(`faqs.${index}.a`)} type='text' id='faqsAnswer' className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 outline-none' placeholder='Answer' />
                                <button onClick={() => removefaqs(index)} className='bg-red-500 text-white font-medium px-4 py-1 rounded-md h-fit mt-2'>
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

export default NewUni
