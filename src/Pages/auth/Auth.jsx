import React, { useState } from "react"
import { useAuthState } from "../../state/authState"

const Auth = () => {
    const [err, setErr] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { isLogged, setUser, setIsLogged } = useAuthState()
    const handleLogin = async (e) => {
        e.preventDefault()
        setErr(false)
        const res = await fetch(`${import.meta.env.VITE_API}/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
            credentials: "include",
        })
        const data = await res.json()
        if (data.user) {
            setUser(data.user)
            setIsLogged(true)
        } else {
            setErr(true)
        }
    }

    if (isLogged == true) return null

    return (
        <section className='absolute top-0 left-0 h-screen w-full bg-black/90 flex justify-center items-center'>
            <div className=' w-full bg-white rounded-lg shadow border sm:max-w-md xl:p-0  border-gray-700'>
                <div className='p-6 space-y-4 md:space-y-6 sm:p-8'>
                    <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl '>Sign in to your account</h1>
                    <form onSubmit={handleLogin} className='space-y-4 md:space-y-6' action='#'>
                        <div>
                            <label for='email' className='block mb-2 text-sm font-medium text-gray-900 '>
                                Your email
                            </label>
                            <input onChange={(e) => setEmail(e.target.value)} type='email' name='email' id='email' className='bg-gray-50 border border-gray-900 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  placeholder-gray-400  focus:ring-blue-500 focus:border-blue-500' placeholder='name@company.com' required />
                        </div>
                        <div>
                            <label for='password' className='block mb-2 text-sm font-medium '>
                                Password
                            </label>
                            <input onChange={(e) => setPassword(e.target.value)} type='password' name='password' id='password' placeholder='••••••••' className='bg-gray-50 border  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  border-gray-600 placeholder-gray-400 text-gray-600 focus:ring-blue-500 focus:border-blue-500' required />
                        </div>
                        {err && <div>Credential or server error...</div>}
                        <button type='submit' className='w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 focus:ring-primary-800'>
                            Sign in
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}

export default Auth
