import React, { useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import CatProductCard from "./CatProductCard";

export default function Womens() {
    const [womensProducts, setWomensProducts] = useState([]);
    const [error, setError] = useState(null);
    //modal variables
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    //sorting variables
    const [sortOption, setSortOption] = useState("default");
    const [sortedWomens, setSortedWomens] = useState([]);

    useEffect(() => {
        const getWomensProducts = async () => {
            try {
                const productData = await GetAllProducts()
                const womensProducts = productData.filter(
                    (product) => product.category === "women's clothing"
                );
                setWomensProducts(womensProducts);
                setSortedWomens(womensProducts)
            } catch (error) {
                setError(error.message);
            }
        };
        getWomensProducts();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleSortChange = (option) => {
        setSortOption(option);

        if (option === "default") {
            setSortedWomens(womensProducts);
        } else if (option === "alphabetical") {
            const sorted = [...womensProducts].sort((a, b) => 
            a.title.localeCompare(b.title)
            );
            setSortedWomens(sorted);
        } else if (option === "price") {
            const sorted =  [...womensProducts].sort((a, b) => a.price - b.price);
            setSortedWomens(sorted);
        } else if (option === "priceDesc") {
            const sorted = [...womensProducts].sort((a, b) => b.price - a.price);
            setSortedWomens(sorted)
        }
    }

    return (
        <div>
            <h2>Women's Clothing</h2>
            <div className="search-sort-filter">
                <div className="sort">
                <label>Sort by:</label>
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
            <SearchBar products={womensProducts} openModal={openModal} />
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
                {sortedWomens.map((product) => (
                <CatProductCard key={product.id} product={product} category="women's clothing" openModal={() => openModal(product)} />
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