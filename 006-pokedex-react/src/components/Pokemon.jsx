import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { v4 as uuid } from "uuid";
import { SearchContext } from "./SearchContext";

export default function Pokemon(props) {
	Pokemon.propTypes = {
		name: PropTypes.string.isRequired,
		url: PropTypes.string.isRequired,
	};

	const [pokeImg, setPokeImg] = useState("");
	const [detailedStats, setDetailedStats] = useState({});
	const [isDetailed, setIsDetailed] = useState(false);
	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);
	const { showDetailed, setShowDetailed } = useContext(SearchContext);

	useEffect(() => {
		console.log("rerender POKEMON:");
	}, []);

	useEffect(() => {
		// s-ar putea sa ramana falsa din cauza ca se rerandeaza PokemonList
		// PokemonList se rerandeaza din cauza ca showDetailed care e in context isi schimba valoarea
		// console.log(
		// 	"S-a schimbat shhowDetailed si acum are valoarea:" + showDetailed
		// );

		async function fetchDetailed(isDetailed) {
			const res = await fetch(props.url);
			if (!res.ok) {
				throw new Error("Error: " + res);
			}

			const data = await res.json();
			const newStats = {
				id: data.id,
				abilities: data.abilities,
				height: data.height,
				weight: data.weight,
				types: data.types,
				img: data.sprites.other.home.front_default,
			};

			setPokeImg(data.sprites.front_default);
			setDetailedStats(newStats);

			if (showDetailed) {
				setIsDetailed(true);
			}
		}

		fetchDetailed();
	}, [showDetailed, props.url]);

	function handleReadMore() {
		setSearchedPokemon(props.name);
		// console.log("am setat searched pokemon");
		setIsDetailed(true);
		// console.log("isDetailed: " + isDetailed);
		setShowDetailed(true);
		// console.log("am setat showDetailed la true");
	}

	function getHighlightedString() {
		const matchIndex = props.name.indexOf(searchedPokemon);
		const beginNewName = props.name.slice(0, matchIndex);
		const endNewName = props.name.slice(
			matchIndex + searchedPokemon.length,
			props.name.length
		);
		return (
			<p>
				{beginNewName}
				<span className='highlighted'>{searchedPokemon}</span>
				{endNewName}
			</p>
		);
	}

	return isDetailed ? (
		<div className='pokemon-detailed-card'>
			<div className='first-info'>
				<div className='img-id'>
					<p>#{detailedStats.id}</p>
					<div>
						<img src={detailedStats.img} alt={props.name}></img>
					</div>
				</div>
				<p>
					<strong>Types:</strong>
				</p>
				<ul>
					{detailedStats.types.map((elem) => (
						<li key={uuid()}>{elem.type.name}</li>
					))}
				</ul>
			</div>

			<div className='second-info'>
				<h1>{props.name}</h1>
				<p>
					<strong>Abilities:</strong>
				</p>

				<ul>
					{detailedStats.abilities.map((a) => (
						<li key={uuid()}>{a.ability.name}</li>
					))}
				</ul>
				<p>
					<strong>Height</strong>: {detailedStats.height}
				</p>
				<p>
					<strong>Weight</strong>: {detailedStats.weight}
				</p>
			</div>
		</div>
	) : (
		<div className='pokemon-card'>
			<img src={pokeImg} alt={props.name}></img>
			{props.searchedFilter === "" ? (
				<p>{props.name}</p>
			) : (
				getHighlightedString()
			)}
			<button id='read-more-btn' onClick={handleReadMore}>
				Read more
			</button>
		</div>
	);
}
