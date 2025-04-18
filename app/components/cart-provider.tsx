"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type CartItem = {
  id: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (productId: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, change: number) => void;
  cartCount: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    try {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Error accessing localStorage or parsing cart:', e);
      setCart([]);
    }
  }, []);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const addToCart = (productId: string) => {
    if (!isClient) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      let newCart;
      
      if (existingItem) {
        newCart = prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        newCart = [...prevCart, { id: productId, quantity: 1 }];
      }
      
      try {
        localStorage.setItem('cart', JSON.stringify(newCart));
      } catch (e) {
        console.error('Error storing cart in localStorage:', e);
      }
      
      return newCart;
    });
  };

  const removeFromCart = (productId: string) => {
    if (!isClient) return;
    
    setCart(prevCart => {
      const newCart = prevCart.filter(item => item.id !== productId);
      
      try {
        localStorage.setItem('cart', JSON.stringify(newCart));
      } catch (e) {
        console.error('Error storing cart in localStorage:', e);
      }
      
      return newCart;
    });
  };

  const updateQuantity = (productId: string, change: number) => {
    if (!isClient) return;
    
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === productId);
      
      if (!existingItem) return prevCart;
      
      let newCart;
      
      if (existingItem.quantity + change <= 0) {
        newCart = prevCart.filter(item => item.id !== productId);
      } else {
        newCart = prevCart.map(item => 
          item.id === productId ? { ...item, quantity: item.quantity + change } : item
        );
      }
      
      try {
        localStorage.setItem('cart', JSON.stringify(newCart));
      } catch (e) {
        console.error('Error storing cart in localStorage:', e);
      }
      
      return newCart;
    });
  };

  // Create a context value with default no-op functions for server-side
  const contextValue = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    cartCount
  };

  // Render children directly during server-side rendering
  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
} 