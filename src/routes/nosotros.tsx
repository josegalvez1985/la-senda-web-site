import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import heroImg from "@/assets/hero-bible.jpg";

export const Route = createFileRoute("/nosotros")({
  head: () => ({
    meta: [
      { title: "Nosotros — Librería La Senda" },
      { name: "description", content: "Conoce la historia de Librería La Senda, 22 años acompañando a la comunidad cristiana en Luque." },
    ],
  }),
  component: Nosotros,
});

function Nosotros() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="h-20 w-20 mx-auto rounded-full mb-6" />
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Nuestra historia</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary leading-tight">
            22 años guiando los pasos<br />hacia la verdad de Cristo.
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            Desde 2003, Librería La Senda ha sido un espacio donde la palabra escrita se convierte en
            herramienta de fe, formación y consuelo para miles de familias.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="rounded-3xl overflow-hidden shadow-book">
          <img src={heroImg} alt="Librería" className="w-full h-[500px] object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl md:text-4xl text-primary mb-6">Una librería con propósito</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Nacimos con la convicción de que cada libro puede ser un punto de inflexión en la vida espiritual
            de una persona. Por eso seleccionamos cuidadosamente cada título que llega a nuestros estantes.
          </p>
          <p className="text-foreground/80 leading-relaxed">
            Ofrecemos compra y venta de libros cristianos en buen estado, atención personalizada y un
            ambiente acogedor donde puedes preguntar, leer y descubrir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid md:grid-cols-3 gap-6">
          <Card title="Fe" body="Promovemos lecturas que fortalecen la relación con Dios." />
          <Card title="Comunidad" body="Acompañamos a pastores, líderes y familias en su camino." />
          <Card title="Servicio" body="Atención cálida, asesoría honesta y dedicación." />
        </div>
      </section>

      <Footer />
    </div>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl bg-card border border-border/60 p-8">
      <h3 className="font-display text-2xl text-primary mb-3">{title}</h3>
      <p className="text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
