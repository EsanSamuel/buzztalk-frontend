import React from 'react'
import Slider from "react-slick";
import { data } from '../utils/constant'
import { Link } from 'react-router-dom'
import { Button} from '../components'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Swipe = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };


    return (
        <div className='sm:px-[20%] sm:py-8 p-10 text-white w-full'>
            <div
                className=''>
                <h1 className='text-center  logo text-[25px]'>Welcome to BuzzTalk</h1>
                <Slider {...settings} className='mt-10'>

                    {data.map((datax) => (
                        <div key={datax.id} className='sm:mt-0 mt-20'>
                            <div className=''>

                                <img src={datax.image} className='w-full sm:h-[400px]' />
                                <h1 className='text-center text-[25px] mt-10'>{datax.text}</h1>

                            </div>

                        </div>


                    ))}
                </Slider>

                <div className='sm:px-[15%] mt-10'>
                    <Link to='/signin'>
                        <Button
                            title='Continue'
                            styles='rounded-full'
                        />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Swipe