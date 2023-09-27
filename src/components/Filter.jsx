import React, { useState } from "react";


export default function Filter({onFilterChange, onParamChange, onApply,}) {
    const [selectedOption, setSelectedOption] = useState("default");
    const [selectedParam, setSelectedParam]= useState("");

    const filterOptions = [
        { label: "Default", value: "default"},
        { label: "Price Range", value: "priceRange" },
        { label: "Rating", value: "rating" },
    ];
    
    const filterParam = {
        priceRange: [
            "$0-$50",
            "$50-$100",
            "$100-$150",
            "$150-$200",
            "$200+",
        ],
        rating: [
            "0-1 Stars",
            "1-2 Stars",
            "2-3 Stars",
            "3-4 Stars",
            "4-5 Stars",
        ],
    };

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setSelectedParam("");
        onFilterChange(option);
    };

    const handleParamChange = (parameter) => {
        setSelectedParam(parameter);
        onParamChange(parameter);
    };

    const applyFilter = () => {
        
        onApply(selectedOption, selectedParam);
       
    };
    
    return (
        <div>
            <label>Filter:</label>
            <select value={selectedOption} onChange={(e) => handleOptionChange(e.target.value)}>
                {filterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {selectedOption !== "default" && (
                <select value={selectedParam} onChange={(e) => handleParamChange(e.target.value)}>
                    {filterParam[selectedOption].map((parameter) => (
                        <option key={parameter} value={parameter}>
                            {parameter}
                        </option>
                    ))}
                </select>
            )}
            {(selectedOption === "default" || 
            selectedOption === "priceRange" ||
             selectedOption === "rating") && (
             <button onClick={applyFilter}>Apply</button>)}
        </div>
    )
}