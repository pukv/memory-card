import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import CardGrid from "./components/CardGrid.jsx";

export default function App() {
  const [cards, setCards] = useState([]);
  const [guess, setGuess] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);

  useEffect(() => {
    async function fetchPokemons() {
      const ids = [3, 6, 9, 25, 39, 143, 133, 150, 196, 212];
      const promises = ids.map((id) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((res) =>
          res.json()
        )
      );

      const data = await Promise.all(promises);

      const formatted = data.map((pokemon) => ({
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.sprites.other["official-artwork"].front_default,
      }));

      setCards(formatted);
    }

    fetchPokemons();
  }, []);

  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function handleCardClick(id) {
    if (guess.includes(id)) {
      alert("Oops! You already clicked that Pokémon. Game resets!");
      setScore(0);
      setGuess([]);
    } else {
      const newScore = score + 1;
      setScore(newScore);
      setBestScore((prevBest) => Math.max(prevBest, newScore));
      setGuess((prevGuess) => [...prevGuess, id]);

      setCards((prevCards) => shuffleArray(prevCards));
    }
  }

  return (
    <>
      <Header score={score} bestScore={bestScore} />
      <CardGrid cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}
