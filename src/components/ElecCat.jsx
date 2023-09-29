import React, { useState, useEffect } from "react";
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";
import CatProductCard from "./CatProductCard";
import Filter from "./Filter";

export default function Electronics() {
    const [electronics, setElectronics] = useState([])
    const [error, setError] = useState(null)
    //modal variables
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    //sorting variables
    const [sortOption, setSortOption] = useState("default");
    const [sortedElectronics, setSortedElectronics] = useState([]);
    const [selectedFilter, setSelectedFilter] = useState("default");
    const [selectedFilterParam, setSelectedFilterParam] = useState("");
    const [ratingData, setRatingData] = useState([]); 

    useEffect(() => {
        const getElectronics = async () => {
            try {
                const productData = await GetAllProducts()
                const electronics = productData.filter(
                    (product) => product.category === "electronics"
                );
                setElectronics(electronics)
                setSortedElectronics(electronics)
                const ratings = electronics.map((product) => product.rating);
                setRatingData(ratings)
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

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleFilterParamChange = (param) => {
        setSelectedFilterParam(param);
    };

    const handleApplyFilter = (filter, param) => {
        let filteredProducts = [...electronics]
        
        
        if (filter === "default") {
            setSortedElectronics([...electronics])
        } else if ( filter === "Select Price Range") {
            setSortedElectronics([...electronics])
        }   else if (filter === "Selcect Rating Range") {
            setSortedElectronics([...electronics])
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
                
                  
                  setSortedElectronics(filteredProducts);
                  console.log(filteredProducts)
                };
        

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
            <Filter
            onFilterChange={handleFilterChange}
            onParamChange={handleFilterParamChange}
            onApply={handleApplyFilter}
            />
            <SearchBar products={electronics} openModal={openModal}  className="search-bar"/>
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
                {sortedElectronics.map((product) => (
                   <CatProductCard key={product.id} product={product} category="electronics" openModal={() => openModal(product)} />
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