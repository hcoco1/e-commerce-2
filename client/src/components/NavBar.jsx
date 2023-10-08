import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaSignInAlt, FaSignOutAlt, FaListOl, FaIcons, FaShoppingCart } from 'react-icons/fa';
import api from './api';
import styled from 'styled-components'
import UserContext from './UserContext';
import './NavBar.css'

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;
`;

function NavigationBar({ onLogout }) {
  const { user, logout } = useContext(UserContext);

  function handleLogout() {
    api.logout()
      .then(() => {
        logout();
        onLogout();
      })
      .catch(err => {
        console.error("Error during logout:", err);
      });
  }

  return (
    <nav className="navbar navbar-dark bg-dark">
      <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
        <ul className="navbar-nav" style={{ flexDirection: 'row', alignItems: 'center', listStyleType: 'none' }}>
          <li className="nav-item" style={{ marginRight: '10px' }}>

            <NavLink
              to="."
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaHome /> Home
            </NavLink>
          </li>

          <li className="nav-item" style={{ marginRight: '10px' }}>
            <NavLink
              to="/products"
              style={({ isActive, isPending }) => {
                return {
                  fontWeight: isActive ? "bold" : "",
                  color: isPending ? "red" : "white",
                };
              }}

            >
              <FaIcons /> Products
            </NavLink>
          </li>

          {user && (
            <>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <NavLink
                  to="/orders"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaListOl /> Orders
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/cart"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaShoppingCart /> Cart
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/user"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Hi, {user.username}
                </NavLink>
              </li>

              <li className="nav-item">
                <Button $primary onClick={handleLogout}>Sign Out</Button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li className="nav-item" style={{ marginRight: '10px' }}>
                <NavLink
                  to="/login"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignInAlt /> Sign In
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink
                  to="/register"
                  style={({ isActive, isPending }) => {
                    return {
                      fontWeight: isActive ? "bold" : "",
                      color: isPending ? "red" : "white",
                    };
                  }}

                >
                  <FaSignOutAlt /> Sign Up
                </NavLink>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default NavigationBar;


