import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

export default function Logout() {
    const navigate = useNavigate();
    const {dispatch} = useCart()

    const handleLogOut = () => {
        dispatch({ type: "CLEAR_CART"});
        localStorage.removeItem("token");
        navigate("/");
        window.location.reload();
    }

    return (
        <button onClick={handleLogOut} className="log-out-button">Log Out</button>
    );
}