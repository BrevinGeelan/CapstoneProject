import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom"
import "../navbar.css"
import Logout from "./LogOut";
import { useCart } from "./CartContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import CartItem from "./CartProduct";
import Login from "./Login";


export default function Navbar() {
//const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//const [LoggedIn, setLoggedIn] = useState(false);
const { cartState } = useCart();

const totalItemsInCart = cartState.items.reduce(
    (total, item) => total + item.quantity,
    0
)
const isLoggedIn = !!localStorage.getItem("token");

useEffect(() => {
   console.log("logged in", isLoggedIn)
}, [isLoggedIn]);


//const toggleDropdown = () => {
 //   setIsDropdownOpen(!isDropdownOpen)
//}

   
    return (
        <nav className="navbar">
            <div className="nav-title">
                FullStack E-Commerce
            </div>
            <ul className="nav-list">
                <li><Link to="/" className="nav-button">Home</Link></li>
                <li> <Link to="/Registration" className="nav-button">Register</Link></li>
                <li> 
                    {isLoggedIn ? (
                        <Logout className="log-out-button" />
                    ) : (
                    <Link to="/Login" className="nav-button">Login</Link>
                    )}
                    </li>
                    
                <li>
                    {isLoggedIn &&
                    <Link to="/Cart" className="cart-button">
                    <span className="cart-count">{totalItemsInCart}</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                    </Link>}

                </li>
            </ul>
        </nav>
    );
}