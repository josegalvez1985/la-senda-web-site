import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag, Check } from "lucide-react";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { books, formatPrice } from "@/lib/books";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/libro/$id")({
  loader: ({ params }) => {
    const book = books.find((b) => b.id === params.id);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.book.title} — La Senda` },
          { name: "description", content: loaderData.book.description },
          { property: "og:title", content: loaderData.book.title },
          { property: "og:description", content: loaderData.book.description },
          { property: "og:image", content: loaderData.book.cover },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20 text-center">
        <div>
          <h1 className="font-display text-3xl text-primary">Libro no encontrado</h1>
          <Link to="/catalogo" className="mt-4 inline-block text-sm underline">Volver al catálogo</Link>
        </div>
      </div>
      <Footer />
    </div>
  ),
  errorComponent: () => (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center py-20">No pudimos cargar este libro.</div>
      <Footer />
    </div>
  ),
  component: BookDetail,
});

function BookDetail() {
  const { book } = Route.useLoaderData();
  const cart = useCart();
  const [added, setAdded] = useState(false);
  const related = books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <Link to="/catalogo" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
          <ArrowLeft className="h-4 w-4" /> Volver al catálogo
        </Link>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-2 gap-12 lg:gap-20">
        <div className="relative">
          <div className="absolute -inset-8 bg-sage/30 rounded-[2.5rem] blur-3xl" aria-hidden />
          <div className="relative aspect-[3/4] max-w-md mx-auto rounded-2xl overflow-hidden shadow-book">
            <img src={book.cover} alt={book.title} className="h-full w-full object-cover" />
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">{book.category}</div>
          <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">{book.title}</h1>
          <p className="mt-3 text-muted-foreground">por {book.author}</p>

          <div className="mt-8 text-3xl font-display text-primary">{formatPrice(book.price)}</div>

          <p className="mt-6 text-base leading-relaxed text-foreground/80">{book.description}</p>

          <div className="mt-10 flex gap-3">
            <button
              onClick={() => {
                cart.add(book);
                setAdded(true);
                setTimeout(() => setAdded(false), 1800);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition shadow-soft"
            >
              {added ? <><Check className="h-4 w-4" /> Agregado</> : <><ShoppingBag className="h-4 w-4" /> Agregar al carrito</>}
            </button>
            <Link to="/carrito" className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-6 py-3.5 text-sm font-medium hover:bg-secondary/50 transition">
              Ver carrito
            </Link>
          </div>

          <div className="mt-10 pt-8 border-t border-border grid grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Envío</div>
              <div>Llega en 3-5 días</div>
            </div>
            <div>
              <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mb-1">Disponibilidad</div>
              <div>En stock</div>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="font-display text-3xl text-primary mb-8">También te puede interesar</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {related.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
