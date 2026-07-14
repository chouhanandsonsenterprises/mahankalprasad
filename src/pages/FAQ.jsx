import React from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const items = [
  { q: "Is the prasad really blessed at Mahakaleshwar Temple?", a: "Yes. Every item is offered to Bhagwan Mahakal at the Mahakaleshwar Jyotirlinga before being hygienically packed and dispatched." },
  { q: "How fresh is the prasad on delivery?", a: "We prepare and dispatch prasad in small batches. Shelf-life varies from 15–45 days depending on the product; details are on each product page." },
  { q: "Which areas do you deliver to?", a: "We ship pan-India via trusted courier partners. Typical delivery time is 3–7 business days." },
  { q: "What are the delivery charges?", a: "Delivery is FREE on orders above ₹499. For orders below ₹499, a flat ₹49 shipping fee applies." },
  { q: "Which payment methods do you support?", a: "We accept UPI, Credit/Debit Cards, Net Banking, Razorpay, Paytm and Cash on Delivery." },
  { q: "Can I return or cancel my order?", a: "Perishable prasad items are non-returnable. However, orders can be cancelled before dispatch. See our Shipping & Return Policy for full details." },
  { q: "Do you offer bulk / temple / gifting orders?", a: "Yes! Please contact us at +91 9977002593 or email arjunchouhan061@gmail.com for bulk and custom gifting inquiries." },
  { q: "How do I track my order?", a: "Once your order is dispatched, we send a tracking link on your registered email and WhatsApp. You can also track it under 'My Orders' after logging in." },
];

const FAQ = () => (
  <div className="max-w-3xl mx-auto px-6 py-16" data-testid="faq-page">
    <div className="text-center mb-12">
      <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Questions</div>
      <h1 className="font-serif-heading text-5xl md:text-6xl text-[#58181F] mt-2 tracking-tight">Frequently Asked</h1>
    </div>
    <Accordion type="single" collapsible className="space-y-3">
      {items.map((it, i) => (
        <AccordionItem key={it.q} value={`item-${i}`} className="bg-white border border-[#D4AF37]/30 rounded-2xl px-6" data-testid={`faq-${i}`}>
          <AccordionTrigger className="font-serif-heading text-lg text-[#58181F] hover:no-underline">{it.q}</AccordionTrigger>
          <AccordionContent className="text-[#2D1A1C]/80 leading-relaxed">{it.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </div>
);

export default FAQ;
