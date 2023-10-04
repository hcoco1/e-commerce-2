import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import UserRegister from "./UserRegister";
import UserLogin from "./UserLogin";
import UserDetails from "./UserDetails";
import ProductList from "./ProductList";
import { useNavigate } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import UserOrders from "./UserOrders";
import OrderDetail from "./OrderDetail";


function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  function LogoutFunction() {
    setUser(null);
    navigate("/");
  }

  useEffect(() => {
    fetch("/check_session", {
      method: 'GET',
      credentials: 'include', // ensure cookies are sent with request
    }).then((response) => {
      if (response.ok) {
        console.log("Session is active.");
        response.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <div className="App">
      <NavBar onLogout={LogoutFunction} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/user" element={<UserDetails />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/orders/:orderId" element={<OrderDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:product_id" element={<ProductDetail />} />
        <Route path="/login" element={<UserLogin onLogin={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;



