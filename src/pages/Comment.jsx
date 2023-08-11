import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AiOutlineSend } from 'react-icons/ai'
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')
import { AuthContext } from '../Context/Auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Comment = () => {
  const [message, setMessage] = useState('')
  const [messageReceived, setMessageReceived] = useState([])
  const { _id, name, details } = useParams()
  const { users } = useContext(AuthContext)
  //const Date = new Date()
  const [form, setForm] = useState({ name: users.displayName, comments: '', ProfileImage: users.photoURL, time: new Date().toLocaleDateString() })
  const [allComments, setAllComments] = useState([])
  const navigate = useNavigate()


  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const sendReplies = () => {
    if (message !== '') {
      const messageData = {
        date: new Date(),
        message: message,
        author: users.displayName
      }
      socket.emit('send_message', messageData)
    }

  }

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageReceived((list) => [...list, data.message])
    })
  }, [socket])

  useEffect(() => {
    const savedCard = JSON.parse(
      localStorage.getItem(
        'Message')
    )
    if (savedCard) {
      setMessageReceived(savedCard)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('Message', JSON.stringify(messageReceived))
  }, [messageReceived])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (form.comments) {
      try {
        const response = await fetch(`http://localhost:3001/api/v1/comment`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form)
        })

        await response.json()

      } catch (error) {
        console.log(error)
      }
    }

  }

  React.useEffect(() => {
    const fetchPosts = async (id) => {
      //setLoading(true)


      try {
        const response = await fetch(`http://localhost:3001/api/v1/comment`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const result = await response.json()

          //console.log(result.data.reverse())
          setAllComments(result.data.reverse())
        }
      } catch (error) {
        console.log(error)
      } finally {
        //setLoading(false)
      }
    }
    fetchPosts()
  }, [])

  /*React.useEffect(() => {
    const response = async (id) => {
      axios.get(`http://localhost:3001/api/v1/comment/${id}`)
        .then(response => {
          setAllComments(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
    response()

  }, [])*/


  return (
    <div className='w-full text-[#ead9d1] sm:p-20 p-5' onSubmit={sendReplies}>
      <h1 className='text-center'>Replies to {name}'s post</h1>

      {allComments.map((comment) => (
        <div key={comment.id} className='p-2 rounded mt-5 flex gap-3 h-[80%]'>
          <img src={comment.ProfileImage} className='[w-40px] h-[40px] rounded-full bg-transparent' />
          <div className=''>
            <p className='text-[12px] text-[#5f5f5f]'>{comment.name}</p>
            <h1 className='text-[#eaeaea]'>{comment.comments}</h1>
            <p className='text-[12px] text-[#5f5f5f]'>{comment.time}</p>
          </div>
        </div>
      ))}


      <form className='w-[90%]  bg-transparent fixed bottom-0  pb-10 flex gap-3' onSubmit={handleSubmit}>
        <input className='w-full  h-[40px] rounded border p-5 border-[#5f5f5f] bg-[#3a3a43] outline-[#8c6dfd]'
          placeholder='Enter comment'
          onChange={handleChange}
          value={form.comments}
          name='comments'
        />
        <button className='bg-[#8c6dfd] hover:opacity-50 p-2 rounded' onClick={handleSubmit}><AiOutlineSend className='bg-transparent text-[25px]' /></button>
      </form>
    </div>
  )
}

export default Comment