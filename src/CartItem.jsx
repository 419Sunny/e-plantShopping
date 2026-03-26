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
      
      {/* Show total number of plants in the cart */}
      <div className="cart-summary">
        <div>
          <strong>Total Items:</strong> {totalQuantity} plant{totalQuantity !== 1 ? 's' : ''}
        </div>
        {/* Show total cost of all items in the cart */}
        <div>
          <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
        </div>
      </div>
      
      <div className="cart-items">
        {items.map(item => (
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
              <div className="cart-item-price">
                Unit Price: ${item.price.toFixed(2)}
              </div>
              {/* Show total cost for each plant in the cart */}
              <div>
                Subtotal: ${item.totalPrice.toFixed(2)}
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
              <span style={{ minWidth: '30px', textAlign: 'center' }}>
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
        ))}
      </div>
      
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
