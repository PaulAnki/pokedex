import React from "react";
import './Pokecard.css';


interface PokecardProps {
    spriteUrl?: string;
    name: string;
    onPokemonClick: (pokemonName : string) => void;
}

const Pokecard = ({spriteUrl , name ,onPokemonClick }: PokecardProps) => {
    return (
        <div onClick={()=>onPokemonClick(name)} className="pokecard">
            {/* TODO- Add images */}
            <img src={spriteUrl} alt="pokmeon" className="pokemon-sprite" />
            <p>{name}</p>
        </div>
    )
}

export default Pokecard;