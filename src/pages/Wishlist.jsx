import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import ProductCard from "@/components/ProductCard";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

const Wishlist = () => {
  const { user } = useAuth();
  const { wishlist, productMap } = useCart();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <Heart className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
        <h1 className="font-serif-heading text-3xl text-[#58181F]">Please login to view your wishlist</h1>
        <Link to="/login" className="inline-block mt-6"><Button className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">Login</Button></Link>
      </div>
    );
  }

  const items = (wishlist.items || []).map((id) => productMap[id]).filter(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12" data-testid="wishlist-page">
      <h1 className="font-serif-heading text-5xl text-[#58181F] mb-10 tracking-tight">Your Wishlist</h1>
      {items.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D4AF37]/25">
          <Heart className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
          <p className="text-[#7A686A] mb-6">Your wishlist is empty. Start adding some blessed products.</p>
          <Link to="/shop"><Button className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">Browse Shop</Button></Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
