"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, Package, ShoppingBag, Star, User, LogOut, Settings, Upload, DollarSign } from "lucide-react"

export default function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md hidden md:block">
        <div className="p-4 border-b">
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
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center mb-6">
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              <User className="h-10 w-10 text-emerald-600" />
            </div>
            <h3 className="font-medium">Green Valley Farm</h3>
            <p className="text-sm text-gray-500">Farmer</p>
          </div>
          <nav className="space-y-1">
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "dashboard" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="h-5 w-5" />
              Dashboard
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "products" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("products")}
            >
              <Package className="h-5 w-5" />
              Products
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "orders" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("orders")}
            >
              <ShoppingBag className="h-5 w-5" />
              Orders
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "reviews" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("reviews")}
            >
              <Star className="h-5 w-5" />
              Reviews
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "profile" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("profile")}
            >
              <User className="h-5 w-5" />
              Profile
            </button>
            <button
              className={`w-full flex items-center gap-3 px-3 py-2 text-left rounded-md ${activeTab === "settings" ? "bg-emerald-50 text-emerald-600" : "text-gray-700 hover:bg-gray-100"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="h-5 w-5" />
              Settings
            </button>
          </nav>
        </div>
        <div className="mt-auto p-4 border-t">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-left rounded-md text-gray-700 hover:bg-gray-100">
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Farmer Dashboard</h1>
          <Button className="md:hidden">
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

        {/* Dashboard Overview */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹24,560</div>
                  <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
                  <ShoppingBag className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">+4 new orders today</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
                  <Star className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">4.8</div>
                  <p className="text-xs text-muted-foreground">Based on 56 reviews</p>
                </CardContent>
              </Card>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Recent Orders</h2>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rahul Sharma</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Desi Cow Milk</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 liters</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Priya Patel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Organic Ghee</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500g</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Processing
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Amit Kumar</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Buttermilk</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 liter</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Shipped
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add Product Tab */}
        {activeTab === "products" && (
          <div>
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-6">Add New Product</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="product-name">Product Name</Label>
                  <Input id="product-name" className="mt-1" placeholder="e.g. Desi Cow Milk" />
                </div>
                <div>
                  <Label htmlFor="product-category">Category</Label>
                  <Select>
                    <SelectTrigger id="product-category" className="mt-1">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="milk">Milk</SelectItem>
                      <SelectItem value="ghee">Ghee</SelectItem>
                      <SelectItem value="buttermilk">Buttermilk</SelectItem>
                      <SelectItem value="paneer">Paneer</SelectItem>
                      <SelectItem value="curd">Curd</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="product-price">Price (₹)</Label>
                  <Input id="product-price" type="number" className="mt-1" placeholder="e.g. 60" />
                </div>
                <div>
                  <Label htmlFor="product-quantity">Quantity Available</Label>
                  <Input id="product-quantity" type="number" className="mt-1" placeholder="e.g. 50" />
                </div>
                <div>
                  <Label htmlFor="product-unit">Unit</Label>
                  <Select>
                    <SelectTrigger id="product-unit" className="mt-1">
                      <SelectValue placeholder="Select unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liter">Liter</SelectItem>
                      <SelectItem value="kg">Kilogram</SelectItem>
                      <SelectItem value="g">Gram</SelectItem>
                      <SelectItem value="piece">Piece</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="delivery-area">Delivery Area</Label>
                  <Input id="delivery-area" className="mt-1" placeholder="e.g. South Delhi" />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="product-description">Description</Label>
                  <Textarea id="product-description" className="mt-1" rows={4} placeholder="Describe your product..." />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="product-image">Product Image</Label>
                  <div className="mt-1 flex items-center">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center w-full">
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">Drag and drop an image, or click to browse</p>
                      <Input id="product-image" type="file" className="hidden" />
                      <Button variant="outline" size="sm" className="mt-4">
                        Upload Image
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex justify-end">
                <Button variant="outline" className="mr-2">
                  Cancel
                </Button>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Add Product</Button>
              </div>
            </div>

            <h2 className="text-xl font-semibold mt-8 mb-4">Your Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <Image
                    src="/Assets/pexels-pixabay-248412.jpg"
                    alt="Desi Cow Milk"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Desi Cow Milk</h3>
                  <p className="text-emerald-600 font-bold">₹60/liter</p>
                  <p className="text-sm text-gray-500 mt-1">Available: 50 liters</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
              <div className="bg-white shadow rounded-lg overflow-hidden">
                <div className="h-48 bg-gray-200 relative">
                  <Image 
                    src="/Assets/ghee.jpeg" 
                    alt="Organic Ghee" 
                    fill 
                    className="object-cover" 
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold">Organic Ghee</h3>
                  <p className="text-emerald-600 font-bold">₹550/kg</p>
                  <p className="text-sm text-gray-500 mt-1">Available: 20 kg</p>
                  <div className="mt-4 flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="destructive" size="sm" className="flex-1">
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <div>
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="text-xl font-semibold">Current Orders</h2>
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Quantity
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-001</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Rahul Sharma</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Desi Cow Milk</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2 liters</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Delivered
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-002</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Priya Patel</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Organic Ghee</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">500g</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Processing
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#ORD-003</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Amit Kumar</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Fresh Buttermilk</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1 liter</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Shipped
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex gap-2">
                        <Button variant="ghost" size="sm">
                          View
                        </Button>
                        <Button variant="outline" size="sm">
                          Update
                        </Button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
