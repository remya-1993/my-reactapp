import React, { useState } from 'react'

function Changeheading() {
    const [heading, setHeading] = useState("Default heading")

    return (
        <div>
            <h2 onClick={() => {
              const newHeading =  prompt("Enter new heading")
              if(newHeading){
                setHeading (newHeading)
              }
            }}>Change Heading
            </h2>

            {heading}
        </div>
    )
}

export default Changeheading
