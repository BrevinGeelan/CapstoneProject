import React, {useState} from "react"
import "../App.css"
export default function SearchBar ({products, openModal}) {
const [searchQuery, setSearchQuery] = useState("");
const [searchResults, setSearchResults] = useState([]);

const handleSearch = (query) => {
    setSearchQuery(query);

    const filteredResults = products.filter((product) => 
    product.title.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResults);
};

return (
    <div className="search-bar-container">
        <input 
        type="text" 
        className="search-input"
        placeholder="Search products..." 
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
        />
        {searchResults.length < 3 && (
            <div className="search-results">
                <ul className="search-list">
                    {searchResults.map((result) => (
                        <li key={result.id}>
                            <button onClick={() => openModal(result)} className="search-button">{result.title}</button>
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
);
}