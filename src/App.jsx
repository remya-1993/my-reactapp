import logo from './logo.svg'
import Heading from './components/Heading';
import Block from './components/Block';
import Para from './components/Para';
import './index.css'
import Hero from './components/Hero';
import Footer from './components/Footer';
import About from './components/About';
import Contact from './components/Contact';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom"
import State from './components/State';
import Changeheading from './components/Changeheading';
import Fruitsbox from './components/Fruitsbox';
import Workout from './components/Workout';
import Useeffect from './components/Useeffect';
import Childdrilling from './Childdrilling';
import { useState } from 'react';
import Conditions from './Conditions';
import Readmore from './components/Readmore';
import Formhandling from './Formhandling';
import Todo from './Todo';
import Counter from './components/Counter';
import Signup from './components/Signup';
import Login from './components/Login';

import 'bootstrap/dist/css/bootstrap.css';
import Feedbackform from './components/Feedback';



// import React, { useState, useEffect } from 'react';
// import { supabase } from './components/supabaseClient';


// function App() {
//   const [todos, setTodos] = useState([]);
//   const [newTask, setNewTask] = useState('');

//   // Fetch tasks from Supabase
//   useEffect(() => {
//     const fetchTodos = async () => {
//       const { data, error } = await supabase
//         .from('todo data')
//         .select(`
//           *,
//           todo(
//           *)`)
//         .order('created_at', { ascending: true });

//       if (error) {
//         console.error('Error fetching todos:', error.message);
//       } else {
//         setTodos(data);
//       }
//     };

//     fetchTodos();
//   }, []);

//   // Add a new task
//   const addTodo = async () => {
//     if (!newTask.trim()) return;

//     const { data, error } = await supabase
//       .from('todo data')
//       .insert([{ task: newTask, completed: false }]);

//     if (error) {
//       // console.error('Error adding todo:', error.message);
//     } else {
//       setTodos([...todos, ...data]); // Update the state with the new task
//       setNewTask('');
//     }
//   };

//   // Toggle task completion
//   const toggleTodo = async (id, completed) => {
//     const { error } = await supabase
//       .from('todo data')
//       .update({ completed: !completed })
//       .eq('id', id);

//     if (error) {
//       // console.error('Error toggling todo:', error.message);
//     } else {
//       setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !completed } : todo));
//     }
//   };

//   // Delete a task
//   const deleteTodo = async (id) => {
//     const { error } = await supabase
//       .from('todo data')
//       .delete()
//       .eq('id', id);

//     if (error) {
//       // console.error('Error deleting todo:', error.message);
//     } else {
//       setTodos(todos.filter(todo => todo.id !== id));
//     }
//   };

//   return (
//     <div>
//       <h1>To-Do App</h1>
//       <div>
//         <input
//           type="text"
//           placeholder="Enter a task"
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button onClick={addTodo}>Add Task</button>
//       </div>
//       <ul>
//         {todos.map(todo => (
//           <li key={todo.id}>
//             <input
//               type="checkbox"
//               checked={todo.completed}
//               onChange={() => toggleTodo(todo.id, todo.completed)}
//             />
//             {todo.task}
//             <button onClick={() => deleteTodo(todo.id)}>Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default App;






function App() {

  const [Count, setCount] = useState(0)
  return (

    <div className="h-screen ">
      {/* <BrowserRouter>
        <Para />

        <Routes>
          <Route path='/' element={<Hero />} />
        <Route path='/about' element={<About />} />
          <Route path= '/contact' element={<Contact />} />
          
        </Routes>

        <Footer />
    
      // </BrowserRouter> */}

      {/* <State /> */}
      {/* <Changeheading /> */}
      {/* <Fruitsbox /> */}

      {/* <Workout /> */}
      {/* <Useeffect /> */}

      {/* <h1>count is: {Count} </h1> */}


      {/* <Childdrilling Count={Count} setCount={setCount} /> */}

      {/* <Conditions /> */}
      {/* <Readmore /> */}
      {/* <Formhandling /> */}


      {/* <Todo /> */}
      {/* <Signup /> */}
      {/* <Login /> */}

      <BrowserRouter>


        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/feedbackform' element={<Feedbackform />} />

        </Routes>



      </BrowserRouter>





    </div>

  );
}

export default App; 
