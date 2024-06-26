import { usePokemonCollection, useDebounce } from "../hooks";
import React from "react";

export const CodeCustomHook = () => {
    const { filter, setFilter, pokemonCollection, loadPokemon } = usePokemonCollection();
    const debouncedValue = useDebounce(filter, 7000)

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    React.useEffect(() => {
        loadPokemon();
    }, [debouncedValue]);

    return (
        <div className="center">
            <input value={filter} onChange={handleChange} />
            <ul>
                {pokemonCollection.map((pokemon, index) => (
                <li key={index}>
                    <h1>{pokemon.name}</h1>
                    <img src={pokemon?.sprites?.front_default} alt={pokemon?.name} />
                </li>
                ))}
            </ul>
        </div>
    );
};