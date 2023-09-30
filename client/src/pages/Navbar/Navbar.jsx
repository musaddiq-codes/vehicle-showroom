import { Outlet, Link } from "react-router-dom";
// import styles from './navbar.module.css'

const Navbar = () => {
  return (
    <div className="w-full bg-pink-200 h-full">
      <nav className='flex justify-between'>
        <ul >
          <li><Link to="/">Logo</Link></li>
        </ul>
        <ul className='flex justify-around w-52 h-16 text-center'>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
};

export default Navbar;