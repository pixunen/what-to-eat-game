import { WoltFood } from "@/lib/WoltFood";
import Image from "next/image"
import Link from "next/link";

const Winner = (props: any) => {
    const food = props.food as WoltFood
    const baseUrl = 'https://wolt.com';

    return (
        <div>
            <div className="flex justify-center items-center m-0 p-8 pt-0">
                <h1 className="font-black">This was the Winner</h1>
            </div>
            <div>
                <Image width="600" height="800" src={food?.image} alt="image of the food" className="h-64 w-full object-cover sm:h-80 lg:h-96"></Image>
                <Link href={`${baseUrl}${food?.href}`} passHref target='_blank'>
                    <div className="flex flex-row items-center mt-4 gap-2">
                    <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                        {food?.name}
                    </h3>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3 text-black">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    </div>

                    <p className="mt-2 max-w-sm text-gray-700">
                        {food?.description}
                    </p>
                </Link>
            </div>
        </div>
    )
}

export default Winner;