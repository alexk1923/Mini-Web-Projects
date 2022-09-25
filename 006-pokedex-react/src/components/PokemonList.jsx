import React from "react";
import Pokemon from "./Pokemon";
import { v4 as uuid } from "uuid";
import { useEffect, useContext } from "react";
import { SearchContext } from "../contexts/SearchContext";

export default function PokemonList({ pokemons }) {
	const { showDetailed, setShowDetailed } = useContext(SearchContext);
	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);

	function filterPokemons(filterName) {
		/* Exact match (only one Pokemon) - in case of Read More */
		const found = pokemons.find((pokemon) => pokemon.name === filterName);

		if (found) {
			return <Pokemon key={uuid()} name={found.name} url={found.url}></Pokemon>;
		}

		/* In case of an user's search */
		return pokemons
			.filter((pokemon) => pokemon.name.indexOf(filterName) >= 0)
			.map((pokemon) => (
				<Pokemon key={uuid()} name={pokemon.name} url={pokemon.url}></Pokemon>
			));
	}

	useEffect(() => {
		// console.log("rerender pokemon list");
	});

	useEffect(() => {
		// console.log("s-a schimbat showDetailed in pokemon list");
	}, [showDetailed]);

	function resetPokemons() {
		setSearchedPokemon("");
		setShowDetailed(false);
	}

	return showDetailed ? (
		<div className='detailed-container'>
			{filterPokemons(searchedPokemon)}
			<button onClick={resetPokemons}>All Pokemons</button>
		</div>
	) : (
		<div className='pokemon-container'>{filterPokemons(searchedPokemon)}</div>
	);
}
