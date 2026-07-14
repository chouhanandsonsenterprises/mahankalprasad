import React from "react";

const Terms = () => (
  <div className="max-w-3xl mx-auto px-6 py-16" data-testid="terms-page">
    <div className="text-center mb-12">
      <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Legal</div>
      <h1 className="font-serif-heading text-5xl text-[#58181F] mt-2 tracking-tight">Terms & Conditions</h1>
    </div>
    <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-8 space-y-6">
      {[
        { h: "Acceptance of Terms", p: "By accessing or using mahankalprasad.in and placing an order, you agree to be bound by these Terms & Conditions." },
        { h: "Products", p: "All prasad items are prepared with utmost purity and blessed at Mahakaleshwar Temple, Ujjain. Product images are indicative; actual packaging may vary slightly." },
        { h: "Pricing & Payments", p: "All prices are in INR and inclusive of applicable taxes unless stated otherwise. We reserve the right to change prices at any time. Payment is required at the time of order (except COD)." },
        { h: "Orders", p: "An order is confirmed only after successful payment or COD verification. We reserve the right to refuse or cancel any order at our discretion." },
        { h: "Intellectual Property", p: "All content, images, logos and product descriptions are the property of CHOUHAN AND SONS ENTERPRISES and may not be reproduced without permission." },
        { h: "Limitation of Liability", p: "We are not liable for indirect, incidental or consequential damages arising out of use of the website or products." },
        { h: "Governing Law", p: "These terms are governed by the laws of India. Any disputes shall be subject to the exclusive jurisdiction of courts in Ujjain, Madhya Pradesh." },
        { h: "Contact", p: "For questions, reach us at arjunchouhan061@gmail.com or +91 9977002593." },
      ].map((s) => (
        <div key={s.h}>
          <h2 className="font-serif-heading text-xl text-[#58181F] mb-2">{s.h}</h2>
          <p className="text-[#2D1A1C]/80 leading-relaxed">{s.p}</p>
        </div>
      ))}
    </div>
  </div>
);

export default Terms;
