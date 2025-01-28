import React, { useState } from 'react'

function State() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState(false);

    return (
        <div >
            <h1>State Variables:</h1>
            <img onClick={() => {
                setCount(!color ? count +1 : count - 1);
                setColor(!color);
            }}
                src="https://cdn-icons-png.flaticon.com/128/1077/1077035.png"
                style={{
                    cursor: 'pointer',
                    filter: color ? "hue-rotate(0deg) brightness(0) saturate(100%) invert(16%) sepia(83%) saturate(6525%) hue-rotate(355deg) brightness(91%) contrast(107%)" : "none",
                }} />

            {count}
        </div>
    )
}

export default State
