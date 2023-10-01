import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
// import styles from './navbar.module.css'
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as actionType from '../../constants/actionTypes';
import styles from './navbar.module.css'
import decode from 'jwt-decode';


const Navbar = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const dispatch = useDispatch();
  const history = useNavigate();
  const location = useLocation();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history('/');

    setUser(null);
  };


  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  return (
    <div className={styles.nav_div}>
      <nav className={styles.navigation}>
        <Link className={styles.logo} to="/dashboard">Logo</Link>
        {user?.result ? (
          <div className={styles.nav_list_container}>
            <div className={styles.first_div}>
              <ul className={styles.nav_list}>
                <li>
                <Link className={styles.text_deco} to="/cars">Cars</Link>
              </li>
              <li>
                <Link className={styles.text_deco} to="/vehicles">Vehicles</Link>
              </li>
              <li>
                <Link className={styles.text_deco} to="/dashboard">Dashboard</Link>
              </li>
              </ul>
            </div>
            <div className={styles.reg_list_container}>
              <img alt={user?.result.name} src={user?.result.imageUrl} />
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        ) : (
          <ul className={styles.reg_list}>
            <li>
              <Link className={styles.text_deco} to="/login">Login</Link>
            </li>
            <li>
              <Link className={styles.text_deco} to="/signup">Signup</Link>
            </li>
          </ul>
        )}
      </nav>
      <Outlet />
    </div>
  )
};

export default Navbar;