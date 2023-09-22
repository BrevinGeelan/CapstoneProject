import React, { useState, useEffect } from "react";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";



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

return (
    <>
    <div>
        <h2>View Our Products!</h2>
        <div className="search-sort-filter">
        <div className="sort">
            <label>Sort by: </label>
            <select 
            value={sortOption}
            onChange={(e) => handleSortChange(e.target.value)}
            >
            <option value="default">Default</option>
            <option value="alphabetical">A-Z</option>
            <option value="price">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>    
            </select>
        </div>
      
        <SearchBar products={products} openModal={openModal}  className="search-bar"/>
        </div>
        <ul>
{sortedProducts.map((product) => (
    <li key={product.id}>
        <h3>{product.title}</h3>
        <p>Price: ${product.price}</p>
        <p>Description: {product.description}</p>
        <img src={product.image} alt={product.title} />
        <button onClick={() => openModal(product)}>View Details</button>
    </li>
))}
</ul>
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