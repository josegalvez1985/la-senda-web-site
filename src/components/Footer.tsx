import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.asset.json";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <img src={logo.url} alt="La Senda" className="h-12 w-12 rounded-full" />
            <div>
              <div className="font-display text-xl text-primary">La Senda</div>
              <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                22 años guiando los pasos hacia la verdad de Cristo
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-muted-foreground max-w-md">
            Librería cristiana dedicada a la compra y venta de libros que edifican la fe, fortalecen
            la familia y acompañan tu camino espiritual.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Navegación</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><Link to="/catalogo" className="hover:text-foreground">Catálogo</Link></li>
            <li><Link to="/nosotros" className="hover:text-foreground">Nosotros</Link></li>
            <li><Link to="/contacto" className="hover:text-foreground">Contacto</Link></li>
            <li><Link to="/carrito" className="hover:text-foreground">Mi carrito</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Visítanos</h4>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 text-primary" /> Luque, Paraguay</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 text-primary" /> contacto@lasenda.com</li>
            <li className="flex gap-3 pt-2">
              <a href="#" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Instagram"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="h-9 w-9 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition" aria-label="Facebook"><Facebook className="h-4 w-4" /></a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Librería La Senda. Todos los derechos reservados.
      </div>
    </footer>
  );
}
