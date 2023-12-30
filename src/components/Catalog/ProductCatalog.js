// src/components/ProductCatalog.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './productcatlog.css'; // Corrected the CSS file name
const ProductCatalog = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort products based on selected sorting option
  const sortedProducts = () => {
    if (sortBy === 'price-low-to-high') {
      return [...filteredProducts].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high-to-low') {
      return [...filteredProducts].sort((a, b) => b.price - a.price);
    } else {
      return filteredProducts;
    }
  };

  return (
    <div className='product-cat'>
      <h2>Acme</h2>
      <div className="search-and-sort">
        <input
          type="text"
          placeholder="Search by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort by</option>
          <option value="price-low-to-high">Price Low to High</option>
          <option value="price-high-to-low">Price High to Low</option>
        </select>
      </div>
      <div className="product-list">
        {sortedProducts().map(product => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <button className='product-cat-btn' onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
