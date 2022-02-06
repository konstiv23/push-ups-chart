import { Link } from "react-router-dom";

function StartButton() {
  return (
    <button>
      <Link to="workout">Workout</Link>
    </button>
  );
}

export default StartButton;
