import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaHandPeace } from 'react-icons/fa';
import api from './api';


function NavigationBar({onLogout}) {
  

  function handleLogout() {
    // Use the api module to logout
    api.logout()
       .then(() => onLogout())
       .catch(err => {
           console.error("Error during logout:", err);
       });
  }


  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
          
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/" className="nav-link">
                  <FaHome /> Home
                </Link>
              </li>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/products" className="nav-link">
                  <FaHandPeace /> Produtcs
                </Link>
              </li>

              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/orders" className="nav-link">
                  <FaHandPeace /> Orders
                </Link>
              </li>

              <li className="nav-item" style={{ marginRight: '10px' }}>
                <Link to="/login" className="nav-link">
                  <FaSignInAlt /> Sign In
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  <FaSignOutAlt /> Sign Up
                </Link>
              </li>

              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  <FaSignOutAlt /> Profile
                </Link>
              </li>

              <li className="nav-item">
              <button onClick={handleLogout}>Sign Out</button>
              </li>

        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;
