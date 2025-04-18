"use client";

import { useEffect, useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import Navbar from "../components/navbar";
import { useCart } from "../components/cart-provider";
import { Trash2, Plus, Minus } from "lucide-react";

type Product = {
  _id: string;
  name: string;
  price: number;
  image: string;
  farmer?: {
    name: string;
    area: string;
  };
};

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all products to get details for cart items
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

  // Calculate cart summary
  const cartItems = cart.map(item => {
    const product = products.find(p => p._id === item.id);
    return {
      ...item,
      product
    };
  });

  const subtotal = cartItems.reduce((sum, item) => {
    if (item.product) {
      return sum + (item.product.price * item.quantity);
    }
    return sum;
  }, 0);

  const deliveryFee = subtotal > 0 ? 50 : 0;
  const total = subtotal + deliveryFee;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p>Loading cart...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Your Shopping Cart</h1>
        
        {cart.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart to see them here.</p>
            <Link href="/products">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow overflow-hidden">
                {cartItems.map(item => {
                  if (!item.product) return null;
                  
                  return (
                    <div key={item.id} className="border-b last:border-0 p-4 flex items-center">
                      <div className="relative h-20 w-20 mr-4">
                        <Image 
                          src={item.product.image} 
                          alt={item.product.name} 
                          fill 
                          className="object-cover rounded" 
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">
                          {item.product.farmer ? `By ${item.product.farmer.name}` : ''}
                        </p>
                        <p className="text-emerald-600 font-bold">₹{item.product.price}</p>
                      </div>
                      
                      <div className="flex items-center mr-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="mx-3 font-medium">{item.quantity}</span>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="h-8 w-8 rounded-full"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      
                      <div className="w-20 text-right mr-4 font-medium">
                        ₹{item.product.price * item.quantity}
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-5 w-5" />
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>₹{deliveryFee}</span>
                  </div>
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>
                
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 