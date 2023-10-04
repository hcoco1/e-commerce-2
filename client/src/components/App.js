import React, { useContext } from "react";
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
import ShoppingCart from "./ShoppingCart";
import Checkout from "./Checkout";


import UserContext from './UserContext';




function App() {
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function LogoutFunction() {
    setUser(null);
    navigate("/");
  }

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
          <Route path="/cart" element={<ShoppingCart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
  
  );
}

export default App;




