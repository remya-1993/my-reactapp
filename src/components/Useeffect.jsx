import { useEffect, useState } from 'react'



function Useeffect() {

    const [loading, SetLoading] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            SetLoading(false)
        }, 2000);

    }, [])

    return (
        <div>
            <h1>hi, welcome to home page</h1>
            {
                loading ? (<h2>loading</h2>) : (<h2>Hello, guys!</h2>)
            }

        </div>
    )
}

export default Useeffect

// function Useeffect() {

//     const [a, SetA] = useState(0);
//     useEffect(() => {
//         console.log(a)

//     }, [a])

//     return (
//         <div>
//             <h1>hi, welcome to home page</h1>
//             {a}
//             <img onClick={() => {
//                 SetA(a + 1)
//             }} src="https://cdn-icons-png.flaticon.com/128/3144/3144456.png" alt="" />

//         </div>
//     )
// }

// export default Useeffect
