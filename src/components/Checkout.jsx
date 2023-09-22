import React, { useState, useEffect } from "react";
import {useNavigate} from "react-router-dom"
import {useCart} from "./CartContext"

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
        <div className="checkout">
            <h2>Checkout</h2>
            <h3>Enter your (fake) info here!</h3>
            <ul className="cart-items">
                {cartState.items.map((item) => (
                    <li key={item.id}>
                        <img src={item.image} alt={item.title} />
                        {item.title} - ${item.price} - Quantity: {item.quantity}
                    </li>
                ))}
            </ul>
            <form>
                <div className="form-group">
                    <label htmlFor="cardNumber">Card Number:</label>
                    <input 
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={paymentData.cardNumber}
                    onChange={handleInputChange}
                    required 
                    />
                </div>
                <div className="card-group">
                    <label htmlFor="cardExpiration">Expiration Date:</label>
                    <input 
                    type="text"
                    id="cardExpiration"
                    name="cardExpiration"
                    value={paymentData.cardExpiration}
                    onChange={handleInputChange}
                     />
                </div>
            </form>
            <div className="total">Total: ${total.toFixed(2)}</div>
            <button onClick={handleCheckout}>Purchase Now</button>
        </div>
    )
}