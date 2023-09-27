import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import CatProductCard from "./CatProductCard";
import "../App.css"

export default function Jewels() {
    const [jewelery, setJewelery] = useState([])
    const [error, setError] = useState(null)
    //modal variable
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //sorting varibales
    const [sortOption, setSortOption] = useState("default");
    const [sortedJewels, setSortedJewels] = useState([]);

    useEffect(() => {
        const getJewelery = async () => {
            try {
                const productData = await GetAllProducts();
                const jewelery = productData.filter(
                    (product) => product.category === "jewelery"
                );
                setJewelery(jewelery);
                setSortedJewels(jewelery);
            } catch (error) {
                setError(error.message);
            }
        };
        getJewelery()
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleSortChange = (option) => {
        setSortOption(option);

        if (option === "default") {
            setSortedJewels(jewelery); 
        } else if (option === "alphabetical") {
            const sorted = [...jewelery].sort((a, b) => 
            a.title.localeCompare(b.title)
            );
            setSortedJewels(sorted);
        } else if (option === "price") {
            const sorted = [...jewelery].sort((a, b) => a.price - b.price);
            setSortedJewels(sorted);
        } else if (option === "priceDesc") {
            const sorted = [...jewelery].sort((a, b) => b.price - a.price);
            setSortedJewels(sorted)
        }
    }

    return (
        <div>
            <h2>Jewelry</h2>
          
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
            <SearchBar products={jewelery} openModal={openModal}  className="search-bar"/>
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
                <div className="cat-pro">
                {sortedJewels.map((product) => (
                   <CatProductCard key={product.id} product={product} category="jewelery" openModal={() => openModal(product)} /> 
                ))}
            </div>
            {selectedProduct && (
                <ProductModal
                isOpen={isModalOpen}
                closeModal={() => setIsModalOpen(false)}
                product={selectedProduct}
                />
            )}
        </div>
    )
}