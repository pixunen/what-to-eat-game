'use client'

import Link from 'next/link';

export default async function Home() {
  return (
    <div>
      <div className="flex justify-center items-center">
          <Link href='/game'>
            <p className='transition ease-in-out hover:scale-105'>Start game</p>
          </Link>
      </div>
    </div>
  )
}