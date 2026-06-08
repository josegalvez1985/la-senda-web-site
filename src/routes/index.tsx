import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Heart, Truck, Sparkles } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookCard } from "@/components/BookCard";
import { books, categories } from "@/lib/books";
import heroImg from "@/assets/hero-bible.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Librería La Senda — Libros Cristianos en Luque" },
      { name: "description", content: "22 años guiando los pasos hacia la verdad de Cristo. Descubre biblias, devocionales y libros que edifican tu fe." },
    ],
  }),
  component: Home,
});

function Home() {
  const featured = books.filter((b) => b.featured);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-20 lg:pt-20 lg:pb-28 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-background/70 backdrop-blur px-4 py-1.5 text-xs uppercase tracking-[0.18em] text-primary border border-border/60">
              <Sparkles className="h-3 w-3 text-gold" />
              22 años en Luque
            </div>
            <h1 className="mt-6 font-display text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-primary">
              Libros que <em className="text-gold not-italic font-normal">guían</em><br />
              tus pasos hacia<br />
              la verdad.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Una librería cristiana dedicada a quienes buscan crecer en fe, sabiduría y comunión.
              Compra y vende libros que transforman vidas.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/catalogo"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition shadow-soft"
              >
                Explorar catálogo <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/nosotros"
                className="inline-flex items-center gap-2 rounded-full bg-background border border-border px-6 py-3 text-sm font-medium hover:bg-secondary/50 transition"
              >
                Conoce La Senda
              </Link>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 max-w-md">
              <Stat n="22" label="Años" />
              <Stat n="2K+" label="Títulos" />
              <Stat n="6" label="Categorías" />
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 bg-sage/40 rounded-[2.5rem] blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-[2rem] shadow-book border border-border/60">
              <img src={heroImg} alt="Biblia abierta con hojas de eucalipto" className="w-full h-[460px] lg:h-[560px] object-cover" />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-background rounded-2xl shadow-soft border border-border/60 p-4 flex items-center gap-3 max-w-[260px]">
              <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-12 w-12 rounded-full" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Recomendado</div>
                <div className="text-sm font-medium">Devociones Diarias</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Explora</div>
            <h2 className="font-display text-4xl md:text-5xl text-primary">Categorías</h2>
          </div>
          <Link to="/catalogo" className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-1">
            Ver todo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {categories.map((c) => (
            <Link
              key={c}
              to="/catalogo"
              search={{ cat: c }}
              className="group relative aspect-square rounded-2xl bg-secondary/50 hover:bg-primary transition-colors p-4 flex flex-col justify-between"
            >
              <BookOpen className="h-5 w-5 text-primary group-hover:text-gold transition-colors" />
              <div className="font-display text-lg text-foreground group-hover:text-primary-foreground transition-colors">{c}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-gold mb-2">Selección</div>
            <h2 className="font-display text-4xl md:text-5xl text-primary">Destacados del mes</h2>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {featured.map((b) => <BookCard key={b.id} book={b} />)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-primary text-primary-foreground p-10 md:p-16 grid md:grid-cols-3 gap-10">
          <Value icon={<Heart className="h-5 w-5" />} title="Compra y venta" body="Recibimos tus libros usados en buen estado y los devolvemos a circular." />
          <Value icon={<Truck className="h-5 w-5" />} title="Envíos a todo el país" body="Llevamos cada lectura hasta tu hogar con cuidado y rapidez." />
          <Value icon={<BookOpen className="h-5 w-5" />} title="Asesoría espiritual" body="Te orientamos para encontrar la lectura que necesitas hoy." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <div className="font-display text-3xl text-primary">{n}</div>
      <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function Value({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <div className="h-10 w-10 rounded-full bg-primary-foreground/10 flex items-center justify-center text-gold mb-4">{icon}</div>
      <h3 className="font-display text-2xl mb-2">{title}</h3>
      <p className="text-sm text-primary-foreground/70">{body}</p>
    </div>
  );
}
