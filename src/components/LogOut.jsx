import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate();

    const handleLogOut = () => {

        sessionStorage.removeItem("token");


        navigate("/Login")
    }

    return (
        <button onClick={handleLogOut}>Log Out</button>
    );
}