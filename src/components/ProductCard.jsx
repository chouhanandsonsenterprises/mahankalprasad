import React from "react";
import { Link } from "react-router-dom";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

const ProductCard = ({ product, className = "" }) => {
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const inWishlist = wishlist.items?.includes(product.id);
  const discount = product.original_price ? Math.round((1 - product.price / product.original_price) * 100) : 0;

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden border border-[#D4AF37]/25 shadow-[0_8px_24px_rgba(88,24,31,0.06)] lift-hover ${className}`} data-testid={`product-card-${product.slug}`}>
      <Link to={`/product/${product.slug}`} className="block relative overflow-hidden aspect-square bg-[#FDFBF7]">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        {discount > 0 && (
          <span className="absolute top-3 left-3 bg-[#58181F] text-[#D4AF37] text-xs font-semibold px-2.5 py-1 rounded-full tracking-wider">
            {discount}% OFF
          </span>
        )}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product.id); }}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center hover:bg-white transition-colors"
          data-testid={`wishlist-toggle-${product.slug}`}
          aria-label="Toggle wishlist"
        >
          <Heart className={`h-4 w-4 ${inWishlist ? "fill-[#F97316] text-[#F97316]" : "text-[#58181F]"}`} />
        </button>
      </Link>
      <div className="p-5">
        <div className="text-[10px] uppercase tracking-widest text-[#F97316] font-semibold mb-1">{product.category}</div>
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-serif-heading text-lg text-[#2D1A1C] leading-snug hover:text-[#58181F] transition-colors line-clamp-2 min-h-[3.5rem]">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-1 mt-1.5 text-xs text-[#7A686A]">
          <Star className="h-3.5 w-3.5 fill-[#D4AF37] text-[#D4AF37]" />
          <span className="font-semibold text-[#2D1A1C]">{product.rating}</span>
          <span>({product.review_count})</span>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <span className="font-serif-heading text-xl text-[#58181F] font-semibold">₹{product.price}</span>
            {product.original_price && (
              <span className="ml-2 text-xs text-[#7A686A] line-through">₹{product.original_price}</span>
            )}
          </div>
          <Button
            size="sm"
            onClick={() => addToCart(product.id, 1)}
            className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-3 h-9"
            data-testid={`add-to-cart-${product.slug}`}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
