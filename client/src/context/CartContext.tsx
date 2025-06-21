import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '@/types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product & { selectedVariations?: { [key: string]: string } }) => void;
  removeFromCart: (productId: string, selectedVariations?: { [key: string]: string }) => void;
  updateQuantity: (productId: string, quantity: number, selectedVariations?: { [key: string]: string }) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Compara id + selectedVariations (como string)
  const isSameItem = (a: CartItem, b: { id: string; selectedVariations?: { [key: string]: string } }) => {
    return (
      a.id === b.id &&
      JSON.stringify(a.selectedVariations || {}) === JSON.stringify(b.selectedVariations || {})
    );
  };

  // Adiciona ao carrinho, separando itens do mesmo produto mas com variações diferentes
  const addToCart = useCallback((product: Product & { selectedVariations?: { [key: string]: string } }) => {
    setCart(currentCart => {
      const existingIndex = currentCart.findIndex(item =>
        isSameItem(item, product)
      );

      if (existingIndex !== -1) {
        // Já existe: soma quantidade
        const updatedCart = [...currentCart];
        updatedCart[existingIndex].quantity += 1;
        return updatedCart;
      } else {
        // Não existe: adiciona novo
        return [...currentCart, { ...product, quantity: 1 }];
      }
    });
  }, []);

  // Remove item específico pelo id + variação
  const removeFromCart = useCallback((productId: string, selectedVariations?: { [key: string]: string }) => {
    setCart(currentCart =>
      currentCart.filter(item =>
        !(item.id === productId && JSON.stringify(item.selectedVariations || {}) === JSON.stringify(selectedVariations || {}))
      )
    );
  }, []);

  // Atualiza quantidade de um item específico (id + variação)
  const updateQuantity = useCallback((productId: string, quantity: number, selectedVariations?: { [key: string]: string }) => {
    setCart(currentCart => {
      if (quantity <= 0) {
        return currentCart.filter(item =>
          !(item.id === productId && JSON.stringify(item.selectedVariations || {}) === JSON.stringify(selectedVariations || {}))
        );
      }
      return currentCart.map(item =>
        item.id === productId && JSON.stringify(item.selectedVariations || {}) === JSON.stringify(selectedVariations || {})
          ? { ...item, quantity }
          : item
      );
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      subtotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);

  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};