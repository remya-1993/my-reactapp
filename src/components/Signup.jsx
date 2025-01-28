
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';
import Login from './Login';

function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        phoneNumber: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const Login = () => {
        navigate('/login');
    };


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
                    phone_number: phoneNumber,
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

        <div className="box mx-auto p-6 max-w-md bg-white shadow-2xl rounded-lg mt-10">
            <h2 className="text-xl font-bold">Stay organized and get things done — <span className='text-red-900'>sign up</span> to start your journey today!</h2>


            <div className='details mt-5'>
                <div className='img'>
                    <img className='rounded blur-image' src="https://plus.unsplash.com/premium_photo-1661420059005-46f59e62e478?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8c2lnbiUyMHVwfGVufDB8fDB8fHww" alt="" width={900} />
                </div>

                <div>

                    <input
                        className="btn p-3 mt-5 rounded"
                        type="text"
                        id="firstName"
                        placeholder="Enter Your Name"
                        value={formData.firstName}
                        onChange={handleChange}
                    />

                    <input
                        className="btn p-3 mt-5 rounded"
                        type="text"
                        id="phoneNumber"
                        placeholder="Enter phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                    />

                    <input
                        className="btn p-3 mt-5 rounded"
                        type="email"
                        id="email"
                        placeholder="Enter Your Email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        className="btn p-3 mt-5 rounded"
                        type="password"
                        id="password"
                        placeholder="Enter Your Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <br />
                    <br />
                    <button
                        className="btn p-3 rounded bg-white text-black text-lg font-bold"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                    <br />
                    <br />
                    <button
                        className="btn mb-2 p-3 rounded bg-white text-black text-lg font-bold"
                        onClick={Login}
                    >
                        Login
                    </button>
                </div>


            </div>
        </div>



    );
}

export default Signup;