import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const CartCtx = createContext(null);
export const useCart = () => useContext(CartCtx);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const [wishlist, setWishlist] = useState({ items: [] });
  const [products, setProducts] = useState([]);

  const refresh = useCallback(async () => {
    if (!user) { setCart({ items: [] }); setWishlist({ items: [] }); return; }
    try {
      const [c, w] = await Promise.all([api.get("/cart"), api.get("/wishlist")]);
      setCart(c.data);
      setWishlist(w.data);
    } catch (err) {
      console.error("Failed to refresh cart/wishlist:", err);
    }
  }, [user]);

  useEffect(() => { refresh(); }, [refresh]);

  useEffect(() => {
    api.get("/products").then((r) => setProducts(r.data)).catch((err) => {
      console.error("Failed to load products for cart context:", err);
    });
  }, []);

  const addToCart = async (product_id, quantity = 1) => {
    if (!user) { toast.error("Please login to add items to cart"); return false; }
    const r = await api.post("/cart/add", { product_id, quantity });
    setCart(r.data);
    toast.success("Added to cart");
    return true;
  };

  const updateQty = async (product_id, quantity) => {
    const r = await api.post("/cart/update", { product_id, quantity });
    setCart(r.data);
  };

  const removeFromCart = async (product_id) => {
    const r = await api.delete(`/cart/${product_id}`);
    setCart(r.data);
    toast.success("Removed from cart");
  };

  const clearCart = async () => {
    await api.delete("/cart");
    setCart({ items: [] });
  };

  const toggleWishlist = async (product_id) => {
    if (!user) { toast.error("Please login to use wishlist"); return; }
    const r = await api.post("/wishlist/toggle", { product_id });
    setWishlist(r.data);
    toast.success(r.data.items.includes(product_id) ? "Added to wishlist" : "Removed from wishlist");
  };

  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  const cartWithDetails = (cart.items || []).map((it) => ({
    ...it,
    product: productMap[it.product_id],
  })).filter((it) => it.product);

  const subtotal = cartWithDetails.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const cartCount = cartWithDetails.reduce((s, i) => s + i.quantity, 0);

  return (
    <CartCtx.Provider value={{
      cart, cartWithDetails, subtotal, cartCount,
      wishlist, products, productMap,
      addToCart, updateQty, removeFromCart, clearCart,
      toggleWishlist, refresh,
    }}>
      {children}
    </CartCtx.Provider>
  );
};
