import React from 'react'

const Button = ({ title, handleSubmit, styles }) => {
    return (
        <div >
            <button className={`rounded bg-[#1dc071] p-2 px-5 text-white hover:opacity-70 w-full ${styles}`} onClick={handleSubmit}>
                {title}
            </button>
        </div>
    )
}

export default Button