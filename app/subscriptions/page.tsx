"use client"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ShoppingBag, User, CreditCard, Calendar } from "lucide-react"

export default function SubscriptionsPage() {
  // Mock subscription data
  const subscriptions = [
    {
      id: "sub-001",
      product: "Desi Cow Milk",
      farmer: "Green Valley Farm",
      quantity: "1 liter",
      frequency: "Daily",
      price: 60,
      nextDelivery: "Tomorrow, 7:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "sub-002",
      product: "Organic Ghee",
      farmer: "Happy Cows Dairy",
      quantity: "500g",
      frequency: "Monthly",
      price: 550,
      nextDelivery: "15 May, 2023",
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "sub-003",
      product: "Fresh Paneer",
      farmer: "Mountain Dairy",
      quantity: "250g",
      frequency: "Weekly",
      price: 120,
      nextDelivery: "Saturday, 7:00 AM",
      image: "/placeholder.svg?height=80&width=80",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Bar */}
      <header className="border-b sticky top-0 bg-white z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Dairy Fresh Logo"
              width={40}
              height={40}
              className="object-contain"
            />
            <span className="font-bold text-xl text-emerald-700">DiaryFlow</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-emerald-600">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-emerald-600">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-emerald-600">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-emerald-600">
              Contact
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="outline" className="hidden md:flex gap-2">
                <User className="h-4 w-4" />
                My Account
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="md:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-menu"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Subscriptions</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{subscriptions.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Spending</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹{subscriptions.reduce((total, sub) => total + sub.price, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Next Delivery</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Tomorrow</div>
            </CardContent>
          </Card>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Active Subscriptions</h2>
          </div>
          <div className="divide-y">
            {subscriptions.map((subscription) => (
              <div key={subscription.id} className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <Image
                      src={subscription.image || "/placeholder.svg"}
                      alt={subscription.product}
                      width={80}
                      height={80}
                      className="rounded-md"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-semibold">{subscription.product}</h3>
                    <p className="text-gray-600">by {subscription.farmer}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-gray-500">Quantity</p>
                        <p className="font-medium">{subscription.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Frequency</p>
                        <p className="font-medium">{subscription.frequency}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Price</p>
                        <p className="font-medium">₹{subscription.price}</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm text-gray-500">Next Delivery</p>
                      <p className="font-medium">{subscription.nextDelivery}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 justify-center">
                    <Button variant="outline" size="sm">
                      Change Quantity
                    </Button>
                    <Button variant="outline" size="sm">
                      Skip Next Delivery
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Payment Methods</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded">
                    <CreditCard className="h-6 w-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">Cash on Delivery</p>
                    <p className="text-sm text-gray-500">Default payment method</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Default
                </Button>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Add Payment Method</Button>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden mt-8">
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold">Delivery Address</h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-gray-100 p-2 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-home"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Home</p>
                    <p className="text-sm text-gray-500">123 Main Street, Apartment 4B, Delhi - 110001</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Add New Address</Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">DiaryFlow</h3>
              <p className="text-gray-300">Connecting farmers and customers for fresh dairy products.</p>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="text-gray-300 hover:text-white">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/products" className="text-gray-300 hover:text-white">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/farmers" className="text-gray-300 hover:text-white">
                    Our Farmers
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-gray-300 hover:text-white">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-map-pin"
                  >
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  123 Dairy Road, Delhi
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-phone"
                  >
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  info@diaryflow.com
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-medium mb-4">Subscribe</h4>
              <p className="text-gray-300 mb-4">Get updates on new products and offers.</p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="rounded-r-none bg-gray-700 border-gray-600 text-white"
                />
                <Button className="rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} DiaryFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
