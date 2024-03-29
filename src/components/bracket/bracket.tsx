'use client'

import { useState, useEffect } from "react";
import { WoltFood } from "../../lib/WoltFood";
import Match from "./match/page";
import Winner from "./winner/page";

const Bracket = (props: any) => {
  const foods = props.foods as WoltFood[]
  const [queue, setQueue] = useState<WoltFood[]>(foods);
  const [currentPair, setCurrentPair] = useState<WoltFood[]>([]);

  useEffect(() => {
    if (queue?.length >= 2) {
      setCurrentPair([queue[0], queue[1]]);
    } else if (queue?.length === 1) {
      setCurrentPair([queue[0]]);
    }
  }, [queue]);

  const pickWinner = (winner: WoltFood) => {
    setQueue((prevQueue) => {
      let newQueue = prevQueue.slice(2); // Remove current pair from queue
      newQueue.push(winner); // Add winner back to end of queue
      return newQueue;
    });
  };

  if (queue?.length === 1 && currentPair?.length === 1) {
    return <Winner food={queue[0]} />;
  }

  return (
    <div className="flex flex-row max-w-xl gap-10">
      {currentPair.map((food) => (
        <div key={food.id} onClick={() => pickWinner(food)} className='lg:transition lg:ease-in-out lg:delay-150 lg:hover:scale-110'>
          <Match food={food} />
        </div>
      ))}
    </div>
  );
};

export default Bracket;