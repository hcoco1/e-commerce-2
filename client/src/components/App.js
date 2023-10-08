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
import NoMatch from "./NoMatch";
import ProtectedRoute from "./ProtectedRoute";
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
        <Route path="/login" element={<UserLogin onLogin={setUser} />} />
        <Route path="/user" element={<ProtectedRoute fallback="/login">
          <UserDetails />
        </ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute fallback="/login">
          <UserOrders />
        </ProtectedRoute>} />
        <Route path="/orders/:orderId" element={<ProtectedRoute fallback="/login">
          <OrderDetail />
        </ProtectedRoute>} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:product_id" element={<ProtectedRoute fallback="/login">
          <ProductDetail />
        </ProtectedRoute>} />
        <Route path="/cart" element={<ShoppingCart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>

  );
}

export default App;




