"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "../ui/button";
import { useCart } from "./cart-provider";
import { useToast } from "../ui/use-toast";

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  id: string;
  farmer: string;
  area: string;
}

export default function ProductCard({
  image,
  title,
  price,
  id,
  farmer,
  area,
}: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleAddToCart = () => {
    setIsLoading(true);
    
    // Simulate a small delay for UX
    setTimeout(() => {
      addToCart(id);
      setIsLoading(false);
      
      toast({
        title: "Added to cart",
        description: `${title} has been added to your cart.`,
      });
    }, 500);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image 
          src={image} 
          alt={title} 
          fill 
          className="object-cover" 
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-emerald-600 font-bold mb-2">₹{price}</p>
        <p className="text-sm text-gray-600 mb-1">By: {farmer}</p>
        <p className="text-sm text-gray-600 mb-3">Area: {area}</p>
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700" 
          onClick={handleAddToCart}
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add to Cart"}
        </Button>
      </div>
    </div>
  );
} 