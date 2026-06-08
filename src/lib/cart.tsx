import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Book } from "./books";

type CartItem = { book: Book; qty: number };
type CartCtx = {
  items: CartItem[];
  add: (b: Book) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  count: number;
  total: number;
};

const Ctx = createContext<CartCtx | null>(null);

const STORAGE = "la-senda-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE, JSON.stringify(items));
    } catch {}
  }, [items]);

  const value = useMemo<CartCtx>(() => ({
    items,
    add: (b) =>
      setItems((prev) => {
        const existing = prev.find((i) => i.book.id === b.id);
        if (existing) return prev.map((i) => (i.book.id === b.id ? { ...i, qty: i.qty + 1 } : i));
        return [...prev, { book: b, qty: 1 }];
      }),
    remove: (id) => setItems((prev) => prev.filter((i) => i.book.id !== id)),
    setQty: (id, qty) =>
      setItems((prev) =>
        qty <= 0 ? prev.filter((i) => i.book.id !== id) : prev.map((i) => (i.book.id === id ? { ...i, qty } : i)),
      ),
    clear: () => setItems([]),
    count: items.reduce((s, i) => s + i.qty, 0),
    total: items.reduce((s, i) => s + i.qty * i.book.price, 0),
  }), [items]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useCart = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
};
