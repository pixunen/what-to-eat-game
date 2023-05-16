import Bracket from '../bracket/page';
import { WoltFood } from '../types/WoltFood';

async function getDataFromWolt(city: string): Promise<WoltFood[] | undefined> {
    try {
        const res = await fetch(`https://what-to-eat-game.vercel.app/api/puppeteer-api/?city=${city}`, { next: { revalidate: 3600 } });
        const data = await res.json();
        return data.foodItems;
    } catch (error) {
        console.error(error);
    }
}

export default async function Game() {
    const woltData = await getDataFromWolt('lahti');
    let number = 0;
    let foods: WoltFood[] = [];
    
    if (woltData) {
        foods = woltData.map((result: any) => ({
            id: number++,
            name: result.name,
            description: result.description,
            image: result.image,
            href: result.href
        }));
    }

    return (
        <div>
            <div className="flex justify-center items-center">
                <Bracket foods={foods} />
            </div>
        </div>
    )
}