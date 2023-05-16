import { WoltFood } from "@/app/types/WoltFood";
import Image from "next/image"

const Match = (input: any) => {
  const food = input as WoltFood;
  return (
    <div className="block">
      <Image width="600" height="800" src={food.image} alt="image of the food" className="h-64 w-full object-cover sm:h-80 lg:h-96"></Image>
      <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
          {food.name}
      </h3>
      <p className="mt-2 max-w-sm text-gray-700">
          {food.description}
      </p>
  </div>
  )
}

export default Match;