import Bracket from '../bracket/page';
import { WoltFood } from '../types/WoltFood';
import puppeteer from 'puppeteer-core';

// async function getDataFromWolt(city: string): Promise<WoltFood[] | undefined> {
//     try {
//         const res = await fetch(`${process.env.FETCH_URL}api/puppeteer-api/?city=${city}`, { next: { revalidate: 3600 } });
//         const data = await res.json();
//         return data.foodItems;
//     } catch (error) {
//         console.error(error);
//     }
// }

// This was implemented in api/puppeteer-api/ but vercel functions had too small timeout
async function getDataFromWolt(city: string) {
    let browser;
    try {
        console.log("starting scrapping");
        console.time();
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${process.env.BRIGHTDATA_AUTH}@zproxy.lum-superproxy.io:9222`,
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(`https://wolt.com/fi/fin/${city}/restaurants`, { waitUntil: 'networkidle0' });
        console.log("connection established..")
        const selector = ".sc-c363de38-1 .sc-c6b178e0-0";

        await page.waitForSelector(selector);
        const foodItems = await page.evaluate((selector) => {
            const elements = document.querySelectorAll(selector);
            const foodArray = [];
            for (let el of elements) {
                const notOpen = el.querySelector(".sc-537ac15b-37 .sc-537ac15b-0 .sc-537ac15b-2 .sc-537ac15b-10 p.sc-537ac15b-11");
                if(notOpen == null)
                {
                    const imgElement = el.querySelector(".sc-537ac15b-37 .sc-537ac15b-0 .sc-537ac15b-2 .sc-36a7e468-0 img");
                    const nameElement = el.querySelector(".sc-537ac15b-37 .sc-537ac15b-12 .sc-537ac15b-13 h3.sc-537ac15b-20");
                    const descElement = el.querySelector(".sc-537ac15b-37 .sc-537ac15b-12 .sc-537ac15b-13 p.sc-537ac15b-22");

                    const name = nameElement ? nameElement.textContent : "";
                    const description = descElement ? descElement.textContent : "";
                    const image = imgElement ? imgElement.getAttribute("src") : "";
                    const href = el.getAttribute("href") ?? "";
    
                    foodArray.push({ name, description, image, href });
                }
            }
            return foodArray;
        }, selector);
        console.log("Returning results..")
        console.timeEnd();
        return foodItems;

    } catch (error) {
        console.error('Scraping failed', error);
    }
    finally {
        await browser?.close();
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