import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { CheckCircle2, Package, Truck, Home } from "lucide-react";
import api from "@/lib/api";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then((r) => setOrder(r.data));
  }, [id]);

  if (!order) return <div className="max-w-4xl mx-auto px-6 py-20 text-center text-[#7A686A]">Loading…</div>;

  const stages = [
    { key: "placed", label: "Order Placed", icon: CheckCircle2 },
    { key: "processing", label: "Processing", icon: Package },
    { key: "shipped", label: "Shipped", icon: Truck },
    { key: "delivered", label: "Delivered", icon: Home },
  ];
  const activeIdx = stages.findIndex((s) => s.key === order.status);

  return (
    <div className="max-w-4xl mx-auto px-6 py-12" data-testid="order-detail-page">
      <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-8">
        <div className="flex items-start justify-between flex-wrap gap-4 mb-6">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#F97316] font-semibold">Order</div>
            <h1 className="font-serif-heading text-3xl text-[#58181F] mt-1">#{order.order_number}</h1>
            <div className="text-sm text-[#7A686A] mt-1">{new Date(order.created_at).toLocaleString("en-IN")}</div>
          </div>
          <div className="text-right">
            <div className="text-xs uppercase text-[#7A686A]">Total</div>
            <div className="font-serif-heading text-3xl text-[#58181F] font-semibold">₹{order.total}</div>
          </div>
        </div>

        {/* Tracking */}
        <div className="border border-[#D4AF37]/25 rounded-2xl p-6 bg-[#FDFBF7] mb-8">
          <div className="grid grid-cols-4 gap-2">
            {stages.map((s, i) => {
              const done = i <= Math.max(0, activeIdx);
              return (
                <div key={s.key} className="flex flex-col items-center text-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${done ? "bg-[#F97316] text-white" : "bg-[#D4AF37]/20 text-[#7A686A]"}`}>
                    <s.icon className="h-4 w-4" />
                  </div>
                  <div className={`mt-2 text-xs ${done ? "text-[#58181F] font-semibold" : "text-[#7A686A]"}`}>{s.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <h3 className="font-serif-heading text-xl text-[#58181F] mb-4">Items</h3>
        <div className="space-y-3 mb-8">
          {order.items.map((it) => (
            <div key={it.product_id} className="flex items-center gap-4 p-3 border border-[#D4AF37]/20 rounded-xl">
              <img src={it.image} alt={it.name} className="w-16 h-16 rounded-lg object-cover" />
              <div className="flex-1">
                <div className="font-serif-heading text-lg text-[#58181F]">{it.name}</div>
                <div className="text-sm text-[#7A686A]">₹{it.price} × {it.quantity}</div>
              </div>
              <div className="font-serif-heading text-lg font-semibold">₹{it.line_total}</div>
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <div>
            <h4 className="font-serif-heading text-lg text-[#58181F] mb-2">Delivery Address</h4>
            <div className="text-sm text-[#2D1A1C]/80 leading-relaxed">
              {order.address.full_name}<br />
              {order.address.line1}<br />
              {order.address.line2 && <>{order.address.line2}<br /></>}
              {order.address.city}, {order.address.state} {order.address.pincode}<br />
              {order.address.country}<br />
              Phone: {order.address.phone}
            </div>
          </div>
          <div>
            <h4 className="font-serif-heading text-lg text-[#58181F] mb-2">Payment & Summary</h4>
            <div className="text-sm space-y-1 text-[#2D1A1C]/80">
              <div>Method: <span className="font-semibold uppercase">{order.payment_method}</span></div>
              <div>Status: <span className="font-semibold">{order.payment_status.toUpperCase()}</span></div>
              <div>Subtotal: ₹{order.subtotal}</div>
              {order.discount > 0 && <div>Discount: -₹{order.discount}</div>}
              <div>Shipping: {order.shipping === 0 ? "FREE" : `₹${order.shipping}`}</div>
              <div>Tax: ₹{order.tax}</div>
              <div className="font-serif-heading text-lg text-[#58181F] pt-2">Total: ₹{order.total}</div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link to="/shop" className="text-[#58181F] font-semibold hover:text-[#F97316]">← Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
