import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import "../App.css"




export default function AllProducts() {
const [products, setProducts] = useState([]);
const [error, setError] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
//sorting variables
const [sortOption, setSortOption] = useState("default")
const [sortedProducts, setSortedProducts] = useState([]);
const [sortDirection, setSortDirection] = useState("asc");

useEffect (() => {
    const getProducts = async () => {

        try {
            const productData = await GetAllProducts();
            setProducts(productData);
            setSortedProducts(productData);
        } catch (error) {
            setError(error.message);
        }
    };
    getProducts();
}, []);

useEffect(() => {
    if (sortOption === "alphabetical") {
        const sorted = [...products].sort((a, b) => 
        a.title.localeCompare(b.title)
        );
        setSortedProducts(sorted);
    } else if (sortOption === "price") {
        const sorted = [...products].sort((a, b) => a.price - b.price);
        setSortedProducts(sorted);
    }
}, [products, sortOption]);

const handleSortChange = (option) => {
    setSortOption(option);
    
    if (option === "default") {
        setSortedProducts(products);
    } else if (option === "alphabetical") {
        const sorted = [...products].sort((a, b ) =>
        a.title.localeCompare(b.title)
        );
        setSortedProducts(sorted);
    } else if (option === "price") {
        const newDirection = sortDirection === "asc" ? "desc" : "asc";
        setSortDirection(newDirection);

        const sorted = 
        newDirection === "asc"
        ? [...products].sort((a, b) => a.price - b.price)
        : [...products].sort((a, b) => b.price - a.price);

        setSortedProducts(sorted);
    } else if (option === "priceDesc") {
        const sorted = [...products].sort((a, b) => b.price - a.price);
        setSortedProducts(sorted)
    }
};

const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
};

const closeModal = () => {
    setSelectedProduct(null);
    setIsModalOpen(false);
};
//const handleDropChange = (event) => {
  //  const dropdown = event.target;
  //  const margin = dropdown.offsetHeight + 10;
  //  document.querySelector(".pro-container").style.marginTop = `${margin}px`
//}
return (
    <>
    <div>
        <h2>View Our Products!</h2>
        <div className="search-sort-filter">
        <div className="sort">
            <label>Sort by: </label>
            <select 
            value={sortOption}
            onChange={(e) => 
                handleSortChange(e.target.value)
               }
            >
            <option value="default">Default</option>
            <option value="alphabetical">A-Z</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>    
            </select>
        </div>
      
        <SearchBar products={products} openModal={openModal}  className="search-bar"/>
        </div>
        <div className="route-buttons">
            <Link to="/" className="route-button">
                All Products
            </Link>
            <Link to="/MensCat" className="route-button">
                Men's Clothing
            </Link>
            <Link to="/WomensCat" className="route-button">
                Women's Clothing
            </Link>
            <Link to="/Jewelry" className="route-button">
                Jewelry
            </Link>
            <Link to="/ElecCat" className="route-button">
                Electronics
            </Link>
        </div>
        <div className="pro-container">
        
{sortedProducts.map((product) => (
  
        <ProductCard key={product.id} product={product} openModal={() => openModal(product)} />
    
))}

</div>
    </div>
    {selectedProduct && (
        <ProductModal
        isOpen={isModalOpen}
        closeModal={closeModal}
        product={selectedProduct}
        />
    )}
    </>
)
}