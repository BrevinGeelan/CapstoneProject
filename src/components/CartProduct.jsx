import React from "react";
import { useCart } from "./CartContext";

export default function CartItem({item, handleQuantChange, handleRemoveFromCart }) {

    return (
        <li className="cart-item">
            <div className="cart-item-info">
            <img src={item.image} alt={item.title} />
            <div className="container">
           <h3 className="cart-item-title"> {item.title} </h3>
            <p className="cart-item-price">${item.price}</p> 
            </div>
             
        <div className="quant-drop">
        <label htmlFor={`quantity-${item.id}`}>Quantity: </label>
        <select
        id={`quantity-${item.id}`}
        value={item.quantity}
        onChange={(e) => handleQuantChange(item.id, parseInt(e.target.value))}
        >
            {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>
                    {num + 1}
                </option>
            ))}
        </select>
        </div>
        </div>
        <button  className="cart-item-remove" onClick={handleRemoveFromCart}>Remove</button>
        </li>
    )
}