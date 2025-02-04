import React, { useEffect, useState } from 'react'
import { supabase } from './supabaseClient';
import { Link, useNavigate } from 'react-router-dom';


function Feedbackform() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedbacks, setFeedbacks] = useState([]);


    useEffect(() => {
        const savedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];
        setFeedbacks(savedFeedbacks);
    }, []);

    const saveToLocalStorage = (newFeedbacks) => {
        localStorage.setItem("feedbacks", JSON.stringify(newFeedbacks));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim() || !message.trim()) {
            alert("All fields are required!");
            return;
        }

        const newFeedback = { name, email, message };

        const updatedFeedbacks = [...feedbacks, newFeedback];
        setFeedbacks(updatedFeedbacks);
        saveToLocalStorage(updatedFeedbacks);


        const { error } = await supabase
            .from("feedbacks")
            .insert([{ name, email, message }]);

        if (error) {
            console.error("Error saving feedback:", error.message);
        } else {
            alert("Feedback submitted successfully!");
        }

        // Clear input fields
        setName('');
        setEmail('');
        setMessage('');
    };


    return (
        <div className='form '>

            <div className='container'>
                <div className='wrapper mx-auto bg-white flex justify-content-center'>
                    <div>
                        <div>
                            <div
                                className="logout"
                                onClick={() => {
                                    localStorage.removeItem('supabaseUser');

                                }}
                            >
                                <Link to="/login">
                                    <img className='log_img ml-auto bg-black rounded' src="./images/power-off.png" alt="Logout" width={30} />
                                </Link>
                            </div>
                        </div>

                        <div className='head mt-3 underline'>
                            <h2>Feedback Form</h2>
                        </div>
                        <div className='formdata'>
                            <form onSubmit={handleSubmit}>
                                <label className='fw-normal font-14 pb-1 mt-1' htmlFor="">Name</label>
                                <div>
                                    <input className='p-2 mt-1 border-1 rounded' type="text" placeholder='Enter your Name' value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <label className='fw-normal font-14 pb-1' htmlFor="">Email</label>
                                <div>
                                    <input className='p-2 mt-1 border-1 rounded' type="email" placeholder='Enter your Email' value={email}
                                        onChange={(e) => setEmail(e.target.value)}

                                    />
                                </div>
                                <label className='fw-normal font-14 pb-1' htmlFor="">Message</label>
                                <div>
                                    <textarea

                                        // placeholder="Write your message here..."
                                        rows="4"
                                        className="comment-box mt-1 border-1"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                    />
                                    {/* <input className='p-2 mt-2 border-2 rounded' type="text" placeholder='Enter message' /> */}
                                </div>
                                <div className='mt-2 mb-3'>
                                    <button className='border-2 font-bold'>Submit </button>

                                </div>
                            </form>

                          
                            <h3 className='mt-3 fs-4'>Users Feedback:</h3>
                            <ul className='mt-1'>
                                {feedbacks.length > 0 ? (
                                    feedbacks.map((feedback, index) => (
                                        <li key={index} className='p-2 border mx-auto rounded mt-1'>
                                            <span className='font-bold' >{feedback.name}</span>  ({feedback.email}): {feedback.message}
                                        </li>
                                    ))
                                ) : (
                                    <p>No feedback submitted yet.</p>
                                )}
                            </ul>



                        </div>
                    </div>

                </div>
            </div>

        </div>



    )
}

export default Feedbackform
