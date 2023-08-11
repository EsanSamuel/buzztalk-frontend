import React, { useState, useContext, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import img from '../assets/img1.svg'
import { auth, provider } from '../components/Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { AuthContext } from '../Context/Auth'
import { useNavigate } from 'react-router-dom'

const Input = ({ title, placeholder, handleChange, type }) => (
    <div className='pb text-[#eaeaea] bg-transparent'>
        <h1 className='flex flex-start pb-5'>{title}</h1>
        <input className='w-full bg-transparent border border-[#5f5f5f] rounded h-[40px]' placeholder={placeholder}
            onChange={handleChange}
            type={type} />
    </div>
)

const Signin = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const [signedIn, setSignedIn] = useState(false)

    const signin = () => {
        provider.setCustomParameters({ prompt: 'select_account' })
        signInWithPopup(auth, provider)
            .then((result) => {
                const credentails = GoogleAuthProvider.credentialFromResult(result)
                const token = credentails.accessToken
                const user = credentails.user
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const signout = async () => {
        await auth.signOut()
    }
    const { users, user } = useContext(AuthContext)


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (name && password && email) {
            try {
                const response = await fetch('http://localhost:3001/api/v1/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name, email, password })
                })

                const result = await response.json()
                console.log(result)

                navigate('/login')

            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className='p-5 sm:flex justify-between gap-3'>
            <div className='bg-[#8c6dfd] w-auto p-10 rounded card flex flex-col text-white '>
                <h1 className='pb-20'>BuzzTalk</h1>
                <h1 className='text-[40px] text-white pb-10 '>Start your journey with us!</h1>
                <p className='text-[#eaeaea] pb-10'>Discover the leading social media platform and join us by signing up!</p>

                <div className='rounded bg-transparent'>
                    <img src={img} className='bg-transparent h-[400px]' />
                </div>
            </div>
            <div className=' text-center rounded card sm:p-20 px-5 py-10 sm:mt-0 mt-10 w-full bg-[#3a3a43]'>
                <h1 className='text-white text-[30px]'>Welcome to <span className='logo'>BuzzTalk</span></h1>
                {/*<p className='text-white flex flex-start'>Sign in to BuzzTalk</p>*/}
                <div className='w-full bg-transparent py-10 space-y-6'>
                    <Input className='' title='Enter name' placeholder='Enter name..' handleChange={(e) => setName(e.target.value)} type='text' />
                    <Input className='' title='Enter email' placeholder='Enter email..' handleChange={(e) => setEmail(e.target.value)} type='email' />
                    <Input className='' title='Enter Password' placeholder='Enter password..' handleChange={(e) => setPassword(e.target.value)} type='password' />
                </div>

                <button onClick={handleSubmit} className='bg-[#8c6dfd] text-white py-3 px-10 flex flex-start rounded'>Submit</button>

                <button onClick={signin} className='w-full border mt-10 p-3 rounded border-[#5f5f5f] text-white'><FcGoogle className='bg-transparent text-[20px] absolute' />Sign in with Google</button>
            </div>
        </div>
    )
}

export default Signin