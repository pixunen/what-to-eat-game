import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';
import { executablePath } from 'puppeteer-core'

export async function POST(request: NextRequest) {
    const { city } = await request.json()
    
    let browser;
    try {
        browser = await puppeteer.launch({headless: 'new', executablePath: executablePath('chrome')});

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(`https://wolt.com/fi/fin/${city.toLowerCase()}/restaurants`, { waitUntil: 'networkidle0' });

        const selector = ".sc-32037cfe-0";

        await page.waitForSelector(selector);
        const foodItems = await page.evaluate((selector) => {
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
            
                        foodArray.push({ index: elements.length, name, description, image, href });
                    }

                } catch (error) {
                    console.error("Error processing an element:", error);
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
