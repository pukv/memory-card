import dummyImg from "../assets/dummy-img.png";

export default function Card() {
  return (
    <div className="card">
      <img src={dummyImg} alt="dummy-img" />
      <p>Charizard</p>
    </div>
  );
}
