import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import api from "@/lib/api";
import { toast } from "sonner";
import { CreditCard, Truck, Shield, Tag } from "lucide-react";
import { calcShipping, calcTax } from "@/lib/constants";

const Checkout = () => {
  const { user } = useAuth();
  const { cartWithDetails, subtotal, refresh } = useCart();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    full_name: user?.name || "", phone: user?.phone || "",
    line1: "", line2: "", city: "", state: "", pincode: "", country: "India",
  });
  const [payment, setPayment] = useState("cod");
  const [notes, setNotes] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [coupon, setCoupon] = useState(null);
  const [placing, setPlacing] = useState(false);

  if (!user) { navigate("/login"); return null; }
  if (cartWithDetails.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif-heading text-3xl text-[#58181F]">Your cart is empty</h1>
        <Button onClick={() => navigate("/shop")} className="mt-6 bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">Shop Now</Button>
      </div>
    );
  }

  const discount = coupon?.discount || 0;
  const shipping = calcShipping(subtotal);
  const tax = calcTax(subtotal - discount);
  const total = subtotal - discount + shipping + tax;

  const applyCoupon = async () => {
    try {
      const r = await api.post("/coupons/validate", { code: couponCode, subtotal });
      setCoupon(r.data);
      toast.success(`Coupon applied: -₹${r.data.discount}`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Invalid coupon");
      setCoupon(null);
    }
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);
    try {
      const items = cartWithDetails.map((i) => ({ product_id: i.product_id, quantity: i.quantity }));
      const r = await api.post("/orders", {
        items, address, payment_method: payment,
        coupon_code: coupon?.code, notes,
      });
      toast.success("Order placed! Jai Mahakal 🙏");
      await refresh();
      navigate(`/orders/${r.data.id}`);
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Could not place order");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-12" data-testid="checkout-page">
      <h1 className="font-serif-heading text-5xl text-[#58181F] mb-10 tracking-tight">Checkout</h1>

      <form onSubmit={placeOrder} className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6">
            <h2 className="font-serif-heading text-2xl text-[#58181F] mb-5 flex items-center gap-2"><Truck className="h-5 w-5 text-[#F97316]" /> Delivery Address</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><Label>Full Name</Label><Input required value={address.full_name} onChange={(e) => setAddress({ ...address, full_name: e.target.value })} data-testid="addr-name" /></div>
              <div><Label>Phone</Label><Input required value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} data-testid="addr-phone" /></div>
              <div className="sm:col-span-2"><Label>Address Line 1</Label><Input required value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} data-testid="addr-line1" /></div>
              <div className="sm:col-span-2"><Label>Address Line 2 (optional)</Label><Input value={address.line2} onChange={(e) => setAddress({ ...address, line2: e.target.value })} /></div>
              <div><Label>City</Label><Input required value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} data-testid="addr-city" /></div>
              <div><Label>State</Label><Input required value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} data-testid="addr-state" /></div>
              <div><Label>Pincode</Label><Input required value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} data-testid="addr-pincode" /></div>
              <div><Label>Country</Label><Input value={address.country} readOnly /></div>
            </div>
            <Label className="mt-4 block">Order Notes (optional)</Label>
            <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Anything you'd like us to know?" />
          </section>

          <section className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6">
            <h2 className="font-serif-heading text-2xl text-[#58181F] mb-5 flex items-center gap-2"><CreditCard className="h-5 w-5 text-[#F97316]" /> Payment Method</h2>
            <RadioGroup value={payment} onValueChange={setPayment} className="space-y-3">
              {[
                { v: "cod", label: "Cash on Delivery", desc: "Pay when your prasad arrives." },
                { v: "upi", label: "UPI", desc: "PhonePe, GPay, Paytm (Mock — demo mode)." },
                { v: "razorpay", label: "Razorpay (Cards / Net Banking)", desc: "Mock — demo mode." },
              ].map((o) => (
                <label key={o.v} className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-colors ${payment === o.v ? "border-[#F97316] bg-[#F97316]/5" : "border-[#D4AF37]/30 hover:border-[#D4AF37]"}`} data-testid={`pay-${o.v}`}>
                  <RadioGroupItem value={o.v} className="mt-1" />
                  <div>
                    <div className="font-semibold text-[#58181F]">{o.label}</div>
                    <div className="text-xs text-[#7A686A]">{o.desc}</div>
                  </div>
                </label>
              ))}
            </RadioGroup>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#7A686A]"><Shield className="h-4 w-4 text-[#D4AF37]" /> Your payment info is 100% secure & encrypted.</div>
          </section>
        </div>

        <aside className="bg-white border border-[#D4AF37]/30 rounded-2xl p-6 h-fit sticky top-32">
          <h3 className="font-serif-heading text-2xl text-[#58181F] mb-5">Order Summary</h3>
          <div className="space-y-2 mb-4 max-h-40 overflow-y-auto">
            {cartWithDetails.map((it) => (
              <div key={it.product_id} className="text-sm flex justify-between">
                <span className="text-[#2D1A1C]">{it.product.name} × {it.quantity}</span>
                <span className="font-semibold">₹{it.product.price * it.quantity}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2 mb-4">
            <Input value={couponCode} onChange={(e) => setCouponCode(e.target.value.toUpperCase())} placeholder="Coupon code" data-testid="coupon-input" />
            <Button type="button" onClick={applyCoupon} variant="outline" className="border-[#D4AF37] text-[#58181F]" data-testid="apply-coupon"><Tag className="h-4 w-4" /></Button>
          </div>
          <div className="text-[10px] text-[#7A686A] mb-4">Try MAHAKAL10 or OM100 or SHIVRATRI</div>

          <div className="space-y-2 text-sm border-t border-[#D4AF37]/25 pt-4">
            <div className="flex justify-between"><span className="text-[#7A686A]">Subtotal</span><span>₹{subtotal.toFixed(2)}</span></div>
            {discount > 0 && <div className="flex justify-between text-[#F97316]"><span>Discount ({coupon.code})</span><span>-₹{discount.toFixed(2)}</span></div>}
            <div className="flex justify-between"><span className="text-[#7A686A]">Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="flex justify-between"><span className="text-[#7A686A]">Tax (5%)</span><span>₹{tax.toFixed(2)}</span></div>
            <div className="flex justify-between text-lg pt-2 border-t border-[#D4AF37]/25">
              <span className="font-serif-heading text-[#58181F]">Total</span>
              <span className="font-serif-heading font-semibold text-[#58181F]" data-testid="total-amount">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <Button type="submit" disabled={placing} className="w-full mt-6 bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full h-12 font-semibold" data-testid="place-order-btn">
            {placing ? "Placing order…" : "Place Order"}
          </Button>
        </aside>
      </form>
    </div>
  );
};

export default Checkout;
