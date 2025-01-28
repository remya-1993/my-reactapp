import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './components/supabaseClient';

function TodoApp() {
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const fetchUserAndTasks = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('supabaseUser'));

            console.log(loggedInUser)

            if (loggedInUser) {
                setUserName(loggedInUser.user_metadata?.firstName);
                setUserEmail(loggedInUser.email);

                console.log(loggedInUser.email)

                const storedTasks = JSON.parse(localStorage.getItem(`tasks-${loggedInUser.email}`)) || [];
                setTasks(storedTasks);

                const { data: tasksFromDB, error } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_email', loggedInUser.email);

                if (error) {
                    console.error('Error fetching tasks:', error.message);
                } else {
                    setTasks(tasksFromDB || []);
                }
            } else {
                console.error('No logged-in user found.');
            }

            setIsLoading(false);
        };

        fetchUserAndTasks();
    }, []);


    const saveTasksToLocalStorage = (updatedTasks) => {
        localStorage.setItem(`tasks-${userEmail}`, JSON.stringify(updatedTasks));
    };

    const handleAddTask = async () => {
        if (todo && date) {
            let newTasks = [...tasks];

            if (editIndex !== null) {
                const updatedTask = { ...tasks[editIndex], text: todo, date };


                const { error } = await supabase
                    .from('tasks')
                    .update({ text: todo, date })
                    .eq('id', tasks[editIndex].id);

                if (error) {
                    console.error('Error updating task:', error.message);
                } else {
                    newTasks[editIndex] = updatedTask;
                    setEditIndex(null);
                    alert('Task updated successfully');
                }
            } else {
                const newTask = { text: todo, date, user_email: userEmail };


                const { data: insertedTask, error } = await supabase
                    .from('tasks')
                    .insert(newTask)
                    .select('*')
                    .single();

                if (error) {
                    console.error('Error adding task:', error.message);
                } else {
                    newTasks = [...tasks, insertedTask];
                    alert('Task added successfully');
                }
            }

            setTasks(newTasks);
            saveTasksToLocalStorage(newTasks);

            setTodo('');
            setDate('');
        }
    };

    const handleRemove = async (index) => {
        const taskToRemove = tasks[index];


        const { error } = await supabase
            .from('tasks')
            .delete()
            .eq('id', taskToRemove.id);

        if (error) {
            console.error('Error deleting task:', error.message);
        } else {
            const newTasks = [...tasks];
            newTasks.splice(index, 1);
            setTasks(newTasks);
            saveTasksToLocalStorage(newTasks);

            alert('Task removed successfully');
        }
    };

    const handleEdit = (index) => {
        setEditIndex(index);
        setTodo(tasks[index].text);
        setDate(tasks[index].date);
    };

    return (
        <div className="container mx-auto p-6 max-w-md bg-white shadow-2xl rounded-lg">
            <div
                className="logout"
                onClick={() => {
                    localStorage.removeItem('supabaseUser');
                    alert('You have logged out successfully');
                }}
            >
                <Link to="/login">
                    <img src="./images/power-off.png" alt="Logout" width={30} />
                </Link>
            </div>


            <h1 className="text-2xl font-bold text-center text-gray-700 mb-6">
                Welcome, {userEmail.split('@')[0]}!
            </h1>

            <div className='task_data mx-auto'>

                <div className="mb-4 flex flex-col gap-4 text-center">
                    <input
                        value={todo}
                        onChange={(e) => setTodo(e.target.value)}
                        className="btn2  w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        placeholder="Enter your task"
                    />
                    <input
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="btn2 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="date" placeholder="mm/dd/yyyy"
                    />
                    <button
                        onClick={handleAddTask}
                        className={`btn2 w-full py-2 text-white rounded-md ${editIndex !== null ? 'bg-green-900' : 'bg-gray-500'
                            } hover:opacity-90`}
                    >
                        {editIndex !== null ? 'Update Task' : 'Add Task'}
                    </button>
                </div>

                {isLoading ? (
                    <img className='reload' src="./images/dbl_load2.svg" alt="reload" width={50} />
                ) : (
                    <div className="btn2 data space-y-4">
                        {tasks.length > 0 ? (
                            tasks.map((task, index) => (
                                <div
                                    className="flex items-center justify-between p-4 border rounded-md bg-gray-100"
                                    key={task.id}
                                >
                                    <div>
                                        <p className="text-gray-800 font-medium">{task.text}</p>
                                        <p className="text-sm text-gray-500">
                                            {new Date(task.date).toLocaleDateString()}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(index)}
                                            className="edit_btn px-3 py-1 text-white rounded-md hover:opacity-90"
                                        >
                                            <i className="edit fa-regular fa-pen-to-square"></i>
                                        </button>
                                        <button
                                            onClick={() => handleRemove(index)}
                                            className="px-3 py-1 bg-red-500 text-white rounded-md hover:opacity-90"
                                        >
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-600">No tasks available.</p>
                        )}
                    </div>
                )}

            </div>


        </div>
    );
}

export default TodoApp;