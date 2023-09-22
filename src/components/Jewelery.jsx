import React, {useState, useEffect} from "react";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";

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
            <h2>Jewelery</h2>
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
            <ul>
                {sortedJewels.map((product) => (
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