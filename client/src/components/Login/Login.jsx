import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useState } from 'react';

const initialState = { email: '', password: '' };

const Login = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    if (email && password) {
      // Call your signup function here
      console.log('Form submitted:', form);
      dispatch(login(form, navigation));
    } else {
      alert('Please fill in all the details.');
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div>

      <form onSubmit={handleSubmit}>
        <div>
          <label>email</label>
          <input type="email" name='email' value={form.email} onChange={handleChange} />
        </div>
        <div>
          <label>Password</label>
          <input type="password" name='password' value={form.password} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
        <NavLink to='/signup'>Don't an account? Sign Up</NavLink>
      </form>
    </div>
  )
}

export default Login