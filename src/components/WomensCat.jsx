import React, { useState, useEffect} from "react";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";

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
            <ul>
                {sortedWomens.map((product) => (
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