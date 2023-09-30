import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';

const WelcomePage = () => {
  return (
    <div>
      <h1>Welcome to the Virtual Vehicle Showroom and Registration Hub!!.</h1>
      <p><strong>Please select an option below to get start:</strong></p>
      <NavLink to={'/signup'}>
        <button>  <h1>Signup</h1></button>
      </NavLink>
      <NavLink to={'/login'}>
        <button>  <h1>Login</h1></button>
      </NavLink>
    </div>
  )
}

export default WelcomePage