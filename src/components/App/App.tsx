import { render } from "@testing-library/react";
import React from "react";
import './App.css';
import Pokedex from "../Pokedex/Pokedex";
import { pokemonData } from "../../data/pokemonData";
import { PokemonSchema, PokemonSpritesSchema, UnpatchedPokemonSchema } from "../../types/pokemonSchema";

interface AppState {
    searchField: string;
    allPokemons: PokemonSchema[];
    searchPokemons: PokemonSchema[];
    selectedPokemon: PokemonSchema | undefined;
}

class App extends React.Component<any, AppState> {
    state = {
        searchField: "",
        allPokemons: [],
        searchPokemons: [],
        selectedPokemon: undefined,
    }

    patchPokemonData = (pokemons: UnpatchedPokemonSchema[]) => {
        const patchedPokemons = pokemons.map((pokemon) => {
            let parsedSprites: PokemonSpritesSchema = {
                normal: undefined,
                animated: undefined
            };

            try {
                parsedSprites = pokemon.sprites && JSON.parse(pokemon.sprites);
            } catch (e) {
                console.log("Exception while logging the sprites", e);
            }

            const patchedPokemon: PokemonSchema = {
                ...pokemon,
                sprites: parsedSprites
            }
            return patchedPokemon;
        })
        return patchedPokemons;
    }

    componentDidMount() {
        //Patch the stringified pokemon sprites
        const patchedPokemons: PokemonSchema[] = this.patchPokemonData(pokemonData);
        //Update the state with the patched pokemons 
        this.setState({
            allPokemons: patchedPokemons,
            searchPokemons: patchedPokemons,
        })

    }


handleInputChange = (inputValue : string) =>{
    //Filter the searched pokemons
    const {allPokemons} = this.state;

    const searchedPokemons = allPokemons.filter(
        (pokemon : PokemonSchema) =>{
            return (
                pokemon.name && pokemon.name.toLowerCase().includes(inputValue.toLowerCase())
            );
        }
    );

    this.setState({
        searchField : inputValue,
        searchPokemons : searchedPokemons,
    });

}


handleClick = (pokemonName : string) => {
    const {allPokemons} = this.state;

    //Find the selected Pokemon from All Pokemon
    const selectedPokemon = allPokemons.find(
        (pokemon : PokemonSchema) => pokemon.name === pokemonName
    )
    //Update the state
    this.setState({selectedPokemon})

}

    render() {
        return (
            <div className="App">
                <h1>Pokedex</h1>
                <Pokedex searchedPokemons = {this.state.searchPokemons}
                selectedPokemon = {this.state.selectedPokemon}
                onInputChange={this.handleInputChange}
                onPokemonClick={this.handleClick} />
            </div>
        )
    }
}

export default App;