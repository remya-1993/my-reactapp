
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
        <div className='box d-flex align-items-center'>

            <div className='container'>

                <div className='sign-up-wrapper ms-auto'>

                    <div className='row align-items-center h-100"'>
                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='p-4 p-lg-5'>
                                {/* <h1 className='p-lg-5 p-md-4 p-4 text-white'>Login</h1> */}
                                <h2 className="fs-4 font-normal lh-3 text-white">Secure your journey with a simple login.</h2>
                                <div className=' text-danger font-bold mt-3 fs-2'>Welcome back!..</div>
                            </div>

                        </div>

                        <div className='col-12 col-md-6 col-lg-6'>
                            <div className='userdata p-4 p-lg-5 h-100 d-flex flex-column'>
                                <label className='fw-medium font-14 pb-1' htmlFor="">Email</label>
                                <div>
                                    <input
                                        className='btn1 p-3 mt-2 rounded'
                                        type="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <label className='fw-medium font-14 pb-1' htmlFor="">Password</label>
                                <div>
                                    <input
                                        className='btn1 p-3 mt-2 rounded'
                                        type="password"
                                        placeholder="Enter Your Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <button
                                    className='w-100 border-0 mt-4 text-white fs-6 fw-medium'
                                    onClick=
                                    {handleSubmit}
                                >
                                    Login
                                </button>
                                <br />

                                <p className='fs-6 fw-light text-center'>Don't have an account?

                                    <a className='text-dark fw-bold pointer ms-3'
                                        onClick={signup}
                                    >
                                        Sign Up
                                    </a>

                                    {/* <button
                                        className='text-black-500 font-bold'
                                        onClick={signup}
                                    >
                                        Sign UP
                                    </button> */}
                                </p>
                            </div>


                        </div>


                    </div>


                </div>



            </div>
        </div >
    );
}

export default Login;