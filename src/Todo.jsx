import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from './components/supabaseClient';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from 'react-datepicker';

function TodoApp() {
    const [todo, setTodo] = useState('');
    const [date, setDate] = useState('');
    const [tasks, setTasks] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [userEmail, setUserEmail] = useState('');
    // const [userName, setUserName] = useState('');
    const [priority, setPriority] = useState('medium');
    const [coins, setCoins] = useState(0);

    useEffect(() => {
        const fetchUserData = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('supabaseUser'));

            if (loggedInUser) {
                setUserEmail(loggedInUser.email);

                setCoins(Number(localStorage.getItem('userCoins')) || 0);

                // Fetch the latest coin balance from Supabase
                const { data: userData, error: userError } = await supabase
                    .from('users')
                    .select('coins')
                    .eq('user_email', loggedInUser.email)
                    .single();

                if (!userError) {
                    const updatedCoins = userData?.coins || 0;
                    setCoins(updatedCoins); // Update state with correct coins
                    localStorage.setItem('userCoins', updatedCoins.toString()); // Store in localStorage
                } else {
                    // console.error('Error fetching coins:', userError.message);
                }

                // Fetch tasks
                const { data: tasksFromDB, error: taskError } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('user_email', loggedInUser.email);

                if (!taskError) {
                    setTasks(tasksFromDB || []);
                } else {
                    console.error('Error fetching tasks:', taskError.message);
                }
            } else {
                console.error('No logged-in user found.');
            }

            setIsLoading(false);
        };

        fetchUserData();
    }, []);



    useEffect(() => {
        const fetchUserAndTasks = async () => {
            const loggedInUser = JSON.parse(localStorage.getItem('supabaseUser'));

            if (loggedInUser) {
                // setUserName(loggedInUser.user_metadata?.firstName);
                setUserEmail(loggedInUser.email);
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


    const handleTaskCompletion = async (taskIndex) => {
        try {
            const task = tasks[taskIndex];
            if (!task) {
                console.error("Invalid task index");
                return;
            }

            let coinBonus = 0;

            if (task.priority === "high") {
                coinBonus = 40;
            } else if (task.priority === "medium") {
                coinBonus = 20;
            } else if (task.priority === "low") {
                coinBonus = 10;
            }

            const updatedTasks = [...tasks];
            const isTaskCompleted = !task.completed; 
            updatedTasks[taskIndex].completed = isTaskCompleted;
            updatedTasks.sort((a, b) => {
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                const now = new Date(); 

            
                const dueDateA = new Date(a.dueDate);
                const dueDateB = new Date(b.dueDate);
                const isOverdueA = dueDateA < now && !a.completed;
                const isOverdueB = dueDateB < now && !b.completed;

                if (isOverdueA !== isOverdueB) {
                    return isOverdueA ? -1 : 1;
                }

                
                if (a.completed !== b.completed) {
                    return a.completed ? 1 : -1;
                }

                return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            setTasks(updatedTasks);

            
            const { error: updateError } = await supabase
                .from("tasks")
                .update({ completed: isTaskCompleted })
                .eq("id", task.id);

            if (updateError) {
                console.error("Error updating task completion:", updateError.message);
                return;
            }

          
            const { data: userData, error: coinsError } = await supabase
                .from("users")
                .select("coins")
                .eq("user_email", userEmail);

            console.log("Fetched user data:", userData, "Error:", coinsError);

            if (coinsError) {
                console.error("Error fetching coins:", coinsError.message);
                return;
            }

      
            if (!userData || userData.length === 0) {
                console.warn("User not found, inserting default user with 0 coins.");
                const { error: insertError } = await supabase
                    .from("users")
                    .insert([{ user_email: userEmail, coins: 0 }]);

                if (insertError) {
                    console.error("Error inserting new user:", insertError.message);
                    return;
                }
            }

            let newCoins = userData[0]?.coins || 0; 

            if (isTaskCompleted) {
                newCoins += coinBonus;
                console.log(`✅ Task completed! New coin balance: ${newCoins}`);
                alert(`🎉 You have earned ${coinBonus} coins!`);
            } else {
                newCoins -= coinBonus;
                if (newCoins < 0) newCoins = 0; 
                console.log(`❌ Task unchecked! New coin balance: ${newCoins}`);
                alert(`⚠️ You have lost ${coinBonus} coins.`);
            }

            const { error: coinsUpdateError } = await supabase
                .from("users")
                .update({ coins: newCoins })
                .eq("user_email", userEmail);

            if (coinsUpdateError) {
                console.error("Error updating coins in Supabase:", coinsUpdateError.message);
                return;
            }

            localStorage.setItem("userCoins", newCoins.toString());
            setCoins(newCoins);

        } catch (error) {
            console.error("Unexpected error:", error);
        }
    };



    const handleAddTask = async (e) => {
        e.preventDefault();

        if (!todo || !date) {
            alert('Task & Date are required!');
            return;
        }

        let newTasks = [...tasks];

        if (todo && date) {
            if (editIndex !== null) {
                const updatedTask = { ...tasks[editIndex], text: todo, date, priority };


                const { error } = await supabase
                    .from('tasks')
                    .update({ text: todo, date, priority })
                    .eq('id', tasks[editIndex].id);

                if (error) {
                    console.error('Error updating task:', error.message);
                } else {
                    newTasks[editIndex] = updatedTask;
                    setEditIndex(null);
                    alert('Task updated successfully');
                }
            } else {
                const newTask = { text: todo, date, user_email: userEmail, priority };


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
            setPriority('medium');
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
        setPriority(tasks[index].priority);
    };

    // Sorting tasks by priority (High → Medium → Low)
    const sortedTasks = [...tasks].sort((a, b) => {
        const priorityOrder = { high: 1, medium: 2, low: 3 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

    return (

        <div className='box1 d-flex align-items-center'>
            <div className='container'>

                <div className="sign-up-wrapper1 mx-auto mt-2 p-6 max-w-md shadow-2xl rounded-lg">
                    <div
                        className="logout"
                        onClick={async () => {
                            localStorage.removeItem('supabaseUser');
                            localStorage.removeItem('userCoins');

                            setCoins(0);

                            alert('You have logged out successfully');
                        }}
                    >
                        <Link to="/login">
                            <img className='ml-auto' src="./images/power-off.png" alt="Logout" width={30} />
                        </Link>
                    </div>


                    <h1 className="welcome text-3xl font-bold text-center text-white mb-6">
                        Welcome, {userEmail.split('@')[0]}!
                    </h1>

                    <div className='task_data mx-auto col-12 col-md-1 col-lg-11'>

                        <div className="mb-4 flex flex-col gap-4 text-center">
                            <input
                                value={todo}
                                onChange={(e) => setTodo(e.target.value)}
                                className="btn2  w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500"
                                type="text"
                                placeholder="Enter your task"
                            />
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                className="btn2 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500"
                                placeholderText="Select your date"
                                dateFormat="yyyy-MM-dd"
                            />

                            <label className='text-white text-left lh-1' htmlFor="">How to prioritize your task?</label>
                            <select value={priority} onChange={(e) => setPriority(e.target.value)}
                                className="btn2 w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-black-500">
                                <option value="high">🔥 Important</option>
                                <option value="medium">⭐ Minor Important</option>
                                <option value="low">✅ Not Important</option>
                            </select>



                            <button
                                onClick={handleAddTask}
                                className={`btn2 w-full py-2 text-white rounded-md ${editIndex !== null ? 'add' : 'add'
                                    } hover:opacity-90`}
                            >
                                {editIndex !== null ? 'Update Task' : 'Add Task'}
                            </button>


                        </div>

                        {isLoading ? (
                            <img className='reload' src="./images/dbl_load2.svg" alt="reload" width={50} />
                        ) : (
                            <div className="btn2 data space-y-4">
                                <h3 className="text-center text-white text-xl font-bold">💰 Coins: {coins}</h3>

                                {tasks.length > 0 ? (

                                    tasks.map((task, index) => (
                                        <div
                                            key={task.id}
                                            className={`task ${task.completed ? 'completed' : ''} ${new Date(task.date) < new Date() && !task.completed ? 'overdue' : ''}`}
                                        >
                                            <div>
                                                <div className='flex gap-4'>
                                                    <input
                                                        className='checkbox'
                                                        type="checkbox"
                                                        checked={task.completed}
                                                        onChange={() => handleTaskCompletion(index)}
                                                    />
                                                    <p className='text-white'>
                                                        {task.text} - {new Date(task.date).toLocaleDateString()}
                                                        {new Date(task.date) < new Date() && !task.completed && <span className="warning"> ⚠️ Overdue!</span>}
                                                    </p>
                                                </div>

                                                <div className='task_feature'>
                                                    <span className={`priority-tag ${task.priority}`}>
                                                        {task.priority === 'high' ? '🔥 Important' : task.priority === 'medium' ? '⭐ Minor Important' : '✅ Not Important'}
                                                    </span>
                                                    <div className='flex gap-4'>
                                                        <button onClick={() => handleEdit(index)}>
                                                            <i className="text-white edit fa-regular fa-pen-to-square"></i>
                                                        </button>
                                                        <button onClick={() => handleRemove(index)}>
                                                            <i className="text-white trash fa-solid fa-trash"></i>
                                                        </button>
                                                    </div>
                                                </div>
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
        </div>
        </div >
    );
}

export default TodoApp;