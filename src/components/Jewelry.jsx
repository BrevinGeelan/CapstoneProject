import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import CatProductCard from "./CatProductCard";
import "../App.css"
import Filter from "./Filter";

export default function Jewels() {
    const [jewelery, setJewelery] = useState([])
    const [error, setError] = useState(null)
    //modal variable
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //sorting varibales
    const [sortOption, setSortOption] = useState("default");
    const [sortedJewels, setSortedJewels] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("default");
    const [selectedFilterParam, setSelectedFilterParam] = useState("");
    const [ratingData, setRatingData] = useState([]); 

    useEffect(() => {
        const getJewelery = async () => {
            try {
                const productData = await GetAllProducts();
                const jewelery = productData.filter(
                    (product) => product.category === "jewelery"
                );
                setJewelery(jewelery);
                setSortedJewels(jewelery);
                const ratings = jewelery.map((product) => product.rating);
                setRatingData(ratings)
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

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleFilterParamChange = (param) => {
        setSelectedFilterParam(param);
    };

    const handleApplyFilter = (filter, param) => {
        let filteredProducts = [...jewelery]
        
        
        if (filter === "default") {
            setSortedJewels([...jewelery])
        }
        else if (filter === "priceRange") {
            switch (param) {
                case "$0-$50":
                    filteredProducts = filteredProducts.filter(
                    (product) => product.price >= 0 && product.price < 50    
                    );
                    break;
                    case "$50-$100":
                        filteredProducts = filteredProducts.filter(
                          (product) => product.price > 50 && product.price <= 100
                        );
                        break;
                      case "$100-$150":
                        filteredProducts = filteredProducts.filter(
                          (product) => product.price > 100 && product.price <= 150
                        );
                        break;
                      case "$150-$200":
                        filteredProducts = filteredProducts.filter(
                          (product) => product.price > 150 && product.price <= 200
                        );
                        break;
                      case "$200+":
                        filteredProducts = filteredProducts.filter(
                          (product) => product.price > 200
                        );
                        break;
                      default:
                     
                        break;
                    }
                  } else if (filter === "rating") {
                    const ratingRange = param.split("-");;
                    const minRating = parseFloat(ratingRange[0]);
                    const maxRating = parseFloat(ratingRange[1]);
                    
                    filteredProducts = filteredProducts.filter(
                      (product) => product.rating.rate >= minRating && product.rating.rate <= maxRating
                    );
                  }
                
                  
                  setSortedJewels(filteredProducts);
                  console.log(filteredProducts)
                };
        

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
            <Filter
            onFilterChange={handleFilterChange}
            onParamChange={handleFilterParamChange}
            onApply={handleApplyFilter}
            />
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