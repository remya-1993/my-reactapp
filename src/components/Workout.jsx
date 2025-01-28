import { useEffect, useState } from 'react'

// function Workout() {
// const[a, setA] = useState();

//   return (
//     <div>
//         <p>{a}</p>
//       <button onClick={() =>{
//         setA( "I am Remya. My native place is Kerala")
//       } }>Click Me</button>


//     </div>
//   );
// }

// export default Workout


// function Workout() {
//   const [count, setCount] = useState(10);

//   useEffect(() => {
//     if (count > 0) {
//       const timer = setInterval(() => {
//         setCount(count - 1);
//       }, 1000);
//       return () => clearInterval(timer);
//     }
//   }, [count]);

//   return (
//     <div>
//       counter : {count}
//     </div>
//   );
// }

// export default Workout

// function Workout() {
//   const [a, setA] = useState(0);


//   const handleClick = () => {
//     document.title = "Button Clicked"
//   };

//     return (
//       <div>
//         <button onClick={handleClick}>Click me</button>

//       </div>
//     );
//   }

// export default Workout

// function Workout() {
//   const [loading, SetLoading] = useState(true);
//   useEffect(() => {
//     const intervalId = setInterval(() => {
//       SetLoading(prevState => !prevState)
//     }, 3000);

//     return () => {
//       clearInterval(intervalId);
//     };

//   }, [])

//   return (
//     <div>
//       {
//         loading && <p>We are going to a trip</p>
//       }

//     </div>
//   )
// }
// export default Workout

function Workout() {
  const [loading, SetLoading] = useState(true);
  useEffect(() => {
    const timer = setInterval(() => {
      SetLoading(prevState => !prevState)
    }, 3000);
return() =>{
  clearInterval(timer)
}

  }, [])

  return (
    <div>
     {
      loading && <h1>hello,</h1>
     }
    </div>
  )
}
export default Workout
