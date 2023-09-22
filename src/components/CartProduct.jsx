import React from "react";
import { useCart } from "./CartContext";

export default function CartItem({item, handleQuantChange, handleRemoveFromCart }) {

    return (
        <li>
            <img src={item.image} alt={item.title} />
            {item.title} - ${item.price}
        <div className="quant-drop">
        <label htmlFor={`quantity-${item.id}`}>Quantity</label>
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
        <button onClick={handleRemoveFromCart}>Remove</button>
        </li>
    )
}