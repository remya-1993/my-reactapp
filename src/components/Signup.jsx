
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const [feedbacks, setFeedbacks] = useState([]); // Store feedback
    const navigate = useNavigate();
    const [totalUsers, setTotalUsers] = useState(0);

    useEffect(() => {
        const fetchUsersCount = async () => {
            const { data, error } = await supabase
                .from("todo") // Table where user data is stored
                .select("id", { count: "exact" }); // Count users

            if (error) {
                console.error("Error fetching user count:", error);
            } else {
                setTotalUsers(data.length);
            }
        };

        fetchUsersCount();
    }, []);


    useEffect(() => {
        const fetchFeedback = async () => {
            const { data, error } = await supabase
                .from('feedbacks')
                .select('*'); // Fetch all feedback

            if (error) {
                console.error("Error fetching feedback:", error.message);
            } else {
                setFeedbacks(data);
            }
        };

        fetchFeedback();
    }, []);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { firstName, phoneNumber, email, password } = formData;

        const { data, error: signUpError } = await supabase.auth.signUp({
            email,
            password,
        });

        if (signUpError) {
            alert(signUpError.message);
            return;
        }

        const user = data.user;
        if (user) {
            const { error: insertError } = await supabase.from('todo').insert([
                {
                    id: user.id,
                    first_name: firstName,
                    // phone_number: phoneNumber,
                    email,
                },
            ]);

            if (insertError) {
                alert(insertError.message);
                return;
            }

            alert('Signup successful!');
            navigate('/login');
        } else {
            alert('An unexpected error occurred.');
        }
    };

    return (
        <div className="box d-flex align-items-center">
            <div className="container">
                <div className='sign-up-wrapper ms-auto'>
                    <div className="row h-100">
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className='p-lg-5 p-md-4 p-4 text-white'>
                                <h1 className='fs-2 font-bold pb-2'>Welcome to <div className='text-danger'>TO DO !..</div></h1>
                                <h2 className="fs-5 font-normal lh-2">
                                    Stay organized and get things done — <span className='text-danger'>sign up</span> to start your journey today!
                                </h2>

                                <div>
                                    <h3 className="mt-4 fs-6 font-medium underline">User Feedback:</h3>
                                    <ul className="mt-1 feedback-list p-0 pe-3">
                                        {feedbacks.length > 0 ? (
                                            feedbacks.map((feedback, index) => (
                                                <li key={index} className="list px-2 py-1 rounded mt-1">
                                                    <strong>{feedback.name}</strong> : {feedback.message}
                                                </li>
                                            ))
                                        ) : (
                                            <p>No feedback submitted yet.</p>
                                        )}
                                    </ul>
                                </div>

                                <div className="signup-container mt-4">
                                  
                                  <p className='text-danger'>Total TO DO Users: {totalUsers}</p>
                                  <form>{}</form>
                              </div>

                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className='userdata p-4 p-lg-5 h-100 d-flex justify-content-center flex-column'>

                                <label className='fw-medium font-14 pb-1'>Name</label>
                                <input type="text" id="firstName" placeholder="Enter Your Name" value={formData.firstName} onChange={handleChange} />

                                <label className='fw-medium font-14 pb-1'>Email</label>
                                <input type="email" id="email" placeholder="Enter Your Email" value={formData.email} onChange={handleChange} />

                                <label className='fw-medium font-14 pb-1'>Password</label>
                                <input type="password" id="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} />

                                <button className="w-100 border-0 mt-4 text-white fs-6 fw-medium" onClick={handleSubmit}>
                                    Sign Up
                                </button>

                                <br />
                                <p className='fs-6 fw-light text-center'>
                                    Already have an account?
                                    <a className='text-dark fw-bold pointer ms-3' onClick={() => navigate('/login')}>
                                        Login
                                    </a>
                                </p>
                                <p className='fs-6 fw-light text-center'>
                                    Write your suggestions! <a className='text-dark fw-bold pointer ms-3' href="" onClick={() => navigate("/feedbackform")}>Feedback</a>
                                </p>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signup;