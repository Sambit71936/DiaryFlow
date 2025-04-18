import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"
import { CartProvider } from "./components/cart-provider"
import { ToastProvider } from "./ui/use-toast"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DiaryFlow - Fresh Dairy Products Near You',
  description: 'Connect with local dairy farmers and get fresh dairy products delivered to your doorstep.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ToastProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}
