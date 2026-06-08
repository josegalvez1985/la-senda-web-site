import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/books";
import { whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/carrito")({
  head: () => ({
    meta: [
      { title: "Carrito — La Senda" },
      { name: "description", content: "Revisa los libros que has seleccionado." },
    ],
  }),
  component: Cart,
});

function Cart() {
  const { items, setQty, remove, total, clear } = useCart();

  function checkout() {
    const lines = items.map(
      ({ book, qty }) => `• ${qty}x ${book.title} — ${formatPrice(book.price * qty)}`,
    );
    const message = [
      "¡Hola! Quiero hacer este pedido en Librería La Senda:",
      "",
      ...lines,
      "",
      `Total: ${formatPrice(total)}`,
    ].join("\n");
    window.open(whatsappUrl(message), "_blank", "noopener");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Tu selección</div>
        <h1 className="font-display text-4xl md:text-5xl text-primary mb-10">Carrito</h1>

        {items.length === 0 ? (
          <div className="rounded-2xl bg-secondary/40 p-12 text-center">
            <ShoppingBag className="h-10 w-10 mx-auto text-primary mb-4" />
            <p className="text-lg font-display">Tu carrito está vacío</p>
            <p className="text-sm text-muted-foreground mt-2 mb-6">Descubre lecturas que edifiquen tu fe.</p>
            <Link to="/catalogo" className="inline-flex rounded-full bg-primary px-6 py-3 text-sm text-primary-foreground hover:bg-primary/90 transition">
              Explorar catálogo
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-10">
            <div className="space-y-4">
              {items.map(({ book, qty }) => (
                <div key={book.id} className="flex gap-4 p-4 rounded-2xl bg-card border border-border/60">
                  <Link to="/libro/$id" params={{ id: book.id }} className="shrink-0">
                    <img src={book.cover} alt={book.title} className="h-28 w-20 rounded-lg object-cover" />
                  </Link>
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{book.category}</div>
                    <Link to="/libro/$id" params={{ id: book.id }} className="font-display text-lg block truncate hover:text-primary">
                      {book.title}
                    </Link>
                    <div className="text-xs text-muted-foreground">{book.author}</div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button onClick={() => setQty(book.id, qty - 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary rounded-l-full"><Minus className="h-3 w-3" /></button>
                        <span className="w-8 text-center text-sm">{qty}</span>
                        <button onClick={() => setQty(book.id, qty + 1)} className="h-8 w-8 flex items-center justify-center hover:bg-secondary rounded-r-full"><Plus className="h-3 w-3" /></button>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="font-medium">{formatPrice(book.price * qty)}</div>
                        <button onClick={() => remove(book.id)} className="text-muted-foreground hover:text-destructive" aria-label="Eliminar">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-destructive underline">
                Vaciar carrito
              </button>
            </div>

            <aside className="h-fit rounded-2xl bg-primary text-primary-foreground p-6 sticky top-24">
              <h2 className="font-display text-2xl mb-6">Resumen</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-primary-foreground/70">Subtotal</span><span>{formatPrice(total)}</span></div>
                <div className="flex justify-between"><span className="text-primary-foreground/70">Envío</span><span>Por calcular</span></div>
              </div>
              <div className="mt-6 pt-6 border-t border-primary-foreground/20 flex justify-between text-lg">
                <span>Total</span>
                <span className="font-display">{formatPrice(total)}</span>
              </div>
              <button onClick={checkout} className="mt-6 w-full rounded-full bg-gold text-gold-foreground py-3 text-sm font-medium hover:opacity-90 transition">
                Finalizar compra por WhatsApp
              </button>
              <p className="mt-3 text-xs text-primary-foreground/60 text-center">Coordinamos pago y envío por WhatsApp</p>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}
