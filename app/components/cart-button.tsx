"use client";

import { useCart } from "./cart-provider";
import { Button } from "../ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { cartCount } = useCart();
  
  return (
    <Link href="/cart">
      <Button variant="outline" size="icon" className="relative">
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
            {cartCount}
          </span>
        )}
      </Button>
    </Link>
  );
} 