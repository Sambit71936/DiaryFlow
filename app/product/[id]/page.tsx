import { SelectItem } from "@/components/ui/select"
import { SelectContent } from "@/components/ui/select"
import { SelectValue } from "@/components/ui/select"
import { SelectTrigger } from "@/components/ui/select"
import { Select } from "@/components/ui/select"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch product details based on the ID
  const product = {
    id: params.id,
    name: "Desi Cow Milk",
    description:
      "Pure and fresh A2 milk from indigenous cows. Our cows are grass-fed and raised in a natural environment without any hormones or antibiotics. The milk is rich in nutrients and has a creamy texture.",
    price: 60,
    farmer: "Green Valley Farm",
    area: "South Delhi",
    image: "/Assets/pexels-pixabay-248412.jpg",
    rating: 4.8,
    reviews: 56,
  }

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
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-cart"
                >
                  <circle cx="8" cy="21" r="1" />
                  <circle cx="19" cy="21" r="1" />
                  <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" className="hidden md:flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="hidden md:inline-flex">Sign Up</Button>
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
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
                <Image
                  src="/Assets/ghee.jpeg"
                  alt="Organic Ghee"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-1/2">
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
              <p className="text-2xl font-bold text-emerald-600 mb-4">₹{product.price}/liter</p>
              <p className="text-gray-600 mb-6">{product.description}</p>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Sold by: {product.farmer}</p>
                <p className="text-sm text-gray-500 mb-4">Delivery Area: {product.area}</p>
              </div>

              <div className="mb-6">
                <Tabs defaultValue="one-time">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="one-time">One-time Purchase</TabsTrigger>
                    <TabsTrigger value="subscription">Monthly Subscription</TabsTrigger>
                  </TabsList>
                  <TabsContent value="one-time" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="quantity">Quantity (liters)</Label>
                        <div className="flex items-center mt-1">
                          <Button variant="outline" size="icon" className="rounded-r-none">
                            -
                          </Button>
                          <Input
                            id="quantity"
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="rounded-none text-center w-20"
                          />
                          <Button variant="outline" size="icon" className="rounded-l-none">
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="delivery-address">Delivery Address</Label>
                        <Input id="delivery-address" placeholder="Enter your delivery address" className="mt-1" />
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Add to Cart</Button>
                        <Button variant="outline" className="flex-1">
                          Buy Now
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="subscription" className="pt-4">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="sub-quantity">Daily Quantity (liters)</Label>
                        <div className="flex items-center mt-1">
                          <Button variant="outline" size="icon" className="rounded-r-none">
                            -
                          </Button>
                          <Input
                            id="sub-quantity"
                            type="number"
                            defaultValue="1"
                            min="1"
                            className="rounded-none text-center w-20"
                          />
                          <Button variant="outline" size="icon" className="rounded-l-none">
                            +
                          </Button>
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="sub-delivery-address">Delivery Address</Label>
                        <Input id="sub-delivery-address" placeholder="Enter your delivery address" className="mt-1" />
                      </div>
                      <div>
                        <Label htmlFor="delivery-time">Preferred Delivery Time</Label>
                        <Select>
                          <SelectTrigger id="delivery-time" className="mt-1">
                            <SelectValue placeholder="Select time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (6 AM - 9 AM)</SelectItem>
                            <SelectItem value="evening">Evening (4 PM - 7 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-4 pt-2">
                        <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700">Subscribe</Button>
                        <Button variant="outline" className="flex-1">
                          Learn More
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-6">Customer Reviews</h2>
          <div className="space-y-6">
            <div className="border-b pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < 5 ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={i < 5 ? "text-yellow-400" : "text-gray-300"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">Excellent quality!</span>
              </div>
              <p className="text-gray-600 mb-2">
                The milk is fresh and tastes amazing. My kids love it and I feel good about giving them a natural
                product.
              </p>
              <p className="text-sm text-gray-500">Priya Sharma - 2 weeks ago</p>
            </div>
            <div className="border-b pb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill={i < 4 ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className={i < 4 ? "text-yellow-400" : "text-gray-300"}
                    >
                      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                  ))}
                </div>
                <span className="font-semibold">Great product, timely delivery</span>
              </div>
              <p className="text-gray-600 mb-2">
                I've been subscribing for 3 months now. The milk is consistently good and delivery is always on time.
              </p>
              <p className="text-sm text-gray-500">Rahul Verma - 1 month ago</p>
            </div>
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
