import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart } from '../features/cart/cartSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedItems, setAddedItems] = useState({});
  
  // Plant data organized into three categories with at least 6 unique plants
  // Actually we have 9 plants total - 3 per category
  const categories = {
    succulents: {
      title: "Succulents",
      plants: [
        {
          id: 1,
          name: "Aloe Vera",
          price: 12.99,
          image: "/images/aloe-vera.jpg",
          description: "Easy to care for, perfect for beginners"
        },
        {
          id: 2,
          name: "Jade Plant",
          price: 15.99,
          image: "/images/jade-plant.jpg",
          description: "Symbol of good luck and prosperity"
        },
        {
          id: 3,
          name: "Echeveria",
          price: 8.99,
          image: "/images/echeveria.jpg",
          description: "Beautiful rosette-shaped succulent"
        }
      ]
    },
    tropical: {
      title: "Tropical Plants",
      plants: [
        {
          id: 4,
          name: "Monstera Deliciosa",
          price: 29.99,
          image: "/images/monstera.jpg",
          description: "Beautiful split leaves, a classic favorite"
        },
        {
          id: 5,
          name: "Fiddle Leaf Fig",
          price: 34.99,
          image: "/images/fiddle-leaf.jpg",
          description: "Striking architectural plant"
        },
        {
          id: 6,
          name: "Snake Plant",
          price: 18.99,
          image: "/images/snake-plant.jpg",
          description: "Nearly indestructible, perfect for any space"
        }
      ]
    },
    flowering: {
      title: "Flowering Plants",
      plants: [
        {
          id: 7,
          name: "Peace Lily",
          price: 19.99,
          image: "/images/peace-lily.jpg",
          description: "Elegant white flowers, air-purifying"
        },
        {
          id: 8,
          name: "Orchid",
          price: 24.99,
          image: "/images/orchid.jpg",
          description: "Exotic and beautiful blooms"
        },
        {
          id: 9,
          name: "Anthurium",
          price: 22.99,
          image: "/images/anthurium.jpg",
          description: "Heart-shaped flowers, long-lasting blooms"
        }
      ]
    }
  };
  
  // Function to handle adding item to cart
  const handleAddToCart = (plant) => {
    // Dispatch action to add product to shopping cart
    dispatch(addItemToCart({
      id: plant.id,
      name: plant.name,
      price: plant.price,
      image: plant.image,
    }));
    
    // Disable the button after product is added
    setAddedItems(prev => ({
      ...prev,
      [plant.id]: true
    }));
  };
  
  // Function to check if item is already in cart
  const isItemInCart = (plantId) => {
    return cartItems.some(item => item.id === plantId) || addedItems[plantId];
  };
  
  return (
    <div className="product-listing">
      {/* Display plants grouped into at least three categories */}
      {Object.entries(categories).map(([categoryKey, category]) => (
        <div key={categoryKey} className="category">
          <h2>{category.title}</h2>
          <div className="products-grid">
            {/* Display at least six unique houseplants (we have 9 total) */}
            {category.plants.map(plant => (
              <div key={plant.id} className="product-card">
                {/* Thumbnail image */}
                <img 
                  src={plant.image} 
                  alt={plant.name}
                  className="product-image"
                  onError={(e) => {
                    e.target.src = '/images/placeholder.jpg';
                  }}
                />
                <div className="product-info">
                  {/* Plant name */}
                  <h3 className="product-name">{plant.name}</h3>
                  {/* Price */}
                  <p className="product-price">${plant.price.toFixed(2)}</p>
                  <p className="product-description">{plant.description}</p>
                  {/* Add to Cart button */}
                  <button
                    className="add-to-cart-btn"
                    onClick={() => handleAddToCart(plant)}
                    disabled={isItemInCart(plant.id)}
                  >
                    {isItemInCart(plant.id) ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
