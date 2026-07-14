import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Star, Heart, ShoppingBag, Truck, Shield, Award, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const ProductDetail = () => {
  const { slug } = useParams();
  const { addToCart, toggleWishlist, wishlist } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [qty, setQty] = useState(1);
  const [rev, setRev] = useState({ rating: 5, title: "", body: "" });

  useEffect(() => {
    api.get(`/products/${slug}`).then((r) => {
      setProduct(r.data);
      api.get(`/reviews/${r.data.id}`).then((rr) => setReviews(rr.data));
    });
  }, [slug]);

  if (!product) return <div className="max-w-7xl mx-auto px-6 py-20 text-center text-[#7A686A]">Loading…</div>;

  const inWishlist = wishlist.items?.includes(product.id);

  const submitReview = async (e) => {
    e.preventDefault();
    if (!user) { toast.error("Please login to review"); return; }
    try {
      await api.post("/reviews", { product_id: product.id, ...rev });
      toast.success("Review posted 🙏");
      setRev({ rating: 5, title: "", body: "" });
      const rr = await api.get(`/reviews/${product.id}`);
      setReviews(rr.data);
    } catch (err) {
      toast.error("Could not post review");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12" data-testid="product-detail-page">
      <div className="text-sm text-[#7A686A] mb-6">
        <Link to="/" className="hover:text-[#58181F]">Home</Link> /{" "}
        <Link to="/shop" className="hover:text-[#58181F]">Shop</Link> /{" "}
        <span className="text-[#58181F]">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        <div className="rounded-2xl overflow-hidden border border-[#D4AF37]/30 bg-white aspect-square">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">{product.category}</div>
          <h1 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-2 tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />
              <span className="font-semibold">{product.rating}</span>
              <span className="text-[#7A686A]">({product.review_count} reviews)</span>
            </div>
            {product.weight && <span className="text-[#7A686A]">· {product.weight}</span>}
          </div>

          <p className="mt-6 text-[#2D1A1C]/80 leading-relaxed">{product.description}</p>

          <div className="mt-8 flex items-baseline gap-4">
            <span className="font-serif-heading text-4xl text-[#58181F] font-semibold">₹{product.price}</span>
            {product.original_price && (
              <>
                <span className="text-lg text-[#7A686A] line-through">₹{product.original_price}</span>
                <span className="text-sm bg-[#F97316]/10 text-[#F97316] px-2 py-0.5 rounded-full font-semibold">
                  Save ₹{product.original_price - product.price}
                </span>
              </>
            )}
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border border-[#D4AF37]/40 rounded-full overflow-hidden">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-[#D4AF37]/10" data-testid="qty-decrease"><Minus className="h-4 w-4" /></button>
              <span className="px-5 font-semibold" data-testid="qty-value">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-[#D4AF37]/10" data-testid="qty-increase"><Plus className="h-4 w-4" /></button>
            </div>
            <Button
              onClick={() => addToCart(product.id, qty)}
              size="lg"
              className="flex-1 bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full h-12 font-semibold"
              data-testid="pdp-add-to-cart"
            >
              <ShoppingBag className="h-4 w-4 mr-2" /> Add to Cart
            </Button>
            <Button
              onClick={() => toggleWishlist(product.id)}
              size="lg" variant="outline"
              className="rounded-full h-12 w-12 border-[#D4AF37]/50"
              data-testid="pdp-wishlist"
            >
              <Heart className={`h-5 w-5 ${inWishlist ? "fill-[#F97316] text-[#F97316]" : "text-[#58181F]"}`} />
            </Button>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-3 text-xs">
            {[
              { icon: Truck, label: "Free shipping over ₹499" },
              { icon: Shield, label: "Secure payments" },
              { icon: Award, label: "Blessed at Mahakal" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center text-center p-3 border border-[#D4AF37]/25 rounded-xl bg-white">
                <b.icon className="h-5 w-5 text-[#58181F] mb-1" />
                <span className="text-[#7A686A]">{b.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-20">
        <h2 className="font-serif-heading text-3xl text-[#58181F] mb-8">Customer Reviews</h2>

        {user && (
          <form onSubmit={submitReview} className="bg-white rounded-2xl border border-[#D4AF37]/30 p-6 mb-8" data-testid="review-form">
            <div className="mb-3">
              <span className="text-sm font-semibold mr-3">Your rating:</span>
              {[1,2,3,4,5].map((n) => (
                <button type="button" key={n} onClick={() => setRev({ ...rev, rating: n })} className="p-1" data-testid={`review-star-${n}`}>
                  <Star className={`h-5 w-5 ${n <= rev.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#D4AF37]/30"}`} />
                </button>
              ))}
            </div>
            <Input required value={rev.title} onChange={(e) => setRev({ ...rev, title: e.target.value })} placeholder="Review title" className="mb-3" data-testid="review-title" />
            <Textarea required value={rev.body} onChange={(e) => setRev({ ...rev, body: e.target.value })} placeholder="Share your experience…" data-testid="review-body" />
            <Button type="submit" className="mt-3 bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full" data-testid="review-submit">Post Review</Button>
          </form>
        )}

        <div className="space-y-4">
          {reviews.length === 0 ? (
            <p className="text-[#7A686A]">Be the first to review this product.</p>
          ) : reviews.map((r) => (
            <div key={r.id} className="bg-white rounded-2xl border border-[#D4AF37]/25 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-serif-heading text-lg text-[#58181F]">{r.title}</div>
                  <div className="text-xs text-[#7A686A] mt-0.5">by {r.user_name}</div>
                </div>
                <div className="flex gap-0.5">
                  {[1,2,3,4,5].map((n) => (
                    <Star key={n} className={`h-4 w-4 ${n <= r.rating ? "fill-[#D4AF37] text-[#D4AF37]" : "text-[#D4AF37]/30"}`} />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-[#2D1A1C]/80 leading-relaxed">{r.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
