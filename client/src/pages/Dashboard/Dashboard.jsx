import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import styles from './dashboard.module.css'


const Dashboard = () => {
  return (
    <div className={styles.dashboard_container}>
      <NavLink to={'/vehicles'}>
        <h1>big vehicles</h1>
      </NavLink>
      <NavLink to={'/cars'}>
        <h1>cars</h1>
      </NavLink>
    </div>
  )
}

export default Dashboard