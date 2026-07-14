import React from "react";

const Shipping = () => (
  <div className="max-w-3xl mx-auto px-6 py-16" data-testid="shipping-page">
    <div className="text-center mb-12">
      <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Policies</div>
      <h1 className="font-serif-heading text-5xl text-[#58181F] mt-2 tracking-tight">Shipping & Return</h1>
    </div>
    <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-8 space-y-6">
      {[
        { h: "Delivery Areas", p: "We ship across India via trusted courier partners including India Post, Delhivery, BlueDart and DTDC." },
        { h: "Delivery Time", p: "Metro cities: 3–5 business days. Other cities: 5–7 business days. Remote areas: up to 10 business days." },
        { h: "Shipping Charges", p: "FREE shipping on orders above ₹499. Flat ₹49 shipping fee applies on orders below ₹499. Cash on Delivery orders incur an additional ₹30 handling fee." },
        { h: "Order Tracking", p: "Once dispatched, tracking details are sent via SMS, WhatsApp and email. You can also track from 'My Orders' after logging in." },
        { h: "Damaged / Incorrect Items", p: "If you receive a damaged or incorrect product, please contact us within 24 hours of delivery with a photo. We will replace or refund at no cost to you." },
        { h: "Returns Policy", p: "Perishable prasad items (laddu, dry fruit prasad, etc.) are non-returnable due to their sacred nature. Non-perishable items (Rudraksha mala, puja kits, incense sticks, etc.) can be returned within 7 days of delivery in original packaging." },
        { h: "Cancellations", p: "Orders can be cancelled anytime before dispatch. Once dispatched, cancellation is not possible. Please email arjunchouhan061@gmail.com or call +91 9977002593 to cancel." },
        { h: "Refunds", p: "Approved refunds are processed within 5–7 business days to the original payment method. COD refunds are processed via UPI/bank transfer." },
      ].map((s) => (
        <div key={s.h}>
          <h2 className="font-serif-heading text-xl text-[#58181F] mb-2">{s.h}</h2>
          <p className="text-[#2D1A1C]/80 leading-relaxed">{s.p}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Shipping;
