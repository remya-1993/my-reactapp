import React, { useState } from 'react'
import { Link } from 'react-router-dom'

function Para() {
    const [a,setA] = useState(0);
    return (
        <div className="flex justify-around p-8">

            <div>
                <h1 className="text-white text-3xl font-bold" >SHARON INDUSTRIES</h1>
            </div>
            <div className="flex gap-10">

               <Link className='text-lg text-white hover:text-red-500' to='/'>Home </Link>
               <Link className='text-lg text-white hover:text-red-500' to='/about'>About </Link>
               <Link className='text-lg text-white hover:text-red-500' to='/contact'>Contact </Link>
               <button onClick={()=>{
                setA(a+1)
               }}><img src="https://cdn-icons-png.flaticon.com/128/5888/5888608.png" alt="cart" width={"50px"} /></button>
               
              
                {/* <a className='text-lg text-white hover:text-red-500' href="">Home</a>
                <a className='text-lg text-white hover:text-red-500' href="">About</a>
                <a className='text-lg text-white hover:text-red-500' href="">Contact</a> */}
               
            </div>


        </div>

    )
}

export default Para
