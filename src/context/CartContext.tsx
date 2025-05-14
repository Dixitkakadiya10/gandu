
import { createContext, useContext, useState, ReactNode } from "react";

export interface CartItem {
  id: number;
  name: string;
  price: number;
  chef: string;
  quantity: number;
  image: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  const saveToLocalStorage = (cartItems: CartItem[]) => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  };

  const addToCart = (product: Omit<CartItem, 'quantity'>) => {
    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      
      let newItems;
      if (existingItem) {
        newItems = currentItems.map((item) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        newItems = [...currentItems, { ...product, quantity: 1 }];
      }
      
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const removeFromCart = (id: number) => {
    setItems((currentItems) => {
      const newItems = currentItems.filter((item) => item.id !== id);
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((currentItems) => {
      const newItems = currentItems.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
      saveToLocalStorage(newItems);
      return newItems;
    });
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem("cart");
  };

  const getTotal = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCount = () => {
    return items.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      getTotal,
      getCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
