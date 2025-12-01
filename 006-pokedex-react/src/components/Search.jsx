import React, { useState, useContext } from "react";
import pokeballClosed from "../img/pokeball-closed.png";
import { SearchContext } from "../contexts/SearchContext.jsx";

export default function Search() {
	const { searchedPokemon, setSearchedPokemon } = useContext(SearchContext);
	const { showDetailed } = useContext(SearchContext);
	const [activeSearchBar, setActiveSearchBar] = useState(false);
	const [rotate, setRotate] = useState("");

	function handlePokeBallClick() {
		setActiveSearchBar((prevActiveSearchBar) => !prevActiveSearchBar);
		setRotate((prevRotate) => {
			if (prevRotate === "" || prevRotate === "rotateBackwards")
				setRotate("rotateForward");
			else setRotate("rotateBackwards");
		});
	}

	/* Get any string and format to be capitalized */
	function formatString(str) {
		const formattedString = str.toLowerCase();
		console.log("formatted String:" + formattedString);
		return formattedString;
	}

	return (
		!showDetailed && (
			<div className='search-container'>
				<img
					src={pokeballClosed}
					alt='closed pokeball'
					onClick={handlePokeBallClick}
					className={rotate}
				></img>
				{activeSearchBar && (
					<input
						type='text'
						name='pokemon-search'
						value={searchedPokemon}
						placeholder='Search a pokemon'
						onChange={(e) => setSearchedPokemon(formatString(e.target.value))}
					></input>
				)}
			</div>
		)
	);
}
