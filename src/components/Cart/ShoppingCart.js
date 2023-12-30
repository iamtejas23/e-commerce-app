// src/components/ShoppingCart.js
import React from 'react';
import './shoppingcart.css';

const ShoppingCart = ({ cart, removeFromCart }) => {
  
  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart-list">
        {cart.map(item => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} />
            <h3>{item.title}</h3>
            <p>${item.price}</p>
            <button onClick={() => removeFromCart(item)}>Remove</button>
          </div>
        ))}
      </div>
      <p className="total">Total: ${cart.reduce((total, item) => total + item.price, 0)}</p>
    </div>
  );
};

export default ShoppingCart;
