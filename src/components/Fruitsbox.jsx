import React, { useState } from 'react';

function Fruitsbox() {
    const [a, setA] = useState({
        mango: 0,
        apple: 0,
        Orange: 0,
    });

    return (
        <div>
            <h1 className="text-blue-500">Fruits</h1>

            <button
                onClick={() => {
                    setA({
                        ...a,
                        mango: a.mango + 1,
                    });
                }}
            >
                Mango
            </button>
            <p>Likes: {a.mango}</p>

            <button
                onClick={() => {
                    setA({
                        ...a,
                        apple: a.apple + 1,
                    });
                }}
            >
                Apple
            </button>
            <p>Likes: {a.apple}</p>

            <button onClick={() => {
                setA({
                    ...a,
                    Orange: a.Orange + 1
                });
            }}>
                Orange
            </button>
            <p>Likes: {a.Orange}</p>
        </div>
    );
}

export default Fruitsbox;

