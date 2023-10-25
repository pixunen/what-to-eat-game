import { WoltFood } from "@/lib/WoltFood";
import Image from "next/image"

const Match = ({ food }: { food: WoltFood }) => {
  return (
    <div className="block">
      <Image
        width="600"
        height="800"
        src={food?.image}
        alt="image of the food"
        className="h-64 w-full object-cover sm:h-80 lg:h-96"
        placeholder="blur"
        blurDataURL="/placeholder-600x800.png"
        priority={true}
      />
      <h3 className="mt-4 text-lg font-bold text-gray-900 sm:text-xl">
        {food?.name}
      </h3>
      <p className="mt-2 max-w-sm text-gray-700">
        {food?.description}
      </p>
    </div>
  );
}

export default Match;