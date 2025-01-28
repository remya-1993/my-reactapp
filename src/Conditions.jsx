import React, { useState } from 'react'

function Conditions() {
    const [a,setA] = useState(false);

  return (
    <div>
      <button className={`${a ? "bg-red-500": "bg-blue-500"}`}  onClick={()=> {
        setA(true)
      }}>{
        a ? "submitted" : "submit"}</button>

        {
            a && (<h2>form submitted successfully</h2>
            )
        }
       
    </div>
    
  )
}

export default Conditions
