import { create } from "zustand"

export const useUni = create((set) => ({
    universities: {},
    fetchUni: async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/institute`)
        set({ universities: await response.json() })
    },
}))

export const useOneUni = create((set) => ({
    university: {},
    fetchOneUni: async (id) => {
        const response = await fetch(`${import.meta.env.VITE_API}/institute/${id}`)
        set({ universities: await response.json() })
    },
}))

export const useCourse = create((set) => ({
    courses: {},
    fetchCourse: async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/course`)
        set({ courses: await response.json() })
    },
}))

export const useBlog = create((set) => ({
    articles: {},
    fetchBlog: async () => {
        const response = await fetch(`${import.meta.env.VITE_API}/blog`)
        set({ articles: await response.json() })
    },
}))
