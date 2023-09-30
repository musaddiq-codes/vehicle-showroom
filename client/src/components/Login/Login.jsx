import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';
import { useState } from 'react';

const initialState = { email: '', password: '' };

const Login = () => {
  const [form, setForm] = useState(initialState);
  const [isSignup, setIsSignup] = useState(true);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const switchMode = () => {
    setForm(initialState);
    setIsSignup((prevIsSignup) => !prevIsSignup);
    // setShowPassword(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(form, navigation));
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className='bg-blue-400 w-3/6 '>

      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input type="email" name='email' onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name='password' onChange={handleChange} />
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
        <button onClick={switchMode}>
          {isSignup ? <NavLink to='/signup'>'Already have an account? Sign Up'</NavLink> : <NavLink>Don't have an account? Sign In</NavLink>}
        </button>
      </form>
    </div>
  )
}

export default Login