'use client'

import { UnsplashImage } from "@/app/types/UnsplashImage";
import { useState } from "react";
import Match from "./match/page";

const Bracket = ({ foods }: { foods: UnsplashImage[] }) => {
  const [currentPair, setCurrentPair] = useState([foods[0], foods[1]]);
  const [remainingFoods, setRemainingFoods] = useState(foods.slice(2));
  const [winners, setWinners] = useState<UnsplashImage[]>([]);

  const pickWinner = (winner: UnsplashImage) => {
    setWinners((prevWinners) => [...prevWinners, winner]);

    if (remainingFoods.length === 0 && winners.length === 1) {
      console.log("Final winner:", winners[0]);
    } else if (remainingFoods.length === 0) {
      setCurrentPair([winners[0], winners[1]]);
      setWinners(winners.slice(2));
    } else {
      setCurrentPair([remainingFoods[0], remainingFoods[1]]);
      setRemainingFoods(remainingFoods.slice(2));
    }
  };

  return (
    <div className="bracket">
      <div>
        {currentPair.map((food, index) => (
          <div
            key={food.id}
            onClick={() => pickWinner(food)}
          >
            {<Match food={food} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bracket;