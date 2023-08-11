import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Comment, CreatePost, Home, Swipe, Signin, Login, NewsFeed } from './pages'

const App = () => {
  return (
    <div className='bg-[#13131a] h-full min-h-screen'>



      <Routes>
        <Route path='/' element={<Swipe />} />
        <Route path='/home' element={<Home />} />
        <Route path='/create' element={<CreatePost />} />
        <Route path='/comment/:_id/:name/:details' element={<Comment />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/login' element={<Login />} />
        <Route path='/news' element={<NewsFeed />} />
      </Routes>


    </div>
  )
}

export default App