export const upload = async (file) => {
    const formData = new FormData()

    formData.append("image", file)

    const res = fetch(`${import.meta.env.VITE_API}/media`, {
        method: "POST",
        body: formData,
    })
        .then((response) => response.json())
        .then((result) => {
            return result.url
        })
        .catch((error) => {
            console.error("Error:", error)
        })
    return res
}
