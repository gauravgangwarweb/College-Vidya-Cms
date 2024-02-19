import React, { useEffect, useMemo, useRef, useState } from "react"
import ReactQuill, { Quill } from "react-quill"
import "react-quill/dist/quill.snow.css" // import the styles
import ImageUploader from "quill-image-uploader"
import "quill-image-uploader/dist/quill.imageUploader.min.css"

const PrevEditor = ({ setContent, prev }) => {
    const [value, setValue] = useState("")
    const quillRef = useRef() // Create a Ref
    setContent(value)
    useEffect(() => {
        if (prev) setValue(prev)
    }, [prev])
    Quill.register("modules/imageUploader", ImageUploader)
    const modules = useMemo(
        () => ({
            toolbar: {
                container: [[{ header: [1, 2, 3, 4, 5, 6, false] }], [{ font: [18] }], [{ size: ["small", false, "large", "huge"] }], ["bold", "italic", "underline", "strike"], ["blockquote", "code-block"], [{ color: [] }, { background: [] }], [{ align: [] }], ["image"], ["clean"]],
            },
            imageUploader: {
                upload: (file) => {
                    return new Promise((resolve, reject) => {
                        const formData = new FormData()
                        formData.append("image", file)

                        fetch(`${import.meta.env.VITE_API}/media`, {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((result) => {
                                console.log(result)
                                resolve(result.url)
                            })
                            .catch((error) => {
                                reject("Upload failed")
                                console.error("Error:", error)
                            })
                    })
                },
            },
        }),
        []
    )

    return <ReactQuill className='h-[500px]' ref={quillRef} theme='snow' value={value} onChange={setValue} modules={modules} />
}

export default PrevEditor
