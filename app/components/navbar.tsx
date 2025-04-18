"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import CartButton from "./cart-button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Image 
            src="/Assets/placeholder-logo.png" 
            alt="DiaryFlow Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <span className="font-bold text-xl text-emerald-700">DiaryFlow</span>
        </Link>
        
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/products" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
                  Products
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/subscription" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
                  Subscription
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/about" legacyBehavior passHref>
                <NavigationMenuLink className="px-4 py-2 text-sm font-medium">
                  About Us
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        
        <div className="flex items-center space-x-4">
          <CartButton />
          
          <Link href="/farmer-dashboard">
            <Button variant="default" className="bg-emerald-600 hover:bg-emerald-700">
              Farmer Login
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
} 