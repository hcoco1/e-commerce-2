import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaListOl, FaIcons, FaShoppingCart } from 'react-icons/fa';
import api from './api';
import styled from 'styled-components'
import UserContext from './UserContext';

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

function NavigationBar({ onLogout }) {
  const { user } = useContext(UserContext);

  function handleLogout() {
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
              <FaIcons /> Products
            </Link>
          </li>
          <li className="nav-item" style={{ marginRight: '10px' }}>
            <Link to="/orders" className="nav-link">
              <FaListOl /> Orders
            </Link>
          </li>
          {!user && (
            <>
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
            </>
          )}
          <li className="nav-item">
            <Link to="/cart" className="nav-link">
              <FaShoppingCart /> Cart
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <Link to="/user" className="nav-link">
                <FaSignOutAlt /> Hi, {user.username}
              </Link>
            ) : (
              <Link to="/user" className="nav-link">
                <FaSignOutAlt /> Profile
              </Link>
            )}
          </li>
          {user && (
            <li className="nav-item">
              <Button $primary onClick={handleLogout}>Sign Out</Button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;

