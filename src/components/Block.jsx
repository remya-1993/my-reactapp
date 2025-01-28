import React from 'react'

function Block(props) {
    console.log(props.text)
  return (
    <div>
        {props.text}
    </div>
  )
}

export default Block
