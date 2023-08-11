import React, { useEffect, useState } from 'react'
import { shorten2 } from '../utils/constant'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { AiOutlineHome } from 'react-icons/ai'
import { TbSocial } from 'react-icons/tb'
import { RiCommunityLine, RiNftFill } from 'react-icons/ri'
import { BiNews } from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import ClipLoader from "react-spinners/ClipLoader";

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8c6dfd",
};


const NewsFeed = () => {
    const [thread, setThread] = useState([])
    const [navbar, setNavbar] = useState(false)
    const [isActive, setIsActive] = useState(false)

    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&pageSize=100&apiKey=716a8281ffbf435f94206cf2c4b2c6b0')
            .then(res => res.json())
            .then(data => {
                //console.log(data)
                setThread(data.articles)
            })
    }, [])
    return (
        <div className='p-5 text-white'>
            <div className='flex justify-between'>
                <h1 className='logo text-[25px]'>BuzzTalk</h1>
                {!navbar && <AiOutlineMenu onClick={() => setNavbar(true)} className='text-[#e1d9d1] text-[25px] mt-2 bg-transparent' />}
                {navbar && <AiOutlineClose onClick={() => setNavbar(false)} className=' text-[#e1d9d1] text-[25px] mt-2 bg-transparent' />}
            </div>
            <div className='bg-[#1c1c24] w-full mt-5 rounded h-auto card text-center p-4'>
                <h1 className='pb-7 text-left'>Today's Threading</h1>
                {thread?.length > 0 ? (
                    <div className='bg-transparent'>
                        {thread.map((data) => (
                            <a href={data.url}><div key={data.id} className='bg-transparent cursor-pointer '>
                                <div className='flex justify-between bg-transparent gap-5'>
                                    <h1 className='text-[12px]   text-left text-[#eaeaea]  hover:text-[#26a7de] '>{shorten2(data.title)}</h1><BsThreeDots className='bg-transparent' />
                                </div>
                                <p className='text-left text-[10px] pb-5 text-[#5f5f5f]'>{data.publishedAt}</p>
                            </div></a>
                        ))}
                    </div>
                ) : (
                    <div className='text-center bg-transparent mt-10 pb-20'>
                        <ClipLoader
                            color='#fff'
                            cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                )}
            </div>
            {/*navbar here*/}

            {navbar && (
                <div className='z-10 bg-[#1c1c24] overflow-auto p-10 rounded card top-0 left-0 border-r border-[#5f5f5f] overflow-auto flex flex-col fixed animate-slide-in '>
                    <div className='bg-transparent overflow-auto'>
                        <h1 className='text-[30px] px-3 logo flex gap-3 text-[#ead9d1]'><TbSocial className='bg-transparent text-[#00dbde]' />BuzzTalk</h1>
                        <ul className='flex flex-col mt-10 text-[#e1d9d1] space-y-3 cursor-pointer'>
                            <Link to='/home' className='bg-transparent'> <li onClick={() => setIsActive(true)} className={`flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded ${isActive && 'bg-[#8c6dfd] text-[#eaeaea]'}`}><AiOutlineHome className='text-[20px] bg-transparent' /><span className=''>Home</span></li></Link>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><RiCommunityLine className='text-[20px] bg-transparent' />Community</li>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Marketplace</li>
                            <Link to='/news' className='bg-transparent'><li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><RiNftFill className='text-[20px] bg-transparent' />News feed</li></Link>
                        </ul>

                        <hr className='w-full mt-5 text-[#e1d9d1]' />

                        <ul className='flex flex-col mt-10 text-[#e1d9d1] space-y-3 cursor-pointer'>
                            <li className='flex gap-3 hover:bg-[#8c6dfd] hover:text-[#eaeaea] p-3 rounded'><AiOutlineHome className='text-[20px] bg-transparent' />Home</li>
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

export default NewsFeed