export default function Header({ score, bestScore }) {
  return (
    <div className="header">
      <h1>Pokémon Memory Game</h1>
      <p>
        Score: {score} | Best Score: {bestScore}
      </p>
    </div>
  );
}
