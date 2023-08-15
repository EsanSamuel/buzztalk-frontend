import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './'
import { AiOutlineUser, AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { auth, provider } from './Firebase'
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { useContext } from 'react'
import { AuthContext } from '../Context/Auth'
import { AiOutlineHome } from 'react-icons/ai'
import { TbSocial } from 'react-icons/tb'
import { RiCommunityLine, RiNftFill } from 'react-icons/ri'
import { BiNews } from 'react-icons/bi'


const Navbar = () => {
    const [navbar, setNavbar] = useState(false)
    const [isActive, setIsActive] = useState(true)
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
        navigate('/login')
    }
    const { users, user } = useContext(AuthContext)
//{signin && <img src={users.photoURL} className='[w-40px] h-[40px] rounded-full bg-transparent' />}

    const navigate = useNavigate()
    return (
        <div className='flex justify-between gap-3 sm:px-3 bg-[#1c1c24] px-5 py-3 rounded card'>
            <input className='sm:w-[400px] w-full h-[35px] border-none rounded-[100px] p-3 bg-[#3a3a43] outline-[#8c6dfd] text-[#eaeaea]'
                placeholder='Search...'

            />
            {!navbar && <AiOutlineMenu onClick={() => setNavbar(true)} className='sm:hidden text-[#e1d9d1] text-[25px] mt-2 bg-transparent' />}
            {navbar && <AiOutlineClose onClick={() => setNavbar(false)} className='sm:hidden text-[#e1d9d1] text-[25px] mt-2 bg-transparent' />}
            <div className='flex gap-3 bg-transparent sm:flex hidden'>{signin ? (
                <button onClick={() => signin()} className='xl:flex hidden bg-transparent rounded-[100px] border border-[#5f5f5f] py-1 px-3 text-[#e1d9d1]'><AiOutlineUser className='bg-transparent text-[30px] text-[#5f5f5f] ' /><span className='mt-1'>Sign Up</span></button>
            ) : (
                <button onClick={() => signout()} className='xl:flex hidden bg-transparent rounded-[100px] border border-[#5f5f5f] py-1 px-4 text-[#e1d9d1]'><span className='mt-1'>Sign Out</span></button>
            )}
            </div>


            {navbar && (
                <div className='z-10 bg-[#1c1c24] p-10 rounded card top-0 left-0 border-r border-[#5f5f5f] overflow-auto flex flex-col fixed animate-slide-in sm:hidden'>
                    <div className='bg-transparent overflow-auto'>
                        <h1 className='text-[30px] px-3 logo flex gap-3 text-[#ead9d1]'><TbSocial className='bg-transparent text-[#00dbde]' />BuzzTalk</h1>
                        <ul className='flex flex-col mt-10 text-[#e1d9d1] space-y-3 cursor-pointer '>
                            <Link to='/home' className='bg-transparent'> <li onClick={() => setIsActive(true)} className={`flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded ${isActive && 'bg-[#8c6dfd] text-[#eaeaea]'}`}><AiOutlineHome className='text-[20px] bg-transparent' /><span className=''>Home</span></li></Link>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><RiCommunityLine className='text-[20px] bg-transparent' />Community</li>
                            <Link to='/news' className='bg-transparent'><li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><RiNftFill className='text-[20px] bg-transparent' />News feed</li></Link>
                            <li onClick={() => signin()} className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><BiNews className='text-[20px] bg-transparent' />Sign In</li>
                        </ul>

                        <hr className='w-full mt-5 text-[#5f5f5f]' />

                        <ul className='flex flex-col mt-10 text-[#e1d9d1] space-y-3 cursor-pointer'>
                            <li onClick={() => signout()} className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Sign Out</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Community</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Marketplace</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />News feed</li>
                        </ul>

                        <hr className='w-full mt-5' />

                        <ul className='flex flex-col mt-10 text-[#e1d9d1] space-y-3 cursor-pointer'>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Home</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Community</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Marketplace</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />News feed</li>
                        </ul>
                    </div>
                </div>
            )}
        </div>

    )
}

export default Navbar
