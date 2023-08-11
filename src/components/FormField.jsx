import React from 'react'

const FormField = ({ handleChange, value, type, name, title, placeholder, isTextArea }) => {
    return (
        <div className='w-full py-3'>
            <label className=''>
                <span className='text-[#3a3a43]  py-3 pb-5'>{title}</span>
                {isTextArea ? (
                    <textarea className='bg-transparent border border-[#5f5f5f] w-full mt-5 h-[45px] rounded p-3  outline-[#8c6dfd] '
                        onChange={handleChange}
                        value={value}
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                    />
                ) : (
                    <input className='bg-transparent  border border-[#5f5f5f] w-full mt-5 h-[45px] rounded p-3  outline-[#8c6dfd] '
                        onChange={handleChange}
                        value={value}
                        type={type}
                        name={name}
                        id={name}
                        placeholder={placeholder}
                    />
                )}

            </label>
        </div>
    )
}

export default FormField