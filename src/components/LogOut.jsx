import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogOut = () => {

        localStorage.removeItem("token");


        navigate("/Login")
        window.location.reload();
    }

    return (
        <button onClick={handleLogOut}>Log Out</button>
    );
}