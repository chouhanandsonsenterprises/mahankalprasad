import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const Shop = () => {
  const { t } = useLang();
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [q, setQ] = useState(params.get("q") || "");
  const [category, setCategory] = useState(params.get("category") || "all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/products/categories").then((r) => setCategories(r.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    api.get("/products", { params: { q: q || undefined, category: category !== "all" ? category : undefined } })
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [q, category]);

  const applySearch = (e) => {
    e.preventDefault();
    setParams({ ...(q ? { q } : {}), ...(category !== "all" ? { category } : {}) });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-14" data-testid="shop-page">
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-[0.25em] text-[#F97316] font-semibold">{t("shop.eyebrow")}</div>
        <h1 className="font-serif-heading text-5xl text-[#58181F] mt-2 tracking-tight">{t("shop.title")}</h1>
        <p className="mt-3 text-[#7A686A]">{t("shop.sub")}</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-10">
        <form onSubmit={applySearch} className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A686A]" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("shop.searchPh")}
            className="pl-11 h-12 bg-white border-[#D4AF37]/40 focus-visible:ring-[#D4AF37]" data-testid="shop-search" />
        </form>
        <div className="flex gap-2 overflow-x-auto pb-1">
          <Button
            variant={category === "all" ? "default" : "outline"}
            onClick={() => setCategory("all")}
            className={`rounded-full whitespace-nowrap ${category === "all" ? "bg-[#58181F] text-[#FDFBF7]" : "border-[#D4AF37]/50 text-[#58181F]"}`}
            data-testid="cat-all"
          >
            {t("shop.all")}
          </Button>
          {categories.map((c) => (
            <Button key={c}
              variant={category === c ? "default" : "outline"}
              onClick={() => setCategory(c)}
              className={`rounded-full whitespace-nowrap ${category === c ? "bg-[#58181F] text-[#FDFBF7]" : "border-[#D4AF37]/50 text-[#58181F]"}`}
              data-testid={`cat-${c.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {c}
            </Button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="text-center py-20 text-[#7A686A]">{t("shop.loading")}</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-[#7A686A]" data-testid="no-products">{t("shop.empty")}</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="products-grid">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Shop;
