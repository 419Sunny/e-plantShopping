import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  increaseQuantity,
  decreaseQuantity,
  removeItemFromCart,
} from '../features/cart/cartSlice';

const Cart = () => {
  const dispatch = useDispatch();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);
  
  // Function to calculate total cost for each item
  const calculateItemTotal = (item) => {
    return item.price * item.quantity;
  };
  
  // Function to calculate total cart amount (explicit calculation)
  const calculateTotalCartAmount = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };
  
  // Handle increase quantity
  const handleIncrease = (id) => {
    dispatch(increaseQuantity(id));
  };
  
  // Handle decrease quantity
  const handleDecrease = (id) => {
    dispatch(decreaseQuantity(id));
  };
  
  // Handle delete item
  const handleDelete = (id) => {
    dispatch(removeItemFromCart(id));
  };
  
  // Handle checkout button click
  const handleCheckout = () => {
    alert('Coming Soon! Checkout functionality will be available in the next update.');
  };
  
  // Display empty cart message if no items
  if (items.length === 0) {
    return (
      <div className="shopping-cart">
        <h2>Your Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/products">
            <button className="continue-shopping-btn">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="shopping-cart">
      <h2>Your Shopping Cart</h2>
      
      {/* Cart Summary Section - Shows total number and total amount */}
      <div className="cart-summary">
        <div className="total-items">
          <strong>Total Number of Plants:</strong> {totalQuantity} plant{totalQuantity !== 1 ? 's' : ''}
        </div>
        <div className="total-amount">
          <strong>Total Cart Amount:</strong> ${calculateTotalCartAmount().toFixed(2)}
        </div>
      </div>
      
      <div className="cart-items">
        {items.map(item => {
          // Calculate total cost for this specific plant
          const itemTotal = calculateItemTotal(item);
          
          return (
            <div key={item.id} className="cart-item">
              {/* Display thumbnail for each plant type */}
              <img 
                src={item.image} 
                alt={item.name}
                className="cart-item-image"
                onError={(e) => {
                  e.target.src = '/images/placeholder.jpg';
                }}
              />
              
              <div className="cart-item-details">
                {/* Display plant name */}
                <div className="cart-item-name">{item.name}</div>
                {/* Display unit price */}
                <div className="cart-item-unit-price">
                  Unit Price: ${item.price.toFixed(2)}
                </div>
                {/* Display total cost for this plant type (quantity × unit price) */}
                <div className="cart-item-total">
                  <strong>Total for {item.name}:</strong> ${itemTotal.toFixed(2)}
                </div>
              </div>
              
              {/* Increase and decrease buttons */}
              <div className="cart-item-quantity">
                {/* Decrease button - decrements quantity */}
                <button
                  className="quantity-btn"
                  onClick={() => handleDecrease(item.id)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="item-quantity" style={{ minWidth: '30px', textAlign: 'center' }}>
                  {item.quantity}
                </span>
                {/* Increase button - increments quantity */}
                <button
                  className="quantity-btn"
                  onClick={() => handleIncrease(item.id)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
              
              {/* Delete button for each item */}
              <button
                className="delete-btn"
                onClick={() => handleDelete(item.id)}
                aria-label="Remove item"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
      
      {/* Cart Actions Section */}
      <div className="cart-actions">
        {/* Continue shopping button linking back to product listing page */}
        <Link to="/products">
          <button className="continue-shopping-btn">
            Continue Shopping
          </button>
        </Link>
        {/* Checkout button showing "Coming Soon" message */}
        <button className="checkout-btn" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
