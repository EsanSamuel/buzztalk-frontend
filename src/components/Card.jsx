import { FaCommentDots, FaRetweet } from 'react-icons/fa'
import { AiFillLike, AiOutlineRetweet } from 'react-icons/ai'
import { AuthContext } from '../Context/Auth'
import { useContext, useEffect, useState } from 'react'
import { Comment } from '../pages'
import { Link } from 'react-router-dom'
import { VscVerifiedFilled } from 'react-icons/vsc'
import { BsThreeDots } from 'react-icons/bs'
import io from 'socket.io-client'
import { CgProfile } from 'react-icons/cg'
const socket = io.connect('http://localhost:3001')

const Card = ({ _id, details, name, image, ProfileImage, like, handleLike, handleDelete, likepost }) => {
    const [imageModal, setImageModal] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const [saved, setSaved] = useState({})
    const [modal, setModal] = useState(false)

    const { users } = useContext(AuthContext)

    useEffect(() => {
        fetch(`http://localhost:3001/api/v1/post/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setSaved(data)
            })

    }, [])

    const joinRoom = () => {
        socket.emit('join_room', room)
    }

    const handleSave = (saved) => {
        console.log(saved)
        const cart = JSON.parse(localStorage.setItem('cart')) || []
        const doesPostExist = cart.find(item => item._id === saved._id)
        if (doesPostExist) {
            const updateSaved = cart.map(item => {
                if (item._id === saved._id) {
                    return {
                        ...item,
                        quantity: item.quantity + 1
                    }
                }
                return item
            })
            localStorage.setItem('cart', JSON.stringify(updateSaved))
        } else {
            localStorage.setItem('cart', JSON.stringify([...cart, { ...saved, quantity: 1 }]))
        }

    }

    /*const liked = () => {
        setIsActive(true)
        setLikes(likes + 1)
    }*/

    return (
        <div className='h-auto mt-5 w-full card rounded-[10px]   text-[#e1d9d1]'>
            <div className='space-y-5 pb-5 p-5 bg-transparent'>
                <div className='flex justify-between'>
                    <div className='flex gap-3 bg-transparent'>{ProfileImage ? <img src={ProfileImage} className='w-[40px] h-[40px] rounded-full bg-transparent' /> : <CgProfile className='text-[40px] text-[#5f5f5f]' />} <h1 className='mt-2'>{name}</h1> <VscVerifiedFilled className='sm:mt-2.5 mt-3' /></div>
                    <div className='bg-transparent'>
                        {!modal && <BsThreeDots className='text-[20px]' onClick={() => setModal(true)} />}
                        {modal && <BsThreeDots className='text-[20px]' onClick={() => setModal(false)} />}
                        {modal && <div className='animate-slide-in2 float-right flex align-right card w-auto p-2 rounded border cursor-pointer border-[#5f5f5f]' onClick={() => handleDelete(_id)}>
                            <h1 className=''>Delete Post</h1>
                        </div>}
                    </div>
                </div>
                <p className=''>{details}</p>
            </div>
            <img src={image} className='rounded sm:h-[370px] h-[270px] bg-transparent w-full contain' onClick={() => setImageModal(true)} />



            {/*{imageModal && (
                <img src={image} className='rounded h-[370px] bg-transparent w-full contain p-0 a' />
            )}*/}
            <div className='flex justify-between w-full p-5 mt-2 text-[20px] bg-transparent'>
                <label onClick={() => handleLike(_id)} className={`flex gap-2 ${isActive && 'text-[#43affc]'}`}> <AiFillLike className={`bg-transparent `} /> <span className='text-[15px]'>{likepost} Likes</span></label>
                <Link to={`/comment/${_id}/${name}/${details}`}> <label className='flex gap-2'><FaCommentDots className='bg-transparent' /><span className='text-[15px]'>Comment</span></label></Link>
                <label className='flex gap-2' onClick={() => handleSave(saved?._id)}> <AiOutlineRetweet className='bg-transparent' /><span className='text-[15px]'>Save</span></label>
            </div>
        </div>
    )
}

export default Card