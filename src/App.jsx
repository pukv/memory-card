import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import CardGrid from "./components/CardGrid.jsx";
import DifficultySelector from "./components/DifficultySelector.jsx";

export default function App() {
  const [cards, setCards] = useState([]);
  const [guess, setGuess] = useState([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [difficulty, setDifficulty] = useState("easy");

  useEffect(() => {
    async function fetchPokemons() {
      const count =
        difficulty === "easy" ? 10 : difficulty === "medium" ? 15 : 20;

      const ids = Array.from(
        { length: count },
        () => Math.floor(Math.random() * 898) + 1
      );

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
      setGuess([]);
      setScore(0);
    }

    fetchPokemons();
  }, [difficulty]);

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
      <DifficultySelector
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <CardGrid cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}
