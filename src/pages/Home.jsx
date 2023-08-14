import React, { useEffect, useState } from 'react'
import { Button, Card, Navbar, Sidebar } from '../components'
import { Link } from 'react-router-dom'
import { FaCommentDots, FaRetweet } from 'react-icons/fa'
import { AiOutlineCamera, AiOutlineRetweet, AiFillEdit, AiOutlineVideoCameraAdd, AiOutlineSchedule, AiOutlineClose } from 'react-icons/ai'
import ClipLoader from "react-spinners/ClipLoader";
import { BiEdit } from 'react-icons/bi'
import { shorten } from '../utils/constant'
import { BsThreeDots } from 'react-icons/bs'
import axios from 'axios'

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "#8c6dfd",
};


const Home = () => {
    const [loading, setLoading] = useState(false)
    const [allPost, setAllPost] = useState(null)
    const [thread, setThread] = useState([])
    const [deleted, setDeleted] = useState(false)
    const [like, setLike] = useState(0)


    //fetch post from the api after posting request in the createPost page
    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true)

            try {
                const response = await fetch('http://localhost:3001/api/v1/post', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })

                if (response.ok) {
                    const result = await response.json()

                    setAllPost(result.data.reverse())
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchPosts()
    }, [])

    //liking post
    const LikePost = async (id) => {
        try {
            await fetch('http://localhost:3001/api/v1/post', {
                method: 'Put',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId: id })
            }).then(res => res.json())
                .then(result => {
                    console.log(result)
                    const newData = allPost.map(item => {
                        if (item._id == result._id) {
                            return result
                        } else {
                            return item
                        }
                    })
                    setAllPost(newData)
                    console.log(newData)
                })
        } catch (error) {

        }
    }

    //liking post 2
    /*const handleLike = async (itemId) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/post/${itemId}`);
            const updatedItems = allPost.map((item) =>
                item._id === response.data._id ? response.data : item
            );
            setAllPost(updatedItems);
        } catch (error) {
            console.error('Error liking item:', error);
        }
    };*/

    const handleLike = async (id) => {
        try {
            const response = await axios.post(`http://localhost:3001/api/v1/post/${id}`);
            console.log(response.status)
            if (response.status === 200) {
                setLike(like + 1);
            }
        } catch (error) {
            console.error(error);
        }
    };

    //fecthing news api
    useEffect(() => {
        fetch('https://newsapi.org/v2/everything?q=apple&from=2023-08-03&to=2023-08-03&sortBy=popularity&pageSize=10&apiKey=716a8281ffbf435f94206cf2c4b2c6b0')
            .then(res => res.json())
            .then(data => {
                setThread(data.articles)
            })
    }, [])


    //deleting posts
    const handleDelete = async (id) => {
        try {
            const response = await axios.delete(`http://localhost:3001/api/v1/post/${id}`)
            //console.log(response.data)
            setDeleted(true)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <div className='sm:p-3 p-2 relative flex flex-row min-h-screen'>
            <div className='sm:flex hidden text-white relative rounded  border-[#5f5f5f] '>
                <Sidebar />
            </div>

            <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:px-10  bg-[#13131a]'>
                <Navbar />


                <div className='flex justify-between w-full h-full  bg-[#13131a] pb-10'>
                    <div className='bg-[#1c1c24] sm:p-5 p-2 mt-5 h-full w-full card rounded'>

                        <Link to='/create'><input className='w-full h-[35px]  border-none rounded-[100px] p-5 bg-[#3a3a43] outline-none'
                            placeholder='Whats on your mind?' /></Link>
                        <div className='flex gap-4 bg-transparent p-3 text-[#e1d9d1] text-[20px] bg-none justify-between'>
                            <div className='flex gap-4 bg-transparent mt-2'>
                                <AiOutlineCamera className=' bg-transparent text-[]' />
                                <BiEdit className=' bg-transparent' />
                                <AiOutlineVideoCameraAdd className='bg-transparent' />
                                <AiOutlineSchedule className='bg-transparent' />
                            </div>

                            <div className='bg-transparent'>
                                <Link to='/create'><button className='hover:opacity-50 rounded-[100px] bg-[#8c6dfd] py-2 text-[18px] px-5'>Post</button></Link>
                            </div>
                        </div>

                        {loading && (
                            <div className='text-center bg-transparent mt-10'>
                                <ClipLoader
                                    color='#fff'
                                    loading={loading}
                                    cssOverride={override}
                                    size={150}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />
                            </div>
                        )}

                        {allPost ? (
                            <div className='w-full bg-[#1c1c24]  '>
                                {
                                    allPost.map((post) => (
                                        <Card key={post._id} {...post} like={LikePost} handleLike={handleLike} handleDelete={handleDelete} likepost={like} />
                                    ))
                                }
                            </div>
                        ) : (
                            <h1 className='text-center text-[#5f5f5f] mt-10'>No Post found</h1>
                        )}
                        <div className='w-full'>
                            {deleted && <div className='bottom-3 fixed w-[92%] sm:w-[300px] align-center  rounded card h-[50px] text-[#eaeaea] p-3 border border-[#5f5f5f]  flex justify-between'>
                                <h1>Post deleted</h1>
                                <div>
                                    <AiOutlineClose className='text-[20px]' onClick={() => setDeleted(false)} />
                                </div>
                            </div>}
                        </div>

                    </div>




                    <div className='h-auto flex flex-col xl:flex hidden px-10 text-[#ead9d1] sticky top-0'>
                        <div className='bg-[#1c1c24] w-[300px] mt-5 rounded h-auto card text-center p-4 sticky top-5'>
                            <h1 className='pb-5 text-left'>Today's Threading</h1>
                            {thread?.length > 0 ? (
                                <div className='bg-transparent'>{thread.map((data) => (
                                    <a href={data.url}><div key={data.id} className='bg-transparent cursor-pointer '>
                                        <div className='flex justify-between bg-transparent'>
                                            <h1 className='text-[12px]   text-left text-[#eaeaea] hover:text-[#8c6dfd] '>{shorten(data.title)}</h1><BsThreeDots className='bg-transparent' />
                                        </div>
                                        <p className='text-left text-[10px] pb-3 text-[#5f5f5f]'>{data.publishedAt}</p>
                                    </div></a>
                                ))}
                                    <Link to='/news'><h1 className='text-[#8c6dfd] cursor-pointer text-[13px]'>View more</h1></Link>
                                </div>
                            ) : (
                                <div className='text-center bg-transparent mt-10 pb-10'>
                                    <ClipLoader
                                        color='#fff'
                                        loading={loading}
                                        cssOverride={override}
                                        size={150}
                                        aria-label="Loading Spinner"
                                        data-testid="loader"
                                    />
                                </div>
                            )
                            }
                        </div>
                        {/*<div className='bg-[#1c1c24] w-[300px] mt-5 rounded h-[300px] card '></div>
                        <div className='bg-[#1c1c24] w-[300px] mt-5 rounded h-[300px]  card'></div>*/}
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Home