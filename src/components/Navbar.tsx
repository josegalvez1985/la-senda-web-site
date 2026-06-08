import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.asset.json";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Inicio" },
  { to: "/catalogo", label: "Catálogo" },
  { to: "/nosotros", label: "Nosotros" },
  { to: "/contacto", label: "Contacto" },
];

export function Navbar() {
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const { location } = useRouterState();

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <img src={logo.url} alt="La Senda" className="h-10 w-10 rounded-full object-cover ring-1 ring-border" />
          <div className="leading-tight">
            <div className="font-display text-lg text-primary">La Senda</div>
            <div className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">Librería Cristiana</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => {
            const active = location.pathname === n.to || (n.to !== "/" && location.pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "px-4 py-2 text-sm rounded-full transition-colors",
                  active ? "text-primary font-medium" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/carrito"
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60 hover:bg-secondary transition"
            aria-label="Carrito"
          >
            <ShoppingBag className="h-4 w-4 text-primary" />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 h-5 min-w-5 px-1 rounded-full bg-gold text-gold-foreground text-[10px] font-semibold flex items-center justify-center">
                {count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-full bg-secondary/60"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menú"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background">
          <div className="px-4 py-3 flex flex-col gap-1">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2.5 rounded-lg text-sm hover:bg-secondary/60"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
