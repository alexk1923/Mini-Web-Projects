import React from "react";
import PropTypes from "prop-types";

export default function Navigation(props) {
	Navigation.propTypes = {
		prevPokemonsURL: PropTypes.string.isRequired,
		nextPokemonsURL: PropTypes.string.isRequired,
		handlePrev: PropTypes.func.isRequired,
		handleNext: PropTypes.func.isRequired,
	};

	function handleNewPokemons(handleType) {
		console.log("handle new pokemons");
		handleType();
	}

	return (
		<div className='navigation'>
			{props.prevPokemonsURL !== null && (
				<button
					type='button'
					onClick={() => handleNewPokemons(props.handlePrev)}
				>
					<span className='nav-text'>PREV</span>
				</button>
			)}
			{props.nextPokemonsURL != null && (
				<button
					type='button'
					onClick={() => handleNewPokemons(props.handleNext)}
				>
					<span className='nav-text'>NEXT</span>
				</button>
			)}
		</div>
	);
}
