import { NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get("city");
    let browser;
    try {
        console.log("starting scrappng")
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://${process.env.BRIGHTDATA_AUTH}@zproxy.lum-superproxy.io:9222`,
        });

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(`https://wolt.com/fi/fin/${city}/restaurants`, { waitUntil: 'networkidle0' });

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

        return NextResponse.json({ foodItems });

    } catch (error) {
        console.error('Scraping failed', error);
    }
    finally {
        await browser?.close();
    }
}
