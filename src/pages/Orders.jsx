import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Orders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) api.get("/orders").then((r) => setOrders(r.data));
  }, [user]);

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="font-serif-heading text-3xl text-[#58181F]">Please login</h1>
        <Link to="/login" className="inline-block mt-6"><Button className="bg-[#58181F] text-[#FDFBF7] rounded-full px-8">Login</Button></Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12" data-testid="orders-page">
      <h1 className="font-serif-heading text-5xl text-[#58181F] mb-10 tracking-tight">My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-[#D4AF37]/25">
          <Package className="h-16 w-16 mx-auto text-[#D4AF37] mb-4" />
          <p className="text-[#7A686A] mb-6">No orders yet. Begin your divine journey.</p>
          <Link to="/shop"><Button className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-8">Shop Now</Button></Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <Link key={o.id} to={`/orders/${o.id}`} className="block bg-white border border-[#D4AF37]/25 rounded-2xl p-5 hover:border-[#D4AF37] lift-hover" data-testid={`order-${o.order_number}`}>
              <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                  <div className="font-serif-heading text-lg text-[#58181F]">Order #{o.order_number}</div>
                  <div className="text-xs text-[#7A686A]">{new Date(o.created_at).toLocaleString("en-IN")}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif-heading text-xl text-[#58181F] font-semibold">₹{o.total}</div>
                  <div className="text-xs uppercase tracking-widest text-[#F97316] font-semibold">{o.status}</div>
                </div>
              </div>
              <div className="mt-3 text-sm text-[#7A686A]">
                {o.items.length} item(s) · Payment: {o.payment_method.toUpperCase()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
