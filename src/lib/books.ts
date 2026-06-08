import book1 from "@/assets/book1.jpg";
import book2 from "@/assets/book2.jpg";
import book3 from "@/assets/book3.jpg";
import book4 from "@/assets/book4.jpg";
import book5 from "@/assets/book5.jpg";
import book6 from "@/assets/book6.jpg";

export type Book = {
  id: string;
  title: string;
  author: string;
  price: number;
  category: "Biblias" | "Devocionales" | "Teología" | "Infantil" | "Música" | "Vida Cristiana";
  cover: string;
  description: string;
  featured?: boolean;
  isNew?: boolean;
};

export const books: Book[] = [
  {
    id: "1",
    title: "Caminos de Fe",
    author: "Pastor R. Mendoza",
    price: 24900,
    category: "Vida Cristiana",
    cover: book1,
    description: "Un recorrido profundo por los pasos del creyente moderno, lleno de enseñanzas prácticas para crecer espiritualmente en medio de los desafíos de hoy.",
    featured: true,
  },
  {
    id: "2",
    title: "Devociones Diarias",
    author: "Sara Aldana",
    price: 18500,
    category: "Devocionales",
    cover: book2,
    description: "365 reflexiones diarias para acompañarte en oración, gratitud y meditación de la Palabra a lo largo del año.",
    featured: true,
    isNew: true,
  },
  {
    id: "3",
    title: "Biblia de Estudio Reina Valera",
    author: "Editorial Vida",
    price: 89900,
    category: "Biblias",
    cover: book3,
    description: "Edición premium en piel con concordancia, mapas y comentarios. Una herramienta esencial para el estudio profundo de las Escrituras.",
    featured: true,
  },
  {
    id: "4",
    title: "El Arca de Noé para Niños",
    author: "Lucía Pérez",
    price: 32000,
    category: "Infantil",
    cover: book4,
    description: "Ilustraciones cálidas y un lenguaje sencillo para que los más pequeños descubran las historias bíblicas.",
    isNew: true,
  },
  {
    id: "5",
    title: "Teología Sistemática",
    author: "Dr. A. Grudem",
    price: 145000,
    category: "Teología",
    cover: book5,
    description: "Una obra de referencia clásica para estudiantes, pastores y todo aquel que desee comprender en profundidad la fe cristiana.",
  },
  {
    id: "6",
    title: "Cantos de Adoración",
    author: "Ministerio La Senda",
    price: 27500,
    category: "Música",
    cover: book6,
    description: "Compendio de himnos y cantos contemporáneos con acordes y guías de adoración para iglesias y ministerios.",
  },
];

export const categories: Book["category"][] = [
  "Biblias",
  "Devocionales",
  "Teología",
  "Infantil",
  "Música",
  "Vida Cristiana",
];

export const formatPrice = (n: number) =>
  new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
