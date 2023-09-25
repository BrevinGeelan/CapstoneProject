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
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
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


const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
}

   
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li><Link to="/">Home</Link></li>
                <li className="dropdown">
                    <span onClick={toggleDropdown}>Categories</span>             
                   
                    <ul className={`dropdown-content ${isDropdownOpen ? 'open' : ''}`}>
                        <li>
                            <Link to="/MensCat">Men's Clothing</Link>
                        </li>
                        <li>
                            <Link to="/WomensCat">Women's Clothing</Link>
                        </li>
                        <li>
                            <Link to="/ElecCat">Electronics</Link>
                        </li>
                        <li>
                            <Link to="/Jewelery">Jewelery</Link>
                        </li>
                    </ul>
                
                </li>
                <li> <Link to="/Registration">Register</Link></li>
                <li> <Link to="/Login">Login</Link></li>
                <li>
                    {isLoggedIn &&
                    <Link to="/Cart">
                    <span className="cart-count">{totalItemsInCart}</span>
                    <FontAwesomeIcon icon={faCartShopping} />
                    </Link>}

                </li>
                <li>{isLoggedIn && <Logout />} </li>
            </ul>
        </nav>
    );
}