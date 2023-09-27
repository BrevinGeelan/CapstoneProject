import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const ModalCard = ({product, closeModal}) => {
    const navigate = useNavigate();
    const { cartState, dispatch } = useCart();
    const isLoggedIn = localStorage.getItem("token");


    const isInCart = cartState.items.some((item) => item.id === product.id);

    const handleButtonClick = () => {
        if (!isLoggedIn) {
          alert('Please log in to access your cart');
        } else if (isInCart) {
          navigate('/Cart');
        } else {
          addToCart();
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
    
        dispatch({ type: 'ADD_TO_CART', payload: addedProduct });
      };
    
      return (
        <div className="product-card">
          <div className="product-image">
            <img src={product.image} alt={product.title} />
          </div>
          <div className="pro-details">
            <h2 className="pro-title">{product.title}</h2>
            <p className="pro-price">Price: ${product.price}</p>
            <p className="pro-desc">Description: {product.description}</p>
            <p className="pro-rating">Rating: {product.rating.rate} <FontAwesomeIcon icon={faStar}  style={{color: '#ffd708'}}/> (Count: {product.rating.count})</p>
            <div className="add-details">
            <button className="add-button" onClick={handleButtonClick}>
              {isInCart ? 'Go to Cart' : 'Add to Cart'}
            </button>
            <button className="modal-button" onClick={closeModal}>
                Close
            </button>
            </div>
          </div>
        </div>
      );
    };
    
    export default ModalCard;