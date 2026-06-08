import { createFileRoute } from "@tanstack/react-router";
import { Clock, MapPin, Mail, Phone, Car } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CONTACT_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE, whatsappUrl } from "@/lib/contact";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto — Librería La Senda" },
      { name: "description", content: "Visítanos en Luque. Lunes a sábado de 08:00 a 18:00. Estacionamiento gratuito." },
    ],
  }),
  component: Contacto,
});

function Contacto() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="bg-gradient-hero">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-xs uppercase tracking-[0.2em] text-gold mb-3">Visítanos</div>
          <h1 className="font-display text-5xl md:text-6xl text-primary max-w-2xl">
            Será un gusto recibirte en la librería.
          </h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid lg:grid-cols-[1fr_1.2fr] gap-12">
        <div className="space-y-6">
          <Info icon={<Clock />} title="Horario de atención" body={["Lunes a Sábado", "08:00 a 18:00"]} />
          <Info icon={<MapPin />} title="Dirección" body={[CONTACT_ADDRESS]} />
          <Info icon={<Car />} title="Estacionamiento" body={["Gratuito para clientes"]} />
          <Info icon={<Phone />} title="Teléfono" body={[CONTACT_PHONE]} />
          <Info icon={<Mail />} title="Email" body={[CONTACT_EMAIL]} />
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const f = new FormData(e.currentTarget);
            const message = [
              `Hola, soy ${f.get("name")} (${f.get("email")}).`,
              `Asunto: ${f.get("subject")}`,
              "",
              String(f.get("message") ?? ""),
            ].join("\n");
            window.open(whatsappUrl(message), "_blank", "noopener");
          }}
          className="rounded-3xl bg-card border border-border/60 p-8 md:p-10 space-y-5"
        >
          <h2 className="font-display text-3xl text-primary">Escríbenos</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Nombre" name="name" />
            <Field label="Correo" name="email" type="email" />
          </div>
          <Field label="Asunto" name="subject" />
          <div>
            <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">Mensaje</label>
            <textarea required name="message" rows={5} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <button className="rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition">
            Enviar por WhatsApp
          </button>
        </form>
      </section>

      <Footer />
    </div>
  );
}

function Info({ icon, title, body }: { icon: React.ReactNode; title: string; body: string[] }) {
  return (
    <div className="flex gap-4 p-6 rounded-2xl bg-secondary/40">
      <div className="h-11 w-11 shrink-0 rounded-full bg-primary text-primary-foreground flex items-center justify-center [&_svg]:h-5 [&_svg]:w-5">{icon}</div>
      <div>
        <div className="font-display text-lg text-primary">{title}</div>
        {body.map((b, i) => <div key={i} className="text-sm text-muted-foreground">{b}</div>)}
      </div>
    </div>
  );
}

function Field({ label, name, type = "text" }: { label: string; name: string; type?: string }) {
  return (
    <div>
      <label className="block text-xs uppercase tracking-[0.18em] text-muted-foreground mb-2">{label}</label>
      <input required name={name} type={type} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
    </div>
  );
}
