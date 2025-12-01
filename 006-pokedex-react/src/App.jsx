import { useEffect, useState } from "react";
import Search from "./components/Search";
import PokemonList from "./components/PokemonList";
import Navigation from "./components/Navigation";
import Pikachu from "./img/pikachu.png";
import { SearchContext } from "./contexts/SearchContext.jsx";

function App() {
	const [pokemons, setPokemons] = useState([]);
	const [showDetailed, setShowDetailed] = useState(false);
	const [searchedPokemon, setSearchedPokemon] = useState("");
	const [prevPokemonsURL, setPrevPokemonsURL] = useState(null);
	const [nextPokemonsURL, setNextPokemonsURL] = useState(null);

	const [currentPokemonsURL, setCurrentPokemonURL] = useState(
		"https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
	);
	const [isLoading, setIsLoading] = useState(false);

	async function fetchAPI(url) {
		const res = await fetch(url);
		setIsLoading(true);
		if (!res.ok) {
			throw new Error("Error: " + res);
		}

		const data = await res.json();
		console.log(data);

		/* Uncomment to test Loading Screen */

		/*
		setTimeout(() => {
			setIsLoading(false);
		}, 100000);
		*/

		/* Comment line below to test Loading Screen */
		setIsLoading(false);

		setPokemons((prevPokemons) => {
			return [...data.results];
		});

		setNextPokemonsURL(data.next);
		setPrevPokemonsURL(data.previous);
	}

	useEffect(() => {
		console.log("rerender app");
		fetchAPI(currentPokemonsURL);
	}, [currentPokemonsURL]);

	return (
		<div className='App'>
			{isLoading && (
				<div className='loading'>
					<h1>Loading...</h1>
					<img src={Pikachu} alt='Bouncing Pikachu' />
				</div>
			)}

			<SearchContext.Provider
				value={{
					searchedPokemon,
					setSearchedPokemon,
					showDetailed,
					setShowDetailed,
				}}
			>
				<Search />
				<PokemonList pokemons={pokemons} searchedPokemon={searchedPokemon} />
			</SearchContext.Provider>
			{!showDetailed && (
				<Navigation
					prevPokemonsURL={prevPokemonsURL}
					nextPokemonsURL={nextPokemonsURL}
					handlePrev={() => setCurrentPokemonURL(prevPokemonsURL)}
					handleNext={() => setCurrentPokemonURL(nextPokemonsURL)}
				/>
			)}
		</div>
	);
}

export default App;
