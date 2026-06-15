import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Search, SlidersHorizontal, Camera, X, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import coinHero from "@/assets/coin-hero.jpg";
import coinDemo from "@/assets/coin-demo.jpg";

type SearchParams = { q?: string };

export const Route = createFileRoute("/search/")({
  validateSearch: (s: Record<string, unknown>): SearchParams => ({
    q: typeof s.q === "string" ? s.q : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Search — NUMIX" },
      { name: "description", content: "Search rare coins by name, ruler, year, catalog reference or photograph." },
    ],
  }),
  component: SearchPage,
});

const SUGGESTIONS = [
  {
    id: "davenport-747",
    image: coinDemo,
    title: "Friedrich August I · Thaler 1711",
    subtitle: "Saxony · Dresden Mint · Davenport 747",
    metal: "Silver",
    year: "1711",
    grade: "AU55",
    estimate: "€ 4 200 – 5 800",
    rarity: "Rare",
  },
  {
    id: "athens-tetradrachm",
    image: coinHero,
    title: "Tetradrachm of Athens",
    subtitle: "Attica · Owl of Athena · c. 450 BC",
    metal: "Silver",
    year: "c. 450 BC",
    grade: "MS62",
    estimate: "€ 3 800 – 4 600",
    rarity: "Iconic",
  },
  {
    id: "aureus-augustus",
    image: coinDemo,
    title: "Aureus of Augustus",
    subtitle: "Roman Imperial · Lugdunum · 19–18 BC",
    metal: "Gold",
    year: "19–18 BC",
    grade: "EF45",
    estimate: "€ 18 000 – 24 000",
    rarity: "Very Rare",
  },
  {
    id: "ducat-venice",
    image: coinHero,
    title: "Ducat · Doge Andrea Gritti",
    subtitle: "Venetian Republic · 1523–1538",
    metal: "Gold",
    year: "1523",
    grade: "AU58",
    estimate: "€ 2 400 – 3 100",
    rarity: "Scarce",
  },
];

const REFINE_FIELDS: { key: string; label: string; options: string[] }[] = [
  { key: "country", label: "Country", options: ["Germany", "Italy", "France", "Greece", "Rome", "England"] },
  { key: "ruler", label: "Ruler", options: ["Friedrich August I", "Augustus", "Andrea Gritti", "Henry VIII"] },
  { key: "period", label: "Period", options: ["Ancient", "Medieval", "Early Modern", "Modern"] },
  { key: "year", label: "Year", options: ["Pre-500 BC", "500 BC – 500 AD", "500 – 1500", "1500 – 1800", "1800 – 1900"] },
  { key: "denomination", label: "Denomination", options: ["Thaler", "Ducat", "Aureus", "Tetradrachm", "Sovereign"] },
  { key: "metal", label: "Metal", options: ["Gold", "Silver", "Bronze", "Electrum"] },
  { key: "reference", label: "Reference", options: ["Davenport", "RIC", "Sear", "Krause"] },
  { key: "grade", label: "Grade", options: ["MS", "AU", "XF", "VF", "F"] },
  { key: "auctionHouse", label: "Auction House", options: ["Künker", "Heritage", "NAC", "Stack's Bowers"] },
  { key: "mint", label: "Mint", options: ["Dresden", "Rome", "Venice", "London", "Athens"] },
];

type Filters = Record<string, string>;

