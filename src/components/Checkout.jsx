import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {useCart} from "./CartContext"
import "../cartcheck.css"
import CartItem from "./CartProduct";

export default function Checkout() {
    const { cartState, dispatch } = useCart();
    const [paymentData, setPaymentData] = useState({
        cardNumber: "",
        cardExpiration: "",
    })
const navigate = useNavigate();

    const total = cartState.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setPaymentData({
            ...paymentData,
            [name]: value,
        });
    };

    const handleCheckout = () => {

        dispatch({ type: "CLEAR_CART" })
        const confirm = window.confirm("Your total was: $" + total + ". Thank you for your purchase! Press 'OK' to return to the homepage." )
        if (confirm) {
            navigate("/")

    };
        };
    

    return (
        <>
        <div className="checkout">
            <h2>Checkout</h2>
            <h3>Enter your (fake) info here!</h3>   
                {cartState.items.map((item) => (
                   <li key={item.id} className="cart-item">
                   <div className="cart-item-info">
                   <img src={item.image} alt={item.title} />
                   <div className="container">
                  <h3 className="cart-item-title"> {item.title} </h3>
                   <p className="cart-item-price">${item.price}</p> 
                   </div>
                   </div>
                   </li>
                   ))}
                
                </div>
                    <div className="form-container">
                   <div className="check-form">
            <form>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input 
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    className="checkout-input"
                    required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="cardExpiration">Expiration Date:</label>
                    <input 
                    type="text"
                    id="cardExpiration"
                    name="cardExpiration"
                    value={paymentData.cardExpiration}
                    onChange={handleInputChange}
                    className="checkout-input"
                    required
                     />
                </div>
            </form>
            <div className="total">Total: ${total.toFixed(2)}</div>
            <div className="check-buttons">
            <button className="checkout-button" onClick={handleCheckout}>Purchase Now</button>
            <button className="back-button" onClick={() => navigate("/cart")}>Back to Cart</button>
        </div>
        </div>
        </div>
        </>
    )
}