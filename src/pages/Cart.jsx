import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useLang } from "@/context/LanguageContext";
import { STANDARD_SHIPPING_COST, calcShipping, calcTax } from "@/lib/constants";

const Cart = () => {
  const { t } = useLang();
  const { cartWithDetails, subtotal, updateQty, removeFromCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
        <h1 className="font-serif-heading text-3xl text-[#58181F]">{t("cart.loginRequired")}</h1>
        <Link to="/login" className="inline-block mt-6">
          <Button className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">{t("nav.login")}</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12" data-testid="cart-page">
      <h1 className="font-serif-heading text-5xl text-[#58181F] mb-10 tracking-tight">{t("cart.title")}</h1>

      {cartWithDetails.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D4AF37]/25">
          <ShoppingBag className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
          <p className="text-[#7A686A] mb-6">{t("cart.empty")}</p>
          <Link to="/shop"><Button className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">{t("cart.browse")}</Button></Link>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4" data-testid="cart-items">
            {cartWithDetails.map((it) => (
              <div key={it.product_id} className="bg-white border border-[#D4AF37]/25 rounded-2xl p-5 flex gap-4 items-center" data-testid={`cart-item-${it.product.slug}`}>
                <img src={it.product.image} alt={it.product.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <Link to={`/product/${it.product.slug}`} className="font-serif-heading text-lg text-[#58181F] hover:text-[#F97316]">{it.product.name}</Link>
                  <div className="text-sm text-[#7A686A]">₹{it.product.price} · {it.product.weight}</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => updateQty(it.product_id, it.quantity - 1)} className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center hover:bg-[#D4AF37]/10"><Minus className="h-3 w-3" /></button>
                    <span className="w-8 text-center font-semibold">{it.quantity}</span>
                    <button onClick={() => updateQty(it.product_id, it.quantity + 1)} className="w-8 h-8 rounded-full border border-[#D4AF37]/40 flex items-center justify-center hover:bg-[#D4AF37]/10"><Plus className="h-3 w-3" /></button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-serif-heading text-xl text-[#58181F] font-semibold">₹{it.product.price * it.quantity}</div>
                  <button onClick={() => removeFromCart(it.product_id)} className="mt-2 text-sm text-[#58181F] hover:text-[#F97316] flex items-center gap-1" data-testid={`remove-${it.product.slug}`}>
                    <Trash2 className="h-3 w-3" /> {t("cart.remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 h-fit sticky top-32" data-testid="cart-summary">
            <h3 className="font-serif-heading text-2xl text-[#58181F] mb-5">{t("cart.summary")}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-[#7A686A]">{t("cart.subtotal")}</span><span className="font-semibold">₹{subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-[#7A686A]">{t("cart.shipping")}</span><span className="font-semibold">{calcShipping(subtotal) === 0 ? t("cart.free") : `₹${STANDARD_SHIPPING_COST}`}</span></div>
              <div className="flex justify-between"><span className="text-[#7A686A]">{t("cart.tax")}</span><span className="font-semibold">₹{calcTax(subtotal).toFixed(2)}</span></div>
              <hr className="border-[#D4AF37]/25" />
              <div className="flex justify-between text-lg">
                <span className="font-serif-heading text-[#58181F]">{t("cart.total")}</span>
                <span className="font-serif-heading text-[#58181F] font-semibold">₹{(subtotal + calcShipping(subtotal) + calcTax(subtotal)).toFixed(2)}</span>
              </div>
            </div>
            <Button onClick={() => navigate("/checkout")} className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full h-12 font-semibold" data-testid="checkout-btn">
              {t("cart.checkout")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
