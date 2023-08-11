import React, { useState } from 'react'
import { Button, FormField } from '../components'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../Context/Auth'

const CreatePost = () => {
    const { users } = useContext(AuthContext)
    const [form, setForm] = useState({ image: '', name: users.displayName, details: '', ProfileImage: users.photoURL })
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()



    const handleStateChange = (name, value) => {
        setForm((prevState) => ({ ...prevState, [name]: value }))
    }

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleImageChange = (e) => {
        e.preventDefault()

        const file = e.target.files[0];

        if (!file) return;

        if (!file.type.includes("image")) {
            alert("Please upload an image!");

            return;
        }

        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
            const result = reader.result

            //console.log(result)

            handleStateChange('image', result)
        };

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (form.details && form.name) {
            setLoading(true)

            try {
                const response = await fetch('http://localhost:3001/api/v1/post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form)
                })

                await response.json()
                navigate('/home')
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }
    }


    return (
        <div className='sm:p-[100px] p-3 text-[#ead9d1]' onSubmit={handleSubmit}>
            <h1 className='text-center text-[35px] pb-10 logo '>CreatePost</h1>

            <div className='flex gap-3 pb-5'>
                <img src={form.ProfileImage} className='[w-40px] h-[40px] rounded-full bg-transparent' />
                <h1 className='mt-2'>{users.displayName}</h1>
            </div>
            <div className='h- min-h-[300px] border rounded p-5 border-[#5f5f5f] text-center'>

                {!form.image ? <div>
                    <input type='file' onChange={handleImageChange} className='opacity-0 bg-transparent py-3 h-[300px] w-full align-center justify-center flex' />
                    <h1 className='mt-[-200px] z-[-2]'>Upload Image</h1>
                </div> :
                <div className='flex justify-center align-center'>
                    <img src={form.image} className='h-[300px] rounded sm:w-[400px] w-full' />
                    </div>
                }
            </div>

            <form className='mt-3'>
                <FormField
                    handleChange={handleStateChange}
                    value={form.name}
                    type='text'
                    name='name'
                    title='Name'
                />
                <FormField
                    handleChange={handleChange}
                    value={form.details}
                    name='details'
                    title='Details'
                    placeholder='Enter Post'
                    isTextArea

                />

            </form>



            <div className='mt-10 '>
                <Button
                    title={!loading ? 'Post' : 'Posting...'}
                    handleSubmit={handleSubmit}

                />
            </div>
        </div>
    )
}

export default CreatePost