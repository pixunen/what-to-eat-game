import { UnsplashImage } from "@/app/types/UnsplashImage"
import Image from "next/image"

const Match = ({food}: {food: UnsplashImage | null}) => {
  if(food) {
    return (
      <div>
        <h1>{food?.score}</h1>
        <Image width={food?.width} height={food?.height} src={food.urls.regular} alt={food.alt_description}></Image>
      </div>
    )
  }
}

export default Match;