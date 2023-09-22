import React, { useState, useEffect } from "react";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";

export default function Electronics() {
    const [electronics, setElectronics] = useState([])
    const [error, setError] = useState(null)
    //modal variables
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //sorting variables
    const [sortOption, setSortOption] = useState("default");
    const [sortedElectronics, setSortedElectronics] = useState([]);

    useEffect(() => {
        const getElectronics = async () => {
            try {
                const productData = await GetAllProducts()
                const electronics = productData.filter(
                    (product) => product.category === "electronics"
                );
                setElectronics(electronics)
                setSortedElectronics(electronics)
            } catch (error) {
                setError(error.message);
            }
        };
        getElectronics();
    }, []);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const handleSortChange = (option) => {
        setSortOption(option);

        if (option === "default") {
            setSortedElectronics(electronics);
        } else if (option === "alphabetical") {
            const sorted = [...electronics].sort((a, b ) => 
            a.title.localeCompare(b.title)
            );
            setSortedElectronics(sorted);
        } else if (option === "price") {
            const sorted = [...electronics].sort((a, b ) => a.price - b.price);
            setSortedElectronics(sorted);
        } else if (option === "priceDesc") {
            const sorted = [...electronics].sort((a, b) => b.price - a.price);
            setSortedElectronics(sorted);
        }
    }

    return (
        <div>
            <h2>Electronics</h2>
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
            <SearchBar products={electronics} openModal={openModal}  className="search-bar"/>
            </div>
            <ul>
                {sortedElectronics.map((product) => (
                    <li key={product.id}>
                        <h3>{product.title}</h3>
                        <p>Price: ${product.price}</p>
                        <p>Description: {product.description}</p>
                        <img src={product.image} alt={product.title} />
                        <button onClick={() => openModal(product)}>View Details</button>
                    </li>
                ))}
            </ul>

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