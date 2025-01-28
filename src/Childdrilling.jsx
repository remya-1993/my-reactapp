import React from 'react'

export default function Childdrilling({Count, setCount}) {
  return (
    <div style={{ padding: '20px' }}>
    <h2>Product Name: Awesome Product</h2>
    <p>Details: This is an amazing product that you should buy!</p>
    <img src="https://via.placeholder.com/150" alt="Product" />
    <div>
      <button onClick={() =>{
        setCount(Count+1)
      }} style={{ marginTop: '10px' }}>
        Add to Cart
      </button>
      {Count}
    
    </div>
  </div>
  )
}

 
