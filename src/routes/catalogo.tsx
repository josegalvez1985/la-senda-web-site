import { createFileRoute, Link } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { books, categories, type Book } from "@/lib/books";
import { z } from "zod";

const searchSchema = z.object({
  cat: z.enum(["Biblias", "Devocionales", "Teología", "Infantil", "Música", "Vida Cristiana"]).optional(),
});

export const Route = createFileRoute("/catalogo")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Catálogo — Librería La Senda" },
      { name: "description", content: "Explora nuestro catálogo de biblias, devocionales, teología, libros infantiles y música cristiana." },
    ],
  }),
  component: Catalogo,
});

function Catalogo() {
  const { cat } = Route.useSearch();
  const filtered: Book[] = cat ? books.filter((b) => b.category === cat) : books;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Catálogo</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary max-w-2xl">
            Lecturas para cada paso de tu camino.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-wrap gap-2 mb-10">
          <Link
            to="/catalogo"
            className={`px-4 py-2 rounded-full text-sm transition ${!cat ? "bg-primary text-primary-foreground" : "bg-secondary/60 hover:bg-secondary"}`}
          >
            Todos
          </Link>
          {categories.map((c) => (
            <Link
              key={c}
              to="/catalogo"
              search={{ cat: c }}
              className={`px-4 py-2 rounded-full text-sm transition ${cat === c ? "bg-primary text-primary-foreground" : "bg-secondary/60 hover:bg-secondary"}`}
            >
              {c}
            </Link>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-muted-foreground text-center py-20">No hay libros en esta categoría todavía.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filtered.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
