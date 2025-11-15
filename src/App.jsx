import { useEffect, useState } from "react";
import Header from "./components/Header.jsx";
import CardGrid from "./components/CardGrid.jsx";

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    async function fetchPokemons() {
      const ids = [1, 4, 7, 25, 39, 52, 133, 150, 196, 212];
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

  function handleCardClick(id) {
    console.log("clicked", id);
  }
  return (
    <>
      <Header />
      <CardGrid cards={cards} handleCardClick={handleCardClick} />
    </>
  );
}
