import React, { useState } from 'react'

function Formhandling() {
    const [userdata, setUserdata] = useState({})
    const [userdatavalidate, setUserdatavalidate] = useState({})

    return (
        <div>
            <h1 className='text-2xl font-bold underline px-10 mt-5'>FORM HANDLING</h1>
            <div>
                <br />
                <label htmlFor="">Name:</label>
                <input onBlur={()=>{
                    if(!userdata.name){
                        setUserdatavalidate({...userdatavalidate, nameerror: "Name is required"})
                    }else{
                        setUserdatavalidate({...userdatavalidate, nameerror: ""})
                    }
                }} onChange={(a) => {
                    setUserdata({ ...userdata, name: a.target.value })
                }} className='border-2 border-black' type="text" placeholder='Enter your name' />
               {
                userdatavalidate.nameerror && (
                    <div>
                         <br />
                         <span className='text-red-500'>{userdatavalidate.nameerror}</span>
                    </div>
                )
               }
               <br />
                <br />
                <label htmlFor="">Email:</label>
                <input onBlur={()=>{
                    if(!userdata.email){
                        setUserdatavalidate({...userdatavalidate, emailerror: "Email is required"})
                    }else{
                        setUserdatavalidate({...userdatavalidate, emailerror: ""})
                    }
                }} onChange={(a) => {
                    setUserdata({ ...userdata, email: a.target.value })
                }} className='border-2 border-black' type="text" placeholder='Enter your mail' />
                <br /><br />
                <span className='text-red-500'>{userdatavalidate.emailerror}</span>
                <br />
                <button className='border-black bg-black text-white p-1' onClick={(e) => {
                    e.preventDefault();
                    if(!userdatavalidate.nameerror && !userdatavalidate.emailerror){
                        alert("Form submitted successfully")
                        console.log("Values are:" + JSON.stringify(userdata))
                    } else{
                        alert("Form not submitted due to error. Please check the form")
                    }
                    
                }}>submit</button>
                <br />
                <br />

            </div>  
        </div>
    )
}

export default Formhandling
