import { createContext, useContext, useEffect, useState } from 'react';

// Create context
export const CartContext = createContext();

// Custom hook export
export const useCart = () => useContext(CartContext);

// Provider
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (err) {
            console.error("Failed to parse cart from localStorage:", err);
            return [];
        }
    });

    // Save to localStorage whenever cart changes
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cart));
        } catch (err) {
            console.error("Failed to save cart to localStorage:", err);
        }
    }, [cart]);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const exists = prevCart.find((item) => item._id === product._id);
            if (exists) {
                return prevCart.map((item) =>
                    item._id === product._id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item._id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
