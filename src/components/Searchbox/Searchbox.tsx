import React from "react";
import './Searchbox.css';

interface SearchBoxProps {
    onInputChange: (inputValue : string) => void;
}

const Searchbox = ({onInputChange}: SearchBoxProps) => {
    return (
        <input type="search" onChange={(e)=>
            {console.log(e.target.value);
                onInputChange(e.target.value);
        }} className="search" placeholder="Search Pokemons" />
    )
}

export default Searchbox;