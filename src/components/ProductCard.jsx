import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import '../App.css';
import ProductModal from './Modal';
import { useCart } from './CartContext';

const ProductCard = ({ product, category, openModal,}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token")

  const handleViewDetails = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const {cartState, dispatch} = useCart();

  const isInCart = cartState.items.some((item) => item.id === product.id);

  const handleButtonClick = () => {
    if (!isLoggedIn) {
        alert("Please log in to access your cart")
    }
    else if (isInCart) {
        navigate("/Cart")
    } else {
        addToCart()
    }
  };

  const addToCart = () => {
      const addedProduct = {
          id: product.id,
          image: product.image,
          title: product.title,
          price: product.price,
          quantity: 1,
      };
      console.log('adding to cart:', addedProduct)

      dispatch({type: 'ADD_TO_CART', payload: addedProduct });


  }
  return (
    <>
      <div className="product-card">
        <img src={product.image} alt={product.title} className="product-image" />
        <div className='pro-details'>
        <h3 className="pro-title">{product.title}</h3>
        <p className="pro-price">Price: ${product.price}</p>
    <div className='add-details'>
        <button className='add-button' onClick={handleButtonClick}>
            {isInCart ? 'Go to Cart' : 'Add to Cart'}
        </button>
        
        <button className="modal-button" onClick={handleViewDetails}>
          View Details
        </button>
        </div>
      </div>
      </div>

      <ProductModal isOpen={isModalOpen} closeModal={closeModal} product={product} />
    </>
  );
};

export default ProductCard;