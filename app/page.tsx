"use client";

import { useEffect, useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import Navbar from "./components/navbar"
import ProductCard from "./components/product-card"

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Use sample products as fallback
        setProducts([
          {
            _id: 'sample1',
            name: 'Organic Ghee',
            price: 550,
            image: '/Assets/ghee.jpeg',
            farmer: { name: 'Sample Farm', area: 'Local Area' },
          },
          {
            _id: 'sample2',
            name: 'Fresh Buttermilk',
            price: 30,
            image: '/Assets/buttermilk.jpeg',
            farmer: { name: 'Sample Farm', area: 'Local Area' },
          },
          {
            _id: 'sample3',
            name: 'Paneer',
            price: 280,
            image: '/Assets/paneer.jpg',
            farmer: { name: 'Sample Farm', area: 'Local Area' },
          },
          {
            _id: 'sample4',
            name: 'Desi Cow Milk',
            price: 70,
            image: '/Assets/pexels-pixabay-248412.jpg',
            farmer: { name: 'Sample Farm', area: 'Local Area' },
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-emerald-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-800 mb-4">
                Fresh Dairy Delivered To Your Doorstep
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Connect with local dairy farmers and enjoy farm-fresh products delivered directly to you.
              </p>
              <div className="flex space-x-4">
                <Link href="/products">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    Browse Products
                  </Button>
                </Link>
                <Link href="/subscription">
                  <Button variant="outline">
                    Subscribe & Save
                  </Button>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative h-72 w-72 md:h-96 md:w-96">
                <Image
                  src="/Assets/pexels-pixabay-248412.jpg"
                  alt="Fresh Dairy Products"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Products</h2>
          
          {loading ? (
            <div className="text-center py-10">Loading products...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.name}
                  price={product.price}
                  farmer={product.farmer?.name || 'Unknown Farmer'}
                  area={product.farmer?.area || 'Unknown Location'}
                />
              ))}
            </div>
          )}
          
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose DiaryFlow</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Farm Fresh</h3>
              <p className="text-gray-600">Delivered directly from local farms, ensuring the freshest dairy products.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Same Day Delivery</h3>
              <p className="text-gray-600">Get your dairy products delivered within hours of ordering.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Support Local Farmers</h3>
              <p className="text-gray-600">Direct connection to farmers means better prices for them and fresher products for you.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
