import { createSlice } from '@reduxjs/toolkit';

// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('paradiseNurseryCart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    items: [],
    totalQuantity: 0,
    totalAmount: 0,
  };
};

// Helper function to save cart to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    localStorage.setItem('paradiseNurseryCart', JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Initial state with localStorage persistence
const initialState = loadCartFromLocalStorage();

// Create cart slice with reducers
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 1. addItem() - Adds a product to the shopping cart
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.items.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        // If item doesn't exist in cart, add it with quantity 1
        state.items.push({
          id: newItem.id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
        state.totalQuantity++;
      } else {
        // If item exists, increase quantity
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity++;
      }
      
      // Recalculate total amount
      state.totalAmount = state.items.reduce(
        (total, item) => total + item.totalPrice,
        0
      );
      
      // Save to localStorage
      saveCartToLocalStorage(state);
    },
    
    // 2. removeItem() - Removes a product from the shopping cart
    removeItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        // Subtract the quantity of removed item from total quantity
        state.totalQuantity -= existingItem.quantity;
        // Filter out the item from items array
        state.items = state.items.filter(item => item.id !== id);
        // Recalculate total amount
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
      
      // Save to localStorage
      saveCartToLocalStorage(state);
    },
    
    // 3. updateQuantity() - Updates the quantity of a product in the cart
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && quantity > 0) {
        // Calculate the difference in quantity
        const quantityDifference = quantity - existingItem.quantity;
        
        // Update quantity and total price
        existingItem.quantity = quantity;
        existingItem.totalPrice = existingItem.price * quantity;
        
        // Update total quantity
        state.totalQuantity += quantityDifference;
        
        // Recalculate total amount
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      } else if (existingItem && quantity === 0) {
        // If quantity is 0, remove the item
        state.totalQuantity -= existingItem.quantity;
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
      
      // Save to localStorage
      saveCartToLocalStorage(state);
    },
    
    // Additional helper reducers (not required but useful)
    increaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem) {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity++;
        state.totalAmount += existingItem.price;
      }
      
      saveCartToLocalStorage(state);
    },
    
    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const existingItem = state.items.find(item => item.id === id);
      
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        state.totalQuantity--;
        state.totalAmount -= existingItem.price;
      } else if (existingItem && existingItem.quantity === 1) {
        state.totalQuantity--;
        state.items = state.items.filter(item => item.id !== id);
        state.totalAmount = state.items.reduce(
          (total, item) => total + item.totalPrice,
          0
        );
      }
      
      saveCartToLocalStorage(state);
    },
    
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
      saveCartToLocalStorage(state);
    },
  },
});

// Export all actions
export const {
  addItem,
  removeItem,
  updateQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

// Export the reducer as default
export default cartSlice.reducer;
