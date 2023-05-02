import styles from './styles/page.module.css'
import Image from 'next/image'
import { UnsplashImage } from './types/UnsplashImage';
import { Suspense } from 'react';
import Bracket from './bracket/page';

async function searchPhotos(query: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/unsplash-api/?question=${query}`);
    const data = await res.json();
    return data.data.results;
  } catch (error) {
    console.error(error);
  }
}

export default async function Home() {
  const results = await searchPhotos('food');
  let number = 0;
  const foods: UnsplashImage[] = results.map((result: any) => ({
    id: result.id,
    urls: {
      regular: result.urls.regular,
    },
    alt_description: result.alt_description || '',
    score: number++,
    clicked: false,
    width: result.width,
    height: result.height
  }));
  return (
    <>
      <div className={styles.title}>
        <h1>What to Eat?</h1>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <div className={styles.game}>
          <Bracket foods={foods}/>
        </div>
      </Suspense>
    </>
  )
}
