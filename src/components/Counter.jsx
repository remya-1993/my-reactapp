import React, { useState } from 'react'

function Counter() {
    const [a, setA] = useState(true);
    return (
        <div>

            <button onClick={() => {
                setA(false) ? (<h1>Light mode</h1>) : (<h1>Dark mode</h1>);
            }}>toggle</button>

            {a}
        </div>

    )
}

export default Counter
