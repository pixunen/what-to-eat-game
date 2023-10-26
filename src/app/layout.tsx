import './global.css'
import Link from 'next/link'

export const metadata = {
  title: 'What to Eat?',
  description: 'Make eating easy',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col justify-center items-center m-0 p-8 pb-20">
          <h1 className='text-4xl font-black'>What to Eat?</h1>
          <Link href='/'>
            <p className='transition ease-in-out hover:scale-105'>Restart</p>
          </Link>
        </div>
        {children}
      </body>
    </html>
  )
}