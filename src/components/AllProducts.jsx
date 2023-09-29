import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom"
import { GetAllProducts } from "./API";
import ProductModal from "./Modal";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import "../App.css"
import Filter from "./Filter";




export default function AllProducts() {
const [products, setProducts] = useState([]);
const [error, setError] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
//sorting variables
const [sortOption, setSortOption] = useState("default")
const [sortedProducts, setSortedProducts] = useState([]);
const [sortDirection, setSortDirection] = useState("asc");
const [selectedFilter, setSelectedFilter] = useState("default");
const [selectedFilterParam, setSelectedFilterParam] = useState("");
const [ratingData, setRatingData] = useState([]); 

useEffect (() => {
    const getProducts = async () => {

        try {
            const productData = await GetAllProducts();
            setProducts(productData);
            setSortedProducts(productData);
            const ratings = products.map((product) => product.rating);
                setRatingData(ratings)
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

const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
};

const handleFilterParamChange = (param) => {
    setSelectedFilterParam(param);
};

const handleApplyFilter = (filter, param) => {
    let filteredProducts = [...products]
    
    
    if (filter === "default") {
        setSortedProducts([...products])
    } else if ( filter === "Select Price Range") {
        setSortedProducts([...products])
    }   else if (filter === "Selcect Rating Range") {
        setSortedProducts([...products])
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
            
              
              setSortedProducts(filteredProducts);
              console.log(filteredProducts)
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
        <Filter
            onFilterChange={handleFilterChange}
            onParamChange={handleFilterParamChange}
            onApply={handleApplyFilter}
            />
      
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