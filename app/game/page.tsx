import Bracket from '../bracket/page';
import { WoltFood } from '../types/WoltFood';
import puppeteer from 'puppeteer-core';

async function getDataFromWolt(city: string): Promise<WoltFood[] | undefined> {
    try {
        const res = await fetch(`${process.env.FETCH_URL}api/puppeteer-api/?city=${city}`, { cache: 'no-store' });
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
        return (
            <div>
                <div className="flex justify-center items-center">
                    <Bracket foods={foods} />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <div className="flex flex-col justify-center items-center">
                    <h1>Nothing was found from Wolt</h1>
                    <a href="https://wolt.com/" className='underline'>Go check yourself</a>
                </div>
            </div>
        )
    }
}