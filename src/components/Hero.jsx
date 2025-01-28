import React from 'react'

function Hero() {
    return (
        <div className='flex justify-center items-center gap-40'>
            <div className="grid place-items-center">
                <p className='text-red-600 text-8xl font-bold '>DESIGN <br />YOUR <br /> DREAM <br /> HOME</p>
                <p className='text-white '>Strong foundations, solid designs:</p>
                <p className='text-white'>Trust us to bring your concrete visions to life.</p>
                <button className='text-white bg-red-500 text-lg p-1 rounded hover:bg-black border-2 border-black-500'>Know More</button>
            </div>

            <img src="https://sharonindustry.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fhome.3ce56fc6.png&w=1080&q=75" alt="" />
        </div>

    )
}

export default Hero
