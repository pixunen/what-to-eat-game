import '@styles/global.css'

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
    <html lang="en" className='h-screen'>
      <body className='h-screen'>
        {children}
      </body>
    </html>
  )
}