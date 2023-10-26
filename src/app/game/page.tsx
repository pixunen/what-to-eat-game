'use client'

import Bracket from '../../components/bracket/bracket';
import { WoltFood } from '../../lib/WoltFood';
import { useState } from 'react';
import Loading from '../loading';
import InputForm from '@/components/InputForm';
import puppeteer from 'puppeteer-core';

// async function getDataFromWolt(city: string): Promise<WoltFood[] | undefined> {
//     try {
//         const res = await fetch(`api/puppeteer-api`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ city }),
//             cache: 'no-store'
//         });
//         const data = await res.json();
//         return data.foodItems;
//     } catch (error) {
//         console.error(error);
//     }
// }

async function getDataFromWolt(city: string) {
    const browser = await puppeteer.connect({
        browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.API_TOKEN}`,
    })

    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(2 * 60 * 1000);
    await page.goto(`https://wolt.com/fi/fin/${city.toLowerCase()}/restaurants`, { waitUntil: 'networkidle0' });

    const selector = ".sc-32037cfe-0";

    await page.waitForSelector(selector);
    const foods = await page.evaluate((selector) => {
        const elements = document.querySelectorAll(selector);
        const foodArray = [];
        console.log('Number of elements:', );
        for (let el of elements) {
            try {
                const notOpen = el.querySelector(".sc-32037cfe-0 .sc-de5cfb2c-43 .sc-de5cfb2c-0 .sc-de5cfb2c-10 div.sc-de5cfb2c-12");
                if(notOpen == null) {
                    const imgElement = el.querySelector(".sc-32037cfe-0 .sc-de5cfb2c-43 .sc-de5cfb2c-0 .sc-de5cfb2c-2 .sc-b70f37bd-0 img.sc-b70f37bd-1");
                    const nameElement = el.querySelector(".sc-32037cfe-0 .sc-de5cfb2c-43 .sc-de5cfb2c-15 .sc-de5cfb2c-16 h3.sc-de5cfb2c-23");
                    const descElement = el.querySelector(".sc-32037cfe-0 .sc-de5cfb2c-43 .sc-de5cfb2c-15 .sc-de5cfb2c-16 p.sc-de5cfb2c-26");
    
                    const name = nameElement ? nameElement.textContent : "";
                    const description = descElement ? descElement.textContent : "";
                    const image = imgElement ? imgElement.getAttribute("src") : "";
                    const href = el.getAttribute("href") ?? "";
        
                    foodArray.push({ name, description, image, href });
                }

            } catch (error) {
                console.error("Error processing an element:", error);
            }
        }
        return foodArray;
    }, selector);

    return foods
}
export default function Game() {
    const [woltData, setWoltData] = useState<WoltFood[]>()
    const [loading, setLoading] = useState(false)
    const [city, setCity] = useState<string>('lahti')

    const getData = async (city: string) => {
        setLoading(true);
        setCity(city)
        const foods = await getDataFromWolt(city)
        setWoltData(foods)
        setLoading(false)
    }

    return (
        <div className="flex items-center justify-center">
            <div>
                {loading ? (
                    <Loading />
                ) : !woltData ? (
                    <InputForm onSubmitHandler={(city: string) => getData(city)} />
                ) : (
                    woltData.length > 0 ? (
                        <>
                            {
                                (() => {
                                    const foodsArray = woltData.map((result, index) => {
                                        return {
                                            id: index,
                                            name: result.name,
                                            description: result.description,
                                            image: result.image,
                                            href: result.href
                                        };
                                    });
                                    return <Bracket foods={foodsArray} />;
                                })()
                            }
                        </>
                    ) : (
                        <div className="flex flex-col justify-center items-center">
                            <h1>Nothing was found from Wolt</h1>
                            <a href={`https://wolt.com/fi/fin/${city.toLowerCase()}/restaurants`} className='underline'>Go check yourself</a>
                        </div>
                    )
                )}
            </div>
        </div>
    )
}