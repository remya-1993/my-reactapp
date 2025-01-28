
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from './supabaseClient';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);

    const signup = () => {
        navigate('/');
    };


    const handleSubmit = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            alert(error.message);
        } else {
            alert('Login successful!');

            localStorage.setItem('supabaseUser', JSON.stringify(data.user));

            navigate('/todo');
        }
    };

    return (
        <div className='login max-w-md shadow-2xl rounded-lg'>

            <div className='log_data'>
                
                <div className='userdata'>
                <h2 className='text-2xl font-bold'>Login</h2>
                    <input
                        className='btn1 p-3 mt-5 rounded'
                        type="email"
                        placeholder="Enter Your Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        className='btn1 p-3 mt-5 rounded'
                        type="password"
                        placeholder="Enter Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <br />

                    <button
                        className='btn1 p-3 rounded bg-white text-black text-lg font-bold'
                        onClick=
                        {handleSubmit}
                    >
                        Login
                    </button>
                    <br />

                    <p className='flex gap-4'>Don't have an account?

                        <button
                            className='text-black-500 font-bold'
                            onClick={signup}
                        >
                            Sign UP
                        </button>
                    </p>

                </div>



            </div>
        </div>
    );
}

export default Login;