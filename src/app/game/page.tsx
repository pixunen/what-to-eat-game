'use client'

import Bracket from '../../components/bracket/bracket';
import { WoltFood } from '../../lib/WoltFood';
import { useState } from 'react';
import Loading from '../loading';
import InputForm from '@/components/InputForm';

async function getDataFromWolt(city: string): Promise<WoltFood[] | undefined> {
    try {
        const res = await fetch(`api/puppeteer-api`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ city }),
            cache: 'no-store'
        });
        const data = await res.json();
        return data.foodItems;
    } catch (error) {
        console.error(error);
    }
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