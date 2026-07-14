import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube, Mail, Phone, MapPin, Shield, Truck, CreditCard, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import api from "@/lib/api";
import { toast } from "sonner";
import { useLang } from "@/context/LanguageContext";

const Footer = () => {
  const { t, lang } = useLang();
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);

  const subscribe = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await api.post("/newsletter/subscribe", { email });
      toast.success("Subscribed! Har Har Mahadev 🙏");
      setEmail("");
    } catch (err) {
      toast.error(err?.response?.data?.detail || "Please try again");
    } finally {
      setBusy(false);
    }
  };

  return (
    <footer className="bg-[#1A0B0C] text-[#FDFBF7] mt-20" data-testid="site-footer">
      <div className="border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Truck, title: t("foot.fast.t"), sub: t("foot.fast.b") },
            { icon: Shield, title: t("foot.secure.t"), sub: t("foot.secure.b") },
            { icon: Award, title: t("foot.authentic.t"), sub: t("foot.authentic.b") },
            { icon: CreditCard, title: t("foot.returns.t"), sub: t("foot.returns.b") },
          ].map((b) => (
            <div key={b.title} className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full bg-[#D4AF37]/15 flex items-center justify-center flex-shrink-0">
                <b.icon className="h-5 w-5 text-[#D4AF37]" />
              </div>
              <div>
                <div className="font-serif-heading text-lg text-[#D4AF37]">{b.title}</div>
                <div className="text-xs text-[#FDFBF7]/70 mt-0.5">{b.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full gold-shine flex items-center justify-center">
              <span className="font-serif-heading text-[#58181F] text-xl leading-none">ॐ</span>
            </div>
            <div>
              <div className="font-serif-heading text-xl text-[#D4AF37]">{lang === "hi" ? "महांकाल प्रसाद" : "Mahankal Prasad"}</div>
              <div className="text-[10px] uppercase tracking-widest text-[#FDFBF7]/60">{t("nav.tagline")}</div>
            </div>
          </div>
          <p className="text-sm text-[#FDFBF7]/70 leading-relaxed">{t("foot.about")}</p>
          <p className="text-[11px] text-[#FDFBF7]/50 leading-relaxed mt-3 italic">{t("foot.disclaimer")}</p>
          <div className="flex gap-3 mt-5">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center hover:bg-[#D4AF37]/15 transition-colors" data-testid="social-instagram"><Instagram className="h-4 w-4" /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center hover:bg-[#D4AF37]/15 transition-colors" data-testid="social-facebook"><Facebook className="h-4 w-4" /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full border border-[#D4AF37]/40 flex items-center justify-center hover:bg-[#D4AF37]/15 transition-colors" data-testid="social-youtube"><Youtube className="h-4 w-4" /></a>
          </div>
        </div>

        <div>
          <h4 className="font-serif-heading text-lg text-[#D4AF37] mb-4">{t("foot.shop")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.allProducts")}</Link></li>
            <li><Link to="/shop?category=Prasad" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.prasad")}</Link></li>
            <li><Link to="/shop?category=Puja Items" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.puja")}</Link></li>
            <li><Link to="/shop?category=Spiritual" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.spiritual")}</Link></li>
            <li><Link to="/wishlist" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("nav.wishlist")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-heading text-lg text-[#D4AF37] mb-4">{t("foot.info")}</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.aboutUs")}</Link></li>
            <li><Link to="/contact" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.contactUs")}</Link></li>
            <li><Link to="/faq" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("nav.faqs")}</Link></li>
            <li><Link to="/shipping" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.shipping")}</Link></li>
            <li><Link to="/privacy" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.privacy")}</Link></li>
            <li><Link to="/terms" className="text-[#FDFBF7]/80 hover:text-[#D4AF37]">{t("foot.terms")}</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif-heading text-lg text-[#D4AF37] mb-4">{t("foot.getInTouch")}</h4>
          <ul className="space-y-3 text-sm text-[#FDFBF7]/80 mb-5">
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-[#D4AF37] flex-shrink-0" /> Ujjain, Madhya Pradesh, India</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-[#D4AF37]" /> +91 9977002593</li>
            <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-[#D4AF37]" /> arjunchouhan061@gmail.com</li>
          </ul>
          <form onSubmit={subscribe} className="space-y-2" data-testid="newsletter-form">
            <div className="text-xs uppercase tracking-widest text-[#D4AF37]/80">{t("foot.newsletter")}</div>
            <div className="flex gap-2">
              <Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t("foot.emailPh")}
                className="bg-white/5 border-[#D4AF37]/30 text-[#FDFBF7] placeholder:text-[#FDFBF7]/40" data-testid="newsletter-input" />
              <Button type="submit" disabled={busy} className="bg-[#F97316] hover:bg-[#F97316]/90 text-white" data-testid="newsletter-submit">{t("foot.subscribe")}</Button>
            </div>
          </form>
        </div>
      </div>

      <div className="border-t border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[#FDFBF7]/60">
          <div>© {new Date().getFullYear()} {t("foot.copyright")}</div>
          <div className="flex items-center gap-4">
            <span>{t("foot.secured")}</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-[#D4AF37]/20">Razorpay</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-[#D4AF37]/20">UPI</span>
            <span className="px-2 py-1 bg-white/5 rounded border border-[#D4AF37]/20">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
