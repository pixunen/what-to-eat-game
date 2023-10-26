import { NextRequest, NextResponse } from 'next/server';
import puppeteer from 'puppeteer-core';

export async function POST(request: NextRequest) {
    const { city } = await request.json()
    
    let browser;
    try {
        browser = await puppeteer.connect({
            browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.API_TOKEN}`,
        })

        const page = await browser.newPage();
        page.setDefaultNavigationTimeout(2 * 60 * 1000);
        await page.goto(`https://wolt.com/fi/fin/${city.toLowerCase()}/restaurants`, { waitUntil: 'domcontentloaded' });

        const selector = ".sc-32037cfe-0";

        await page.waitForSelector(selector);
        const elements = await page.evaluate((selector) => {
            const elements = document.querySelectorAll(selector);
            return elements;
        }, selector);

        return NextResponse.json({ elements });

    } catch (error) {
        console.error('Scraping failed', error);
    }
    finally {
        await browser?.close();
    }
}
