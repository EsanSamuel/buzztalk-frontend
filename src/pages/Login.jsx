import React, { useState, useContext, useEffect } from 'react'
import { FcGoogle } from 'react-icons/fc'
import img from '../assets/img1.svg'
import { auth, provider } from '../components/Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { AuthContext } from '../Context/Auth'
import { useNavigate, Link } from 'react-router-dom'
import axios from 'axios'

const Input = ({ title, placeholder, handleChange, type }) => (
  <div className='pb text-[#eaeaea] bg-transparent'>
    <h1 className='flex flex-start pb-5'>{title}</h1>
    <input className='w-full bg-[#3a3a43] border border-[#5f5f5f] rounded h-[40px]' placeholder={placeholder}
      onChange={handleChange}
      type={type} />
  </div>
)

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const [loggedIn, setLoggedIn] = useState(false)
  const [invalid, setInvalid] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [inputType, setInputType] = useState('password')

  //#0165fc

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
    if (password && email) {
      try {
        axios.post('https://buzztalk-api-e1uj.vercel.app/api/v1/login', { email, password })
          .then(result => {
            console.log(result)
            if (result.data === 'Success') {
              navigate('/home')
              setLoggedIn(true)
            } else if (result.data === 'Incorrect password!') {
              setInvalid(true)
            } else {
              if (result.data === 'User does not exists') {
                setNotFound(true)
              }
            }
          })
      } catch (error) {
        console.log(error)
      }
    }
  }

  useEffect(() => {
    if (loggedIn) {
      navigate('/home')
    }
  }, [])

  const showpassword = () => {
    if (inputType === 'text') {
      setInputType('password')
    } else {
      setInputType('text')
    }
  }

  return (
    <div className='sm:p-5 p-3 sm:flex justify-between gap-3'>
      <div className='bg-[#8c6dfd] w-auto p-10 rounded card flex flex-col text-white '>
        <h1 className='pb-20'>BuzzTalk</h1>
        <h1 className='text-[40px] text-white pb-10 '>Welcome back!</h1>
        <p className='text-[#eaeaea] pb-10'>Welcome back to the leading social media platform and join us by logging in!</p>

        <div className='rounded bg-transparent'>
          <img src={img} className='bg-transparent h-[400px]' />
        </div>
      </div>
      <div className=' text-center rounded card sm:p-20 px-5 py-10 sm:mt-0 mt-10 w-full bg-[#1c1c24]'>
        {invalid && <h1 className='pb-3 text-[#ff3632] '>*Wrong Password</h1>}
        {notFound && <h1 className='pb-3 text-[#ff3632] '>*User does not exist</h1>}
        <h1 className='text-white text-[30px]'>Login to <span className='logo'>BuzzTalk</span></h1>
        {/*<p className='text-white flex flex-start'>Sign in to BuzzTalk</p>*/}
        <div className='w-full bg-transparent py-10 space-y-6'>
          <Input className='' title='Enter email' placeholder='Enter email..' handleChange={(e) => setEmail(e.target.value)} type='email' />
          <Input className='' title='Enter Password' placeholder='Enter password..' handleChange={(e) => setPassword(e.target.value)} type={inputType} />
          <div className='flex bg-transparent justify-between'>
            <div className='flex bg-transparent gap-3'>
              <input type='checkbox' className='flex flex-start mt-[3px]' onClick={showpassword} />
              <p className='text-[#eaeaea]'>Show password</p>
            </div>
            <div className='flex bg-transparent gap-3'>
              {/* <p className='text-[#eaeaea] cursor-pointer hover:underline'>Forgot password?</p>*/}
            </div>
          </div>
        </div>
        <button onClick={handleSubmit} className='bg-[#8c6dfd] hover:opacity-50 text-white py-3 px-10 flex flex-start rounded'>Submit</button>

        <button onClick={signin} className='w-full border hover:opacity-50 mt-10 p-3 rounded border-[#5f5f5f] text-white'><FcGoogle className='bg-transparent text-[20px] absolute' />Sign in with Google</button>

        <p className='mt-10 text-[#eaeaea]'>Don't have an account? <Link to='/signin' className='bg-transparent'><span className='underline'>signup</span></Link></p>
      </div>
    </div>
  )
}

export default Login
