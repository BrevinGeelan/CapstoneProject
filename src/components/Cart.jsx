import React from "react";
import { useCart } from "./CartContext";
import CartItem from "./CartProduct";
import {Link} from "react-router-dom";

export default function Cart() {
    const { cartState, dispatch } = useCart();

    const handleQuantChange = (itemId, newQuant) => {

        const updatedItems = cartState.items.map((item) => {
            if (item.id === itemId) {
                return { ...item, quantity: newQuant, };
            }
            return item;
        });

        dispatch({
            type: "UPDATE_QUANTITY",
            payload: updatedItems,
        });

        console.log("updated cartstate:", {
            items: updatedItems,
            totalItems: cartState.totalItems
        })
    };

    const handleClearCart = () => {
        dispatch({ type: "CLEAR_CART"})
    };

    const subtotal = cartState.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
    );

    console.log("cartState:", cartState)

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            
        {cartState.items.map((item) => (
            
         <CartItem
            key={item.id}
            item={item}
            handleQuantChange={handleQuantChange} // Pass down the callback function
            handleRemoveFromCart={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}
            />    
        ))}
    
            <div className="subtotal">
                Subtotal: ${subtotal.toFixed(2)}
                <Link to="/Checkout">
                    <button>Proceed to Checkout</button>
                </Link>
                <button onClick={handleClearCart}>
                    Clear Cart
                </button>
            </div>
        </div>
    )
}