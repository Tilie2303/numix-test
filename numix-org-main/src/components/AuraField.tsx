import { Search, Camera, SlidersHorizontal } from "lucide-react";
import { useNavigate, Link } from "@tanstack/react-router";
import { useState } from "react";

export function AuraField({ minimal = false }: { minimal?: boolean }) {
  const [value, setValue] = useState("");
  const navigate = useNavigate();

  const submit = (q?: string) => {
    const query = (q ?? value).trim();
    navigate({ to: "/search", search: query ? { q: query } : {} });
  };

  return (
    <div className="relative w-full max-w-3xl">
      <div className="absolute inset-0 -m-28 aura-field animate-aura pointer-events-none" />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
        className="relative"
      >
        <div className="relative flex items-center gap-2 md:gap-3 rounded-full border-aura bg-card/50 backdrop-blur-xl pl-4 pr-2 md:pl-7 md:pr-2.5 py-2 md:py-2.5 shadow-[0_30px_80px_-30px_oklch(0.72_0.12_240/0.35)]">
          <Search className="size-4 md:size-5 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Friedrich August I · 1711 · Davenport 747 · Saxony Ducat"
            className="flex-1 min-w-0 bg-transparent py-2 md:py-4 text-sm md:text-lg font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-full bg-primary px-4 md:px-7 py-2 md:py-3 text-xs md:text-sm font-medium text-primary-foreground transition hover:opacity-90 shrink-0"
          >
            Search
          </button>
        </div>
      </form>

      {!minimal && (
        <div className="mt-6 flex items-center justify-center gap-7 text-xs text-muted-foreground">
          <Link to="/search/photo" className="inline-flex items-center gap-2 transition hover:text-ice">
            <Camera className="size-3.5" strokeWidth={1.5} />
            By photo
          </Link>
          <span className="opacity-30">·</span>
          <Link
            to="/search"
            hash="advanced"
            className="inline-flex items-center gap-2 transition hover:text-ice"
          >
            <SlidersHorizontal className="size-3.5" strokeWidth={1.5} />
            Refined search
          </Link>
        </div>
      )}
    </div>
  );
}
