import React from "react";

const PolicyPage = ({ title, sections }) => (
  <div className="max-w-3xl mx-auto px-6 py-16">
    <div className="text-center mb-12">
      <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">Legal</div>
      <h1 className="font-serif-heading text-5xl text-[#58181F] mt-2 tracking-tight">{title}</h1>
    </div>
    <div className="bg-white border border-[#D4AF37]/30 rounded-2xl p-8 space-y-6">
      {sections.map((s) => (
        <div key={s.h}>
          <h2 className="font-serif-heading text-xl text-[#58181F] mb-2">{s.h}</h2>
          <p className="text-[#2D1A1C]/80 leading-relaxed">{s.p}</p>
        </div>
      ))}
    </div>
  </div>
);

const Privacy = () => (
  <div data-testid="privacy-page">
    <PolicyPage title="Privacy Policy" sections={[
      { h: "Information We Collect", p: "We collect information you provide directly — such as name, email, phone, delivery address and payment details — when you register, place an order or contact us." },
      { h: "How We Use Your Information", p: "We use your details to process orders, arrange delivery, provide customer support, send order updates and (with consent) share offers and devotional content." },
      { h: "Data Security", p: "All data is stored securely with industry-standard encryption. Payment info is processed via trusted gateways (Razorpay, Paytm) and never stored on our servers." },
      { h: "Cookies", p: "We use minimal cookies to keep you logged in, remember your cart and analyse traffic. You can control cookies via your browser settings." },
      { h: "Sharing", p: "We never sell or rent your data. We share information only with courier partners and payment processors to fulfil your order." },
      { h: "Your Rights", p: "You can request access, correction or deletion of your data anytime by writing to arjunchouhan061@gmail.com." },
      { h: "Contact", p: "For any privacy concerns, contact CHOUHAN AND SONS ENTERPRISES at +91 9977002593." },
    ]} />
  </div>
);

export default Privacy;
