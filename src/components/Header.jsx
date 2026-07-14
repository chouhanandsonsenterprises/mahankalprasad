import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingBag, Heart, User, Menu, X, LogOut, Package, Globe } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useLang } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { user, logout } = useAuth();
  const { cartCount, wishlist } = useCart();
  const { t, lang, toggle } = useLang();
  const [q, setQ] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const onSearch = (e) => {
    e.preventDefault();
    if (q.trim()) navigate(`/shop?q=${encodeURIComponent(q.trim())}`);
    setMobileOpen(false);
  };

  const navLinks = [
    { to: "/", label: t("nav.home") },
    { to: "/shop", label: t("nav.shop") },
    { to: "/about", label: t("nav.about") },
    { to: "/contact", label: t("nav.contact") },
    { to: "/faq", label: t("nav.faqs") },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-[#FDFBF7]/90 border-b border-[#D4AF37]/30" data-testid="site-header">
      {/* Top strip */}
      <div className="bg-[#58181F] text-[#FDFBF7] text-xs py-2 px-4 text-center tracking-wide">
        <span className="font-medium">{t("top.freeShip")}</span>
        <span className="mx-3 text-[#D4AF37]">•</span>
        <span>{t("top.offered")}</span>
        <span className="mx-3 text-[#D4AF37]">•</span>
        <span className="text-[#FDFBF7]/80 italic">{t("top.disclaimer")}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-3" data-testid="logo-link">
          <div className="w-11 h-11 rounded-full gold-shine flex items-center justify-center shadow-md">
            <span className="font-serif-heading text-[#58181F] text-2xl leading-none">ॐ</span>
          </div>
          <div>
            <div className="font-serif-heading text-xl md:text-2xl font-semibold text-[#58181F] leading-none">
              {lang === "hi" ? "महांकाल प्रसाद" : "Mahankal Prasad"}
            </div>
            <div className="text-[10px] md:text-xs text-[#7A686A] tracking-widest uppercase mt-0.5">{t("nav.tagline")}</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} className="text-sm font-medium text-[#2D1A1C] hover:text-[#58181F] tracking-wide transition-colors" data-testid={`nav-link-${l.to.replace("/", "") || "home"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <form onSubmit={onSearch} className="hidden md:flex flex-1 max-w-xs" data-testid="search-form">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A686A]" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("nav.searchPh")}
              className="pl-9 bg-white border-[#D4AF37]/40 focus-visible:ring-[#D4AF37]" data-testid="search-input" />
          </div>
        </form>

        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={toggle}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#D4AF37]/50 text-xs font-semibold text-[#58181F] hover:bg-[#D4AF37]/10 transition-colors"
            data-testid="lang-toggle"
            aria-label="Toggle language"
          >
            <Globe className="h-3.5 w-3.5" />
            {t("lang.toggle")}
          </button>

          <Link to="/wishlist" className="relative p-2 rounded-full hover:bg-[#D4AF37]/10 transition-colors" data-testid="wishlist-icon">
            <Heart className="h-5 w-5 text-[#58181F]" />
            {wishlist.items?.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">{wishlist.items.length}</span>
            )}
          </Link>
          <Link to="/cart" className="relative p-2 rounded-full hover:bg-[#D4AF37]/10 transition-colors" data-testid="cart-icon">
            <ShoppingBag className="h-5 w-5 text-[#58181F]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F97316] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center" data-testid="cart-count">{cartCount}</span>
            )}
          </Link>

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="p-2 rounded-full hover:bg-[#D4AF37]/10 transition-colors" data-testid="user-menu-trigger">
                  <User className="h-5 w-5 text-[#58181F]" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-serif-heading text-[#58181F]">Jai Mahakal, {user.name.split(" ")[0]}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/orders")} data-testid="menu-orders">
                  <Package className="mr-2 h-4 w-4" /> {t("nav.myOrders")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/wishlist")}>
                  <Heart className="mr-2 h-4 w-4" /> {t("nav.wishlist")}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => { logout(); navigate("/"); }} data-testid="menu-logout">
                  <LogOut className="mr-2 h-4 w-4" /> {t("nav.logout")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link to="/login" className="hidden sm:block" data-testid="login-link">
              <Button variant="ghost" className="text-[#58181F] hover:bg-[#D4AF37]/10">{t("nav.login")}</Button>
            </Link>
          )}

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} data-testid="mobile-menu-toggle">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-[#D4AF37]/30 bg-[#FDFBF7] px-4 py-4 space-y-3" data-testid="mobile-menu">
          <form onSubmit={onSearch}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#7A686A]" />
              <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("nav.searchPh")} className="pl-9 bg-white" />
            </div>
          </form>
          <button onClick={toggle} className="w-full text-left py-2 text-[#58181F] font-medium flex items-center gap-2" data-testid="lang-toggle-mobile">
            <Globe className="h-4 w-4" /> {t("lang.toggle")}
          </button>
          {navLinks.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="block py-2 text-[#2D1A1C] font-medium border-b border-[#D4AF37]/20">{l.label}</Link>
          ))}
          {!user && (
            <Link to="/login" onClick={() => setMobileOpen(false)} className="block py-2 text-[#58181F] font-semibold">{t("nav.login")}</Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
