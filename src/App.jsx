import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import './App.css';

// Landing Page Component with company name and Get Started button
const LandingPage = () => {
  return (
    <div className="landing-page">
      <div className="landing-overlay">
        <div className="landing-content">
          {/* Company name */}
          <h1>🌿 Paradise Nursery</h1>
          
          {/* Company description paragraph */}
          <p>
            Welcome to Paradise Nursery, your premier destination for beautiful, healthy houseplants. 
            Founded in 2020, we've been on a mission to bring nature's beauty into homes and offices 
            across the country.
          </p>
          <p>
            We believe that plants are more than just decorations—they're living companions that purify 
            the air, reduce stress, and bring joy to everyday life. Our carefully curated collection 
            features a diverse range of houseplants, from easy-care succulents to rare tropical specimens.
          </p>
          <p>
            Every plant in our nursery is sourced from sustainable growers who share our commitment to 
            quality and environmental stewardship. Whether you're a seasoned plant parent or just 
            starting your green journey, our team is here to help you find the perfect plant for your space.
          </p>
          
          {/* Get Started button linking to product page */}
          <a href="/products">
            <button className="get-started-btn">Get Started</button>
          </a>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Routes>
            {/* Landing page route */}
            <Route path="/" element={
              <>
                <Header />
                <LandingPage />
              </>
            } />
            {/* Product listing page route */}
            <Route path="/products" element={
              <>
                <Header />
                <ProductList />
              </>
            } />
            {/* Shopping cart page route */}
            <Route path="/cart" element={
              <>
                <Header />
                <Cart />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