function SearchPage() {
  const { q } = Route.useSearch();
  const [value, setValue] = useState(q ?? "");
  const [filters, setFilters] = useState<Filters>({});
  const [refineOpen, setRefineOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkHash = () => {
      if (typeof window !== "undefined" && window.location.hash === "#advanced") {
        setRefineOpen(true);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const activeTags = useMemo(
    () =>
      Object.entries(filters).map(([key, val]) => ({
        key,
        label: REFINE_FIELDS.find((f) => f.key === key)?.label ?? key,
        value: val,
      })),
    [filters],
  );

  const filtered = value.trim()
    ? SUGGESTIONS.filter((s) => s.title.toLowerCase().includes(value.toLowerCase()))
    : SUGGESTIONS;

  const removeTag = (key: string) => {
    const next = { ...filters };
    delete next[key];
    setFilters(next);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 aura-soft" />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-3xl px-5 pt-10 pb-32 md:pt-16">
        {/* ─── LEVEL 1 · INSTANT SEARCH ─── */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            navigate({ to: "/search", search: { q: value } });
          }}
          className="relative animate-rise"
        >
          <div className="absolute inset-0 -m-16 aura-field pointer-events-none" />
          <div className="relative flex items-center gap-2 rounded-full border-aura bg-card/40 backdrop-blur-xl pl-4 pr-1.5 py-1.5 md:pl-6 md:pr-2 md:py-2">
            <Search className="size-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
            <input
              autoFocus
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Friedrich August I · 1711 · Davenport 747"
              className="flex-1 min-w-0 bg-transparent py-2 md:py-3 text-sm md:text-base font-light text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-primary px-4 md:px-5 py-2 md:py-2.5 text-xs md:text-sm font-medium text-primary-foreground transition hover:opacity-90 shrink-0"
            >
              Search
            </button>
          </div>
        </form>

        {/* ─── LEVEL 2 · ACCESS TO REFINE + PHOTO ─── */}
        <div className="mt-5 flex items-center justify-center gap-6 text-xs text-muted-foreground animate-rise delay-1">
          <Link
            to="/search/photo"
            className="inline-flex items-center gap-2 transition hover:text-ice"
          >
            <Camera className="size-3.5" strokeWidth={1.5} />
            By photo
          </Link>
          <span className="opacity-30">·</span>
          <button
            onClick={() => setRefineOpen(true)}
            className="inline-flex items-center gap-2 transition hover:text-ice"
          >
            <SlidersHorizontal className="size-3.5" strokeWidth={1.5} />
            Refined search
          </button>
        </div>

        {/* ─── ACTIVE FILTER TAGS ─── */}
        {activeTags.length > 0 && (
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 animate-rise">
            {activeTags.map((t) => (
              <button
                key={t.key}
                onClick={() => removeTag(t.key)}
                className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-card/40 px-3.5 py-1.5 text-xs text-foreground/90 backdrop-blur-xl transition hover:border-aura hover:text-ice"
              >
                <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {t.label}
                </span>
                <span>{t.value}</span>
                <X className="size-3 opacity-60 transition group-hover:opacity-100" strokeWidth={1.5} />
              </button>
            ))}
            <button
              onClick={() => setFilters({})}
              className="ml-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-ice"
            >
              Clear
            </button>
          </div>
        )}

        {/* ─── RESULTS ─── */}
        <div className="mt-12 animate-rise delay-2">
          <div className="mb-5 flex items-baseline justify-between">
            <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              {activeTags.length > 0 ? "Refined results" : "Results"}
            </div>
            <div className="text-[11px] tabular-nums text-muted-foreground">
              {filtered.length} {filtered.length === 1 ? "match" : "matches"}
            </div>
          </div>

          <div className="grid gap-4">
            {filtered.map((s) => (
              <Link
                key={s.id}
                to="/coin/$id"
                params={{ id: s.id }}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/40 backdrop-blur-xl transition hover:border-aura"
              >
                <div className="flex gap-4 p-3">
                  <div className="relative size-24 shrink-0 overflow-hidden rounded-xl bg-background/60 ring-1 ring-border/50">
                    <img
                      src={s.image}
                      alt={s.title}
                      loading="lazy"
                      className="size-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="font-serif text-base leading-tight text-foreground transition group-hover:text-ice">
                      {s.title}
                    </div>
                    <div className="mt-1 line-clamp-1 text-[11px] text-muted-foreground">
                      {s.subtitle}
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      <Pill>{s.metal}</Pill>
                      <Pill>{s.year}</Pill>
                      <Pill accent>{s.grade}</Pill>
                    </div>
                    <div className="mt-auto flex items-end justify-between pt-3">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                          Estimate
                        </div>
                        <div className="text-xs tabular-nums text-foreground/90">
                          {s.estimate}
                        </div>
                      </div>
                      <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        {s.rarity}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="py-12 text-center text-sm text-muted-foreground">
              No matches yet. Try a ruler, year or reference.
            </div>
          )}
        </div>


        {/* ─── LEVEL 3 · EXPERT MODE ─── */}
        <div className="mt-20 flex justify-center">
          <a
            href="#advanced"
            onClick={(e) => {
              e.preventDefault();
              setRefineOpen(true);
            }}
            className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.32em] text-muted-foreground transition hover:text-ice"
          >
            Advanced search <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </main>

      {/* ─── REFINE DRAWER ─── */}
      <Sheet open={refineOpen} onOpenChange={setRefineOpen}>
        <SheetContent
          side="bottom"
          className="mx-auto h-[90vh] w-full overflow-y-auto rounded-t-2xl border border-border/40 bg-background/95 p-0 backdrop-blur-2xl sm:max-w-2xl sm:rounded-t-3xl"
        >
          <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] aura-soft" />

          <div className="relative flex min-h-full flex-col px-6 pb-10 pt-10">
            <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Refine
            </div>
            <h2 className="mt-5 font-serif text-3xl leading-[1.05] tracking-tight md:text-4xl">
              Narrow the
              <br />
              <span className="italic text-ice">search.</span>
            </h2>

            <div className="mt-10 space-y-9">
              {REFINE_FIELDS.map((f) => (
                <FilterGroup
                  key={f.key}
                  label={f.label}
                  options={f.options}
                  selected={filters[f.key]}
                  onSelect={(v) =>
                    setFilters((prev) => {
                      const next = { ...prev };
                      if (next[f.key] === v) delete next[f.key];
                      else next[f.key] = v;
                      return next;
                    })
                  }
                />
              ))}
            </div>

            <div className="sticky bottom-0 mt-12 -mx-6 border-t border-border/40 bg-background/90 px-6 pb-2 pt-4 backdrop-blur-xl">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setFilters({})}
                  className="text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-ice"
                >
                  Reset
                </button>
                <button
                  onClick={() => setRefineOpen(false)}
                  className="ml-auto flex-1 rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FilterGroup({
  label,
  options,
  selected,
  onSelect,
}: {
  label: string;
  options: string[];
  selected?: string;
  onSelect: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = selected === o;
          return (
            <button
              key={o}
              onClick={() => onSelect(o)}
              className={`rounded-full border px-3.5 py-2 text-sm font-light transition ${
                active
                  ? "border-aura bg-card/60 text-ice"
                  : "border-border/50 text-foreground/80 hover:border-aura hover:text-ice"
              }`}
            >
              {o}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Pill({ children, accent }: { children: React.ReactNode; accent?: boolean }) {
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] tracking-wide ${
        accent
          ? "border-aura bg-card/60 text-ice"
          : "border-border/50 text-muted-foreground"
      }`}
    >
      {children}
    </span>
  );
}
