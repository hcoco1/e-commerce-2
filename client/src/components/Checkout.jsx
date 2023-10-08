import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const CheckoutContainer = styled.div`
  font-family: Arial, sans-serif;
  width: 300px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  padding: 15px;
  margin: 20px auto;
  background-color: #fff;
`;

const Header = styled.div`
  background-color: #1877f2;
  color: #fff;
  padding: 10px 15px;
  border-radius: 5px 5px 0 0;
  font-weight: bold;
`;

const Message = styled.p`
  margin-top: 10px;
  color: #333;
`;

export default function Checkout() {
  return (
    <CheckoutContainer>
      <Header>Notification</Header>
      <Message>
        The checkout feature is still in progress. Thank you for your patience!
        Your order was saved in our database and you can check it clicking on <Link to="/orders">Orders</Link>
      </Message>
    </CheckoutContainer>
  );
}
