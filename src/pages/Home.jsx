import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Star, Truck, Shield, HeartHandshake, Flame, Package, CreditCard, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { useLang } from "@/context/LanguageContext";

const Home = () => {
  const { t } = useLang();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get("/products", { params: { featured: true } }).then((r) => setFeatured(r.data)).catch(() => {});
  }, []);

  return (
    <div data-testid="home-page">
      {/* HERO */}
      <section className="relative temple-hero min-h-[92vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 grain-texture opacity-40 mix-blend-overlay pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 py-24 relative z-10 grid lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-3 text-[#D4AF37] mb-6">
              <span className="h-px w-10 bg-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.3em]">{t("hero.eyebrow")}</span>
            </div>
            <h1 className="font-serif-heading text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#FDFBF7] font-semibold tracking-tight">
              {t("hero.h1a")}<br />
              <span className="text-[#D4AF37] italic">{t("hero.h1b")}</span><br />
              {t("hero.h1c")}
            </h1>
            <p className="mt-6 text-lg text-[#FDFBF7]/85 max-w-xl leading-relaxed">{t("hero.sub")}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-[#F97316] hover:bg-[#F97316]/90 text-white rounded-full px-8 h-12 font-semibold tracking-wide" data-testid="hero-shop-btn">
                  {t("hero.exploreCta")}
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="rounded-full border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#58181F] bg-transparent px-8 h-12" data-testid="hero-about-btn">
                  {t("hero.storyCta")}
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-6 text-[#FDFBF7]/80 text-sm">
              <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-[#D4AF37]" /> {t("hero.devotees")}</div>
              <div className="flex items-center gap-2"><Star className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" /> {t("hero.rating")}</div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2 }} className="hidden lg:block relative">
            <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] shadow-2xl border-4 border-[#D4AF37]/40">
              <img src="https://images.pexels.com/photos/28437003/pexels-photo-28437003.jpeg" alt="Mahakal Laddu Prasad" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-8 -left-8 bg-[#FDFBF7] rounded-2xl p-5 shadow-xl border border-[#D4AF37]/40 hidden xl:block">
              <div className="text-xs uppercase tracking-widest text-[#F97316] font-semibold">{t("hero.bestseller")}</div>
              <div className="font-serif-heading text-lg text-[#58181F] mt-1">Mahakal Laddu Prasad</div>
              <div className="text-sm text-[#7A686A] mt-1">{t("hero.priceFrom")}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Welcome */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="divider-om font-serif-heading">ॐ नमः शिवाय</div>
        <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-6 tracking-tight">{t("welcome.title")}</h2>
        <p className="mt-6 text-[#2D1A1C]/80 text-lg leading-relaxed">{t("welcome.body")}</p>
      </section>

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">{t("featured.eyebrow")}</div>
            <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-2 tracking-tight">{t("featured.title")}</h2>
          </div>
          <Link to="/shop" className="text-[#58181F] font-semibold hover:text-[#F97316] transition-colors" data-testid="view-all-link">{t("featured.viewAll")}</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.slice(0, 4).map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.08 }} className={i === 0 ? "lg:col-span-2 lg:row-span-2" : ""}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-[#FDFBF7] py-20 border-y border-[#D4AF37]/25">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">{t("why.eyebrow")}</div>
            <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-2 tracking-tight">{t("why.title")}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Flame, title: t("why.blessed.t"), body: t("why.blessed.b") },
              { icon: HeartHandshake, title: t("why.pure.t"), body: t("why.pure.b") },
              { icon: Truck, title: t("why.deliver.t"), body: t("why.deliver.b") },
              { icon: Shield, title: t("why.secure.t"), body: t("why.secure.b") },
            ].map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-7 border border-[#D4AF37]/30 shadow-sm lift-hover">
                <div className="w-12 h-12 rounded-full bg-[#58181F] flex items-center justify-center mb-5">
                  <f.icon className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h3 className="font-serif-heading text-xl text-[#58181F]">{f.title}</h3>
                <p className="text-sm text-[#7A686A] mt-2 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ordering */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">{t("order.eyebrow")}</div>
          <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-2 tracking-tight">{t("order.title")}</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 relative">
          {[
            { icon: Package, title: t("order.s1.t"), body: t("order.s1.b") },
            { icon: CreditCard, title: t("order.s2.t"), body: t("order.s2.b") },
            { icon: Truck, title: t("order.s3.t"), body: t("order.s3.b") },
          ].map((s, i) => (
            <div key={s.title} className="relative bg-white rounded-2xl p-8 border border-[#D4AF37]/30 shadow-sm">
              <div className="absolute -top-5 left-8 w-11 h-11 rounded-full bg-[#F97316] text-white font-serif-heading text-xl flex items-center justify-center shadow-md">{i + 1}</div>
              <s.icon className="h-8 w-8 text-[#58181F] mt-4" />
              <h3 className="font-serif-heading text-2xl text-[#58181F] mt-3">{s.title}</h3>
              <p className="text-sm text-[#7A686A] mt-2 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#58181F] text-[#FDFBF7] py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">{t("rev.eyebrow")}</div>
            <h2 className="font-serif-heading text-4xl sm:text-5xl mt-2 tracking-tight">{t("rev.title")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rajesh Sharma", loc: "Mumbai, MH", body: "Received the Mahakal Laddu Prasad on Shivratri. The fragrance and taste took me straight to Ujjain. Har Har Mahadev!" },
              { name: "Priya Verma", loc: "Delhi", body: "The Rudraksha Mala is beautifully strung and feels genuinely energised. Packaging was premium. Highly recommend." },
              { name: "Anil Kumar", loc: "Bengaluru, KA", body: "Ordered the Puja Kit for my parents on their anniversary. They were moved to tears. Thank you Mahankal Prasad." },
            ].map((r) => (
              <div key={r.name} className="bg-[#1A0B0C] rounded-2xl p-7 border border-[#D4AF37]/25">
                <div className="flex gap-1 mb-3">
                  {["s1","s2","s3","s4","s5"].map((sid) => <Star key={sid} className="h-4 w-4 fill-[#D4AF37] text-[#D4AF37]" />)}
                </div>
                <p className="text-[#FDFBF7]/85 leading-relaxed italic">"{r.body}"</p>
                <div className="mt-5 pt-4 border-t border-[#D4AF37]/20">
                  <div className="font-serif-heading text-lg text-[#D4AF37]">{r.name}</div>
                  <div className="text-xs text-[#FDFBF7]/60">{r.loc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="divider-om font-serif-heading">ॐ</div>
        <h2 className="font-serif-heading text-4xl sm:text-5xl text-[#58181F] mt-6 tracking-tight">{t("cta.title")}</h2>
        <p className="mt-4 text-[#7A686A] text-lg">{t("cta.sub")}</p>
        <Link to="/shop" className="inline-block mt-8">
          <Button size="lg" className="bg-[#58181F] hover:bg-[#F97316] text-[#FDFBF7] rounded-full px-10 h-12 font-semibold tracking-wide" data-testid="cta-shop-btn">{t("cta.btn")}</Button>
        </Link>
      </section>
    </div>
  );
};

export default Home;
