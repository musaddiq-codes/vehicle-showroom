import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { signup } from '../../actions/auth';
import { useState } from 'react';

const initialState = { firstName: '', lastName: '', email: '', password: '' };

const SignUp = () => {
  const [form, setForm] = useState(initialState);
  const dispatch = useDispatch();
  const navigation = useNavigate();

 
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = form;
    if (firstName && lastName && email && password) {
      // Call your signup function here
      console.log('Form submitted:', form);
      dispatch(signup(form, navigation));
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
        <div>
          <label>first name</label>
          <input type="firstname" name='firstName' value={form.firstName} onChange={handleChange} />
        </div>
        <div>
          <label>last name</label>
          <input type="lastname" name='lastName' value={form.lastName} onChange={handleChange} />
        </div>
        <button type="submit" >Submit</button>
        <NavLink to='/login'>'Already have an account? Sign in'</NavLink>
      </form>
    </div>
  )
}

export default SignUp