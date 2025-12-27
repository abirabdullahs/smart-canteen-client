import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // Add item to cart
      addToCart: (item) => set((state) => {
        const existingItem = state.cart.find(cartItem => cartItem._id === item._id);
        
        if (existingItem) {
          return {
            cart: state.cart.map(cartItem =>
              cartItem._id === item._id
                ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
                : cartItem
            )
          };
        }
        
        return {
          cart: [...state.cart, { ...item, quantity: 1 }]
        };
      }),

      // Remove item from cart
      removeFromCart: (itemId) => set((state) => ({
        cart: state.cart.filter(item => item._id !== itemId)
      })),

      // Update item quantity
      updateQuantity: (itemId, quantity) => set((state) => ({
        cart: state.cart.map(item =>
          item._id === itemId
            ? { ...item, quantity: Math.max(1, quantity) }
            : item
        )
      })),

      // Clear cart
      clearCart: () => set(() => ({
        cart: []
      })),

      // Get cart total
      getTotal: () => {
        const state = get();
        return state.cart.reduce((total, item) => {
          const priceValue = typeof item.price === 'string'
            ? parseInt(item.price.replace(/[^\d]/g, '')) || 0
            : (item.price || 0);
          return total + (priceValue * (item.quantity || 1));
        }, 0);
      },

      // Get cart count
      getCartCount: () => {
        const state = get();
        return state.cart.reduce((count, item) => count + (item.quantity || 1), 0);
      }
    }),
    {
      name: 'cart-storage', // localStorage key name
      partialize: (state) => ({ cart: state.cart }) // Only persist cart, not functions
    }
  )
);

export default useCartStore;
