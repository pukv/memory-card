import Card from "./Card.jsx";

export default function CardGrid({ cards = [], handleCardClick }) {
  if (!cards || cards.length === 0) {
    return <div className="card-grid">Loading Cards...</div>;
  }
  return (
    <div className="card-grid">
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={() => handleCardClick(card.id)}
        />
      ))}
    </div>
  );
}
