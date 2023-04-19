import React, { useState, useEffect, useCallback } from "react";
import "./Pokemon.css";

const Pokemon = () => {
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchedPokemon, setSearchedPokemon] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const fetchData = useCallback(async (name) => {
    setLoading(true);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const data = await response.json();
      setPokemonData(data);
    } catch (error) {
      console.error("Error fetching Pokemon data:", error);
    }
    setLoading(false);
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    fetchData(searchedPokemon);
    setInputValue("");
    setIsFirstLoad(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setSearchedPokemon(event.target.value);
  };

  // fetches the data once upon rendering the page
  useEffect(() => {}, []);

  const renderPokemonData = () => {
    if (isFirstLoad)
      return <p>Please type in a Pokemon name to begin searching</p>;
    if (loading) return <p>Loading...</p>;
    if (!pokemonData) return <p>Error fetching data.</p>;

    return (
      <div className="pokemon-container">
        <div className="pokemon-card">
          <img src={pokemonData.sprites.front_default} alt={pokemonData.name} />
        </div>
        <div className="pokemon-card">
          <h2>{pokemonData.name}</h2>
          <p>Height: {pokemonData.height}</p>
          <p>Weight: {pokemonData.weight}</p>
          <p>
            Type: {pokemonData.types.map((type) => type.type.name).join(", ")}
          </p>
          <p>
            Abilities:{" "}
            {pokemonData.abilities
              .map((ability) => ability.ability.name)
              .join(", ")}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderPokemonData()}
      <form onSubmit={(e) => formSubmitHandler(e)}>
        Search:{" "}
        <input
          type="text"
          name="pokemon-name"
          onChange={handleInputChange}
          value={inputValue}
        />
      </form>
    </div>
  );
};

export default Pokemon;
