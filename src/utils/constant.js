import img1 from '../assets/img1.svg'
import img2 from '../assets/img2.svg'
import img3 from '../assets/img3.svg'

export const data = [
    {
        id: 1,
        text: ' Connect, Share, and Discover Together',
        image: img1,
    },
    {
        id: 2,
        text: 'Express, Engage, and Stay Informed',
        image: img2,
    },
    {
        id: 3,
        text: 'Connect, Network, and Advance Your social life',
        image: img3,
    },
]

export const shorten = (address) =>
    `${address.slice(0, 25)}...`;

export const shorten2 = (address) =>
    `${address.slice(0, 105)}...`;