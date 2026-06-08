import { Link } from "@tanstack/react-router";
import type { Book } from "@/lib/books";
import { formatPrice } from "@/lib/books";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link
      to="/libro/$id"
      params={{ id: book.id }}
      className="group block"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary/40 shadow-book">
        <img
          src={book.cover}
          alt={book.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {book.isNew && (
          <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold text-gold-foreground text-[10px] font-semibold uppercase tracking-wider">
            Nuevo
          </span>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{book.category}</div>
        <h3 className="font-display text-lg leading-tight text-foreground group-hover:text-primary transition-colors">
          {book.title}
        </h3>
        <p className="text-xs text-muted-foreground">{book.author}</p>
        <p className="pt-1 text-sm font-semibold text-primary">{formatPrice(book.price)}</p>
      </div>
    </Link>
  );
}
