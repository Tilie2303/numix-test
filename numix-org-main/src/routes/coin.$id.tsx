import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SiteHeader } from "@/components/SiteHeader";
import { FilterChips, type ChipOption } from "@/components/FilterChips";
import { cn } from "@/lib/utils";
import coinHero from "@/assets/coin-hero.jpg";
import coinDemo from "@/assets/coin-demo.jpg";

type AuctionRecord = {
  house: string;
  date: string;
  grade: string;
  price: string;
  priceNum: number;
  lot?: string;
};

type GradeDist = { grade: string; pct: number; count: number };
type EstByGrade = { grade: string; gradeNum: number; estimate: number; low: number; high: number; sales: number[] };

type Coin = {
  id: string;
  title: string;
  subtitle: string;
  era: string;
  image: string;
  value: { low: string; high: string };
  rarity: string;
  demand: string;
  importance: string;
  confidence: "High Confidence" | "Moderate Confidence" | "Emerging Data";
  specs?: {
    metal?: string;
    weight?: string;
    diameter?: string;
    mint?: string;
    mintYears?: string;
  };
  reasoning: {
    rarity: string;
    value: string;
    demand: string;
    importance: string;
  };
  market: {
    auctions: AuctionRecord[];
    trend: { direction: "up" | "down" | "flat"; pct: string; window: string };
    activity: { lots12m: number; sellThrough: string; medianPremium: string };
    summary?: {
      totalAppearances: number;
      medianPrice: string;
      highestResult: string;
      lowestResult: string;
      mostCommonGrade: string;
    };
    gradeDistribution?: GradeDist[];
    estimatedByGrade?: EstByGrade[];
  };
  references: Array<{ catalog: string; ref: string; note?: string }>;
  population: {
    ngc: { graded: number; finer: number; topGrade: string };
    pcgs: { graded: number; finer: number; topGrade: string };
    knownExamples?: number;
    finestKnown?: string;
    topCensus?: Array<{ grade: string; count: number }>;
  };
  provenance: Array<{ year: string; owner: string; detail: string }>;
  expert: {
    dieStudies: string;
    variants: Array<{ name: string; note: string }>;
    literature: Array<{ title: string; author: string; year: string }>;
    notes: string;
    comparatives?: Array<{ title: string; detail: string }>;
  };
};


const COINS: Record<string, Coin> = {
  "davenport-747": {
    id: "davenport-747",
    title: "Friedrich August I",
    subtitle: "Thaler · 1711 · Davenport 747",
    era: "Electorate of Saxony · Silver · Dresden Mint",
    image: coinDemo,
    value: { low: "€4,800", high: "€6,200" },
    rarity: "Rare",
    demand: "Strong",
    importance: "High",
    confidence: "High Confidence",
    specs: {
      metal: "Silver (.888, Leipzig standard)",
      weight: "29.10 g",
      diameter: "42 mm",
      mint: "Dresden",
      mintYears: "1711",
    },
    reasoning: {
      rarity:
        "Struck in limited numbers at the Dresden mint during a transitional reign, surviving specimens in collectable grade rarely exceed three figures worldwide.",
      value:
        "Recent results across four major European auctions cluster tightly between €4,800 and €6,200 for comparable grade, with little dispersion — a sign of a mature, confident market.",
      demand:
        "Saxon thalers of this period remain a cornerstone of German numismatics. Demand from Central European collectors has steadied prices through the last three sale cycles.",
      importance:
        "Friedrich August I — known as August the Strong — reshaped Saxon coinage and the Dresden mint itself. His thalers carry both monetary and historical weight.",
    },
    market: {
      auctions: [
        { house: "Künker", date: "Mar 2024", grade: "AU58", price: "€5,400", priceNum: 5400, lot: "384" },
        { house: "Heritage", date: "Jan 2024", grade: "MS61", price: "€6,100", priceNum: 6100, lot: "2117" },
        { house: "Spink", date: "Sep 2023", grade: "AU55", price: "€4,900", priceNum: 4900, lot: "94" },
        { house: "Künker", date: "Jun 2023", grade: "AU58", price: "€5,200", priceNum: 5200, lot: "501" },
        { house: "Gorny & Mosch", date: "Mar 2023", grade: "AU53", price: "€4,650", priceNum: 4650, lot: "1842" },
        { house: "Künker", date: "Oct 2022", grade: "AU55", price: "€4,800", priceNum: 4800, lot: "227" },
      ],
      trend: { direction: "up", pct: "+12.4%", window: "24 mo" },
      activity: { lots12m: 7, sellThrough: "100%", medianPremium: "+8% over estimate" },
      summary: {
        totalAppearances: 64,
        medianPrice: "€4,950",
        highestResult: "€14,500",
        lowestResult: "€1,150",
        mostCommonGrade: "AU55",
      },
      gradeDistribution: [
        { grade: "VF30", pct: 4, count: 3 },
        { grade: "VF35", pct: 7, count: 4 },
        { grade: "EF40", pct: 11, count: 7 },
        { grade: "EF45", pct: 14, count: 9 },
        { grade: "AU53", pct: 17, count: 11 },
        { grade: "AU55", pct: 21, count: 13 },
        { grade: "AU58", pct: 13, count: 8 },
        { grade: "MS60", pct: 7, count: 5 },
        { grade: "MS62", pct: 4, count: 3 },
        { grade: "MS63", pct: 2, count: 1 },
      ],
      estimatedByGrade: [
        { grade: "VF30", gradeNum: 30, estimate: 1200, low: 900, high: 1500, sales: [950, 1100, 1300] },
        { grade: "VF35", gradeNum: 35, estimate: 1500, low: 1200, high: 1900, sales: [1250, 1400, 1700] },
        { grade: "EF40", gradeNum: 40, estimate: 1900, low: 1500, high: 2400, sales: [1500, 1800, 2200] },
        { grade: "EF45", gradeNum: 45, estimate: 2400, low: 1900, high: 3000, sales: [1900, 2300, 2800] },
        { grade: "AU53", gradeNum: 53, estimate: 3400, low: 2700, high: 4200, sales: [2700, 3200, 3800, 4100] },
        { grade: "AU55", gradeNum: 55, estimate: 4500, low: 3600, high: 5600, sales: [4650, 4800, 4900, 5200] },
        { grade: "AU58", gradeNum: 58, estimate: 5400, low: 4400, high: 6600, sales: [5200, 5400, 5600, 5800] },
        { grade: "MS60", gradeNum: 60, estimate: 7200, low: 5800, high: 8800, sales: [6500, 7000, 7800] },
        { grade: "MS62", gradeNum: 62, estimate: 9500, low: 7600, high: 11500, sales: [8500, 9200, 10500] },
        { grade: "MS63", gradeNum: 63, estimate: 13000, low: 10500, high: 15500, sales: [11000, 13500, 14500] },
      ],
    },
    references: [
      { catalog: "Davenport", ref: "747", note: "Primary reference" },
      { catalog: "Schnee", ref: "1006" },
      { catalog: "KM", ref: "#831" },
      { catalog: "Kahnt", ref: "298" },
      { catalog: "AKS", ref: "—" },
      { catalog: "Merseb.", ref: "1543" },
    ],
    population: {
      ngc: { graded: 84, finer: 7, topGrade: "MS63" },
      pcgs: { graded: 58, finer: 4, topGrade: "MS62" },
      knownExamples: 142,
      finestKnown: "MS63 (NGC)",
      topCensus: [
        { grade: "MS63", count: 2 },
        { grade: "MS62", count: 5 },
        { grade: "MS61", count: 9 },
        { grade: "AU58", count: 18 },
        { grade: "AU55", count: 29 },
      ],
    },

    provenance: [
      { year: "2024", owner: "Private European Collection", detail: "Acquired Künker Auction 393, Lot 384" },
      { year: "2011", owner: "Horn Collection", detail: "Catalogued in Künker Sale 198" },
      { year: "1978", owner: "Virgil M. Brand Estate", detail: "Inventoried, Chicago" },
      { year: "1923", owner: "Heinrich Buchenau", detail: "Munich, recorded in correspondence" },
    ],
    expert: {
      dieStudies:
        "Two principal die varieties exist; the reverse with extended palm fronds is materially scarcer and commands a 30–40% premium when correctly attributed. Population reports favor Künker's grading band as the calibration baseline.",
      variants: [
        { name: "Extended palm reverse", note: "Scarce — 30–40% premium" },
        { name: "Standard reverse", note: "Most common; basis for comparable sales" },
        { name: "ILH mintmaster mark", note: "Johann Lorenz Holland, Dresden 1698–1716 — diagnostic for the 1711 issue" },
      ],
      literature: [
        { title: "Sächsische Taler 1500–1800", author: "Schnee, G.", year: "1982" },
        { title: "Münzen und Medaillen der albertinischen Linie", author: "Merseburger, O.", year: "1894" },
        { title: "Davenport's European Crowns 1700–1800", author: "Davenport, J.S.", year: "1961" },
      ],
      notes:
        "Specialist literature consistently treats the 1711 issue as a transitional type bridging the 1706 reform and the post-1715 standardisation. Edge inscription quality is a reliable authentication marker.",
      comparatives: [
        { title: "Künker 393, Lot 384 (Mar 2024)", detail: "AU58, hammer €5,400 — closest comparable" },
        { title: "Heritage 232217, Lot 2117 (Jan 2024)", detail: "MS61, hammer €6,100" },
        { title: "Spink 23103, Lot 94 (Sep 2023)", detail: "AU55, hammer €4,900" },
      ],
    },
  },
  "athens-tetradrachm": {
    id: "athens-tetradrachm",
    title: "Tetradrachm of Athens",
    subtitle: "Owl of Athena · c. 450 BC",
    era: "Classical Greece · Silver · Athens Mint",
    image: coinHero,
    value: { low: "€1,400", high: "€2,800" },
    rarity: "Iconic",
    demand: "Strong",
    importance: "Foundational",
    confidence: "High Confidence",
    specs: {
      metal: "Silver (.98, Laurion)",
      weight: "17.20 g",
      diameter: "24 mm",
      mint: "Athens",
      mintYears: "c. 454–404 BC",
    },
    reasoning: {
      rarity:
        "Produced in vast quantities to fund Athenian commerce and naval power, the classical owl tetradrachm survives in meaningful numbers — yet exceptional centering and full crests remain genuinely uncommon.",
      value:
        "The market is deep and liquid. Pricing scales steeply with strike quality and centering rather than nominal grade alone.",
      demand:
        "Universally recognized, the owl is the entry point for serious ancient collections and a permanent fixture of museum acquisitions.",
      importance:
        "The most iconic coin of the ancient world. A direct artifact of Athenian democracy, silver from Laurion, and the economic engine of the 5th century BC.",
    },
    market: {
      auctions: [
        { house: "NAC", date: "May 2024", grade: "Choice EF", price: "€2,650", priceNum: 2650, lot: "118" },
        { house: "CNG", date: "Feb 2024", grade: "Good VF", price: "€1,580", priceNum: 1580, lot: "245" },
        { house: "Roma", date: "Nov 2023", grade: "EF", price: "€2,100", priceNum: 2100, lot: "377" },
        { house: "Leu", date: "Aug 2023", grade: "Choice EF", price: "€2,480", priceNum: 2480, lot: "82" },
        { house: "CNG", date: "May 2023", grade: "VF", price: "€1,420", priceNum: 1420, lot: "612" },
      ],
      trend: { direction: "up", pct: "+18.2%", window: "24 mo" },
      activity: { lots12m: 142, sellThrough: "94%", medianPremium: "+11% over estimate" },
      summary: {
        totalAppearances: 1420,
        medianPrice: "€1,950",
        highestResult: "€48,000",
        lowestResult: "€420",
        mostCommonGrade: "EF",
      },
      gradeDistribution: [
        { grade: "VF", pct: 22, count: 312 },
        { grade: "Good VF", pct: 18, count: 256 },
        { grade: "EF", pct: 28, count: 398 },
        { grade: "Choice EF", pct: 18, count: 256 },
        { grade: "AU", pct: 8, count: 114 },
        { grade: "MS", pct: 4, count: 57 },
        { grade: "MS★", pct: 2, count: 27 },
      ],
      estimatedByGrade: [
        { grade: "VF", gradeNum: 35, estimate: 950, low: 700, high: 1300, sales: [780, 900, 1050, 1200] },
        { grade: "gVF", gradeNum: 40, estimate: 1350, low: 1000, high: 1800, sales: [1100, 1280, 1500, 1700] },
        { grade: "EF", gradeNum: 45, estimate: 2000, low: 1500, high: 2700, sales: [1600, 1850, 2200, 2600] },
        { grade: "cEF", gradeNum: 50, estimate: 2800, low: 2100, high: 3800, sales: [2200, 2600, 3100, 3600] },
        { grade: "AU", gradeNum: 55, estimate: 4500, low: 3300, high: 6100, sales: [3500, 4200, 5200, 6000] },
        { grade: "MS", gradeNum: 60, estimate: 8200, low: 6100, high: 11000, sales: [6500, 7800, 9500, 10800] },
        { grade: "MS★", gradeNum: 65, estimate: 16000, low: 12000, high: 22000, sales: [12500, 15500, 19000, 24000] },
      ],
    },
    references: [
      { catalog: "SNG Cop.", ref: "31" },
      { catalog: "Kroll", ref: "8", note: "Standard typology" },
      { catalog: "HGC", ref: "4.1597" },
      { catalog: "Sear", ref: "2526" },
      { catalog: "Starr", ref: "Group V.B" },
      { catalog: "Krause", ref: "—" },
    ],
    population: {
      ngc: { graded: 1240, finer: 68, topGrade: "MS★" },
      pcgs: { graded: 640, finer: 24, topGrade: "MS" },
      knownExamples: 1880,
      finestKnown: "MS★ (NGC)",
      topCensus: [
        { grade: "MS★", count: 27 },
        { grade: "MS", count: 57 },
        { grade: "Ch AU", count: 96 },
        { grade: "AU", count: 114 },
        { grade: "Ch EF", count: 256 },
      ],
    },

    provenance: [
      { year: "2024", owner: "American Private Collection", detail: "NAC Auction 142, Lot 118" },
      { year: "1998", owner: "BCD Collection", detail: "Catalogued and published" },
      { year: "1962", owner: "Hess-Leu Sale", detail: "Lucerne, October 1962" },
    ],
    expert: {
      dieStudies:
        "Pre-decadrachm period strikes display tighter pellet borders and a more naturalistic owl. Test cuts reduce value 15–25% but are accepted on circulation-era examples.",
      variants: [
        { name: "Standardised type (post-454 BC)", note: "Most common; canonical owl" },
        { name: "Transitional series", note: "Looser style; modest premium" },
        { name: "Test-cut examples", note: "Historically interesting; 15–25% discount" },
      ],
      literature: [
        { title: "The Athenian Empire", author: "Meiggs, R.", year: "1972" },
        { title: "The Greek Coins of Athens", author: "Svoronos, J.N.", year: "1923" },
        { title: "Athenian Coinage 480–449 BC", author: "Starr, C.G.", year: "1970" },
      ],
      notes:
        "Style and fabric — not nominal grade — drive premium pricing. Frontal owls (Kroll 15) are a separate, scarcer category and should not be confused with the standard profile type.",
      comparatives: [
        { title: "NAC 142, Lot 118 (May 2024)", detail: "Choice EF, hammer €2,650 — strong centering" },
        { title: "Leu 16, Lot 82 (Aug 2023)", detail: "Choice EF, hammer €2,480" },
        { title: "CNG Triton XXVII, Lot 245 (Feb 2024)", detail: "Good VF, hammer €1,580" },
      ],
    },
  },
};

export const Route = createFileRoute("/coin/$id")({
  loader: ({ params }): Coin => {
    const coin = COINS[params.id];
    if (!coin) throw notFound();
    return coin;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — NUMIX` },
          { name: "description", content: `${loaderData.subtitle}. ${loaderData.era}.` },
          { property: "og:title", content: `${loaderData.title} — NUMIX` },
          { property: "og:description", content: `${loaderData.subtitle}. ${loaderData.era}.` },
          { property: "og:image", content: loaderData.image },
        ]
      : [],
  }),
  component: CoinPage,
  notFoundComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background text-center">
      <div>
        <div className="font-serif text-3xl">Not in the index yet.</div>
        <Link to="/search" className="mt-6 inline-block text-ice">Return to search →</Link>
      </div>
    </div>
  ),
  errorComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <div className="font-serif text-2xl">Something interrupted the interpretation.</div>
        <Link to="/" className="mt-6 inline-block text-ice">Return home →</Link>
      </div>
    </div>
  ),
});

type DeepTab = "analysis" | "market" | "references" | "population" | "provenance" | "expert";

const DEEP_TABS: { id: DeepTab; label: string; caption: string }[] = [
  { id: "analysis", label: "Analysis", caption: "Why this coin is what it is." },
  { id: "market", label: "Market", caption: "Auction records and price behaviour." },
  { id: "references", label: "References", caption: "Catalog citations." },
  { id: "population", label: "Population", caption: "NGC, PCGS and known examples." },
  { id: "provenance", label: "Provenance", caption: "Ownership lineage." },
  { id: "expert", label: "Expert", caption: "Die studies, variants, literature." },
];

function CoinPage() {
  const coin = Route.useLoaderData();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<DeepTab>("analysis");

  const openAt = (id: DeepTab) => {
    setTab(id);
    setOpen(true);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-60 left-1/2 h-[900px] w-[1300px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      <main className="relative z-10 mx-auto max-w-6xl px-6 pb-20 pt-5 md:px-8 md:pb-24 md:pt-8">
        <Link
          to="/search"
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-ice md:text-xs md:tracking-[0.22em]"
        >
          <ArrowLeft className="size-3" strokeWidth={1.5} />
          Search
        </Link>

        {/* HERO — coin as the product */}
        <section className="mt-8 grid gap-10 md:mt-16 md:grid-cols-[1.15fr_1fr] md:gap-20">
          <div className="relative animate-rise">
            <div className="absolute inset-0 -m-24 aura-hero" />
            <img
              src={coin.image}
              alt={coin.title}
              width={1536}
              height={1536}
              className="relative w-full rounded-2xl object-cover shadow-[0_30px_120px_-30px_rgba(0,0,0,0.7)]"
            />
          </div>

          <div className="flex flex-col justify-center animate-rise delay-1">
            <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
              {coin.era}
            </div>
            <h1 className="mt-4 font-serif text-[2.5rem] leading-[1.04] tracking-tight md:mt-5 md:text-6xl">
              {coin.title}
            </h1>
            <div className="mt-3 font-serif text-base italic text-muted-foreground md:text-lg">
              {coin.subtitle}
            </div>

            {coin.specs && (
              <div className="mt-7 border-t border-border/40 pt-6 md:mt-8 md:pt-7">
                <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground md:text-[11px] md:tracking-[0.28em]">
                  Coin Information
                </div>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-3 md:gap-x-8 md:gap-y-6">
                  {coin.specs.metal && <Spec label="Metal" value={coin.specs.metal} />}
                  {coin.specs.weight && <Spec label="Weight" value={coin.specs.weight} />}
                  {coin.specs.diameter && <Spec label="Diameter" value={coin.specs.diameter} />}
                  {coin.specs.mint && <Spec label="Mint" value={coin.specs.mint} />}
                  {coin.specs.mintYears && <Spec label="Mint Years" value={coin.specs.mintYears} />}
                  {coin.references[0] && (
                    <Spec
                      label="Catalog Ref."
                      value={`${coin.references[0].catalog} ${coin.references[0].ref}`}
                    />
                  )}
                </dl>
              </div>
            )}

            {/* Insights — the 5-second understanding */}
            <div className="mt-9 border-t border-border/40 pt-7 md:mt-10 md:pt-8">
              <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground md:text-[11px] md:tracking-[0.28em]">
                Insights
              </div>
              <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-6 md:gap-x-8 md:gap-y-7">
                <Verdict label="Estimated Value" value={coin.value.low} sub={`– ${coin.value.high}`} />
                <Verdict label="Rarity" value={coin.rarity} />
                <Verdict label="Collector Demand" value={coin.demand} />
                <Verdict label="Historical Importance" value={coin.importance} />
              </div>
              <div className="mt-6 flex items-center justify-between gap-4 rounded-xl border border-ice/20 bg-ice/[0.04] px-5 py-5 md:mt-7 md:px-6 md:py-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:text-[11px] md:tracking-[0.24em]">
                    Data Confidence
                  </div>
                  <div className="mt-2 font-serif text-2xl leading-tight text-ice md:text-3xl">
                    {coin.confidence.split(" ")[0]}
                  </div>
                </div>
                <div className="flex size-10 items-center justify-center rounded-full border border-ice/25 text-ice md:size-11">
                  <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Analysis Preview */}
        <section className="mt-20 grid gap-8 md:mt-32 md:grid-cols-[260px_1fr] md:gap-16">
          <div>
            <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
              Analysis
            </div>
            <div className="mt-3 font-serif text-2xl text-foreground md:text-4xl">
              Understand the significance.
            </div>
          </div>
          <div className="max-w-2xl space-y-5 md:space-y-6">
            <p className="font-serif text-lg leading-[1.55] text-foreground/90 md:text-2xl">
              Friedrich August I — known as August the Strong — transformed Saxony into one of Europe's most influential courts. Today, his coins remain among the most collected pieces of German numismatic history.
            </p>
            <p className="text-[13px] font-light leading-[1.75] text-muted-foreground md:text-sm">
              A coin's value is shaped by more than its price. Rarity, condition, provenance, market demand and historical importance all play a role. Explore the evidence only when you need it — the deeper research is always there.
            </p>
          </div>
        </section>

        {/* Single interaction — Explore Deeper */}
        <section className="mt-16 md:mt-24">
          <button
            onClick={() => openAt("analysis")}
            className="group block w-full overflow-hidden rounded-2xl border border-border/50 bg-card/30 text-left transition hover:border-ice/40 hover:bg-card/50"
          >
            <div className="grid items-center gap-5 px-6 py-7 md:grid-cols-[1fr_auto] md:gap-6 md:px-10 md:py-9">
              <div>
                <div className="text-[9px] uppercase tracking-[0.36em] text-muted-foreground md:text-[10px] md:tracking-[0.32em]">
                  Six layers of depth
                </div>
                <div className="mt-2 font-serif text-2xl text-foreground transition group-hover:text-ice md:text-4xl">
                  Explore Deeper
                </div>
                <div className="mt-3 text-[13px] font-light leading-[1.6] text-muted-foreground md:text-sm">
                  Analysis · Market · References · Population · Provenance · Expert
                </div>
              </div>
              <div className="flex size-12 items-center justify-center rounded-full border border-ice/30 text-ice transition group-hover:border-ice group-hover:bg-ice/10 md:size-14">
                <ArrowRight className="size-5" strokeWidth={1.25} />
              </div>
            </div>
          </button>
        </section>
      </main>

      <DeepSheet
        open={open}
        onOpenChange={setOpen}
        tab={tab}
        onTabChange={setTab}
        coin={coin}
      />
    </div>
  );
}

function DeepSheet({
  open,
  onOpenChange,
  tab,
  onTabChange,
  coin,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  tab: DeepTab;
  onTabChange: (t: DeepTab) => void;
  coin: Coin;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[92vh] rounded-t-3xl border-border/60 bg-background p-0"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border/40 px-5 pb-4 pt-6 md:px-10 md:pt-8">
            <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border/80 md:hidden" />
            <div className="flex items-baseline justify-between gap-4">
              <div>
                <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                  Deeper
                </div>
                <div className="mt-1 font-serif text-2xl text-foreground md:text-3xl">
                  {coin.title}
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mt-6 -mx-5 overflow-x-auto px-5 md:mx-0 md:px-0">
              <div className="flex min-w-max gap-x-6 border-b border-transparent md:gap-x-8">
                {DEEP_TABS.map((t) => {
                  const active = tab === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => onTabChange(t.id)}
                      className={`relative pb-3 text-[11px] uppercase tracking-[0.28em] transition ${
                        active ? "text-ice" : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {t.label}
                      {active && (
                        <span className="absolute inset-x-0 -bottom-px h-px bg-ice shadow-[0_0_12px_rgba(180,210,255,0.8)]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto">
            <div className="mx-auto max-w-4xl px-5 pb-24 pt-10 md:px-10 md:pt-12">
              <div className="mb-8">
                <div className="font-serif text-sm italic text-muted-foreground">
                  {DEEP_TABS.find((t) => t.id === tab)?.caption}
                </div>
              </div>

              {tab === "analysis" && (
                <div className="space-y-10">
                  <Paragraph title="Why this coin is rare" body={coin.reasoning.rarity} />
                  <Paragraph title="Why we estimate this value" body={coin.reasoning.value} />
                  <Paragraph title="Why demand is strong" body={coin.reasoning.demand} />
                  <Paragraph title="Why this coin matters" body={coin.reasoning.importance} />
                </div>
              )}

              {tab === "market" && <MarketSection coin={coin} />}

              {tab === "references" && (() => {
                const primary = coin.references.find((r) => r.note) ?? coin.references[0];
                const supporting = coin.references.filter((r) => r !== primary);
                return (
                  <div className="space-y-10">
                    <div className="rounded-2xl border border-border/40 bg-card/30 px-6 py-8 md:px-10 md:py-10">
                      <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
                        Primary reference
                      </div>
                      <div className="mt-4 flex items-baseline gap-5">
                        <div className="font-serif text-3xl text-foreground md:text-4xl">
                          {primary.catalog}
                        </div>
                        <div className="font-serif text-5xl text-ice text-aura md:text-6xl">
                          {primary.ref}
                        </div>
                      </div>
                      {primary.note && (
                        <p className="mt-4 max-w-xl font-serif text-base italic leading-[1.55] text-muted-foreground md:text-lg">
                          {primary.note}.
                        </p>
                      )}
                    </div>

                    <div>
                      <div className="mb-4 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                        Supporting citations
                      </div>
                      <ul className="divide-y divide-border/40 border-y border-border/40">
                        {supporting.map((r, i) => (
                          <li
                            key={i}
                            className="flex items-baseline justify-between gap-6 py-4"
                          >
                            <span className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                              {r.catalog}
                            </span>
                            <span className="font-serif text-2xl text-foreground">{r.ref}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })()}

              {tab === "population" && <PopulationSection coin={coin} />}

              {tab === "provenance" && (
                <div className="relative">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-ice/40 via-border/40 to-transparent" />
                  <ol className="space-y-8">
                    {coin.provenance.map((p: Coin["provenance"][number], i: number) => (
                      <li
                        key={i}
                        className="relative grid grid-cols-[40px_80px_1fr] items-baseline gap-4 md:grid-cols-[40px_120px_1fr] md:gap-8"
                      >
                        <span className="relative z-10 mt-1.5 size-3.5 rounded-full border border-ice/40 bg-background shadow-[0_0_16px_rgba(180,210,255,0.4)]" />
                        <span className="font-serif text-2xl text-ice">{p.year}</span>
                        <div>
                          <div className="font-serif text-lg text-foreground">{p.owner}</div>
                          <div className="mt-1 text-sm font-light text-muted-foreground">
                            {p.detail}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {tab === "expert" && <ExpertSection coin={coin} />}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}


function Verdict({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:text-[11px] md:tracking-[0.22em]">{label}</div>
      <div className="mt-2 font-serif text-xl leading-tight text-ice md:text-3xl">
        {value}
        {sub && <span className="ml-1 text-sm text-muted-foreground md:text-lg">{sub}</span>}
      </div>
    </div>
  );
}

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground md:text-[11px] md:tracking-[0.22em]">
        {label}
      </dt>
      <dd className="mt-1.5 font-serif text-base text-foreground md:text-lg">{value}</dd>
    </div>
  );
}

function Paragraph({ title, body }: { title: string; body: string }) {
  return (
    <div className="max-w-2xl">
      <div className="font-serif text-xl italic text-ice">{title}.</div>
      <p className="mt-3 text-base font-light leading-[1.75] text-foreground/85">{body}</p>
    </div>
  );
}

type GradeTier = "top" | "mid" | "base";

function gradeTier(grade: string): GradeTier {
  const g = grade.toLowerCase();
  if (g.includes("ms") || g.includes("choice") || g.includes("mint")) return "top";
  if (g.includes("au") || g.includes("ef") || g.includes("xf")) return "mid";
  return "base";
}

// Grade hierarchy — Mint State reads as Radiant Intelligence Blue,
// About Uncirculated as silver-gray, VF and below as muted dark gray.
const TIER_META: Record<GradeTier, { color: string; label: string; r: number }> = {
  top: { color: "oklch(0.78 0.11 238)", label: "MS · Mint State", r: 6 },
  mid: { color: "oklch(0.78 0.01 250)", label: "AU · About Uncirculated", r: 5 },
  base: { color: "oklch(0.48 0.005 250)", label: "VF and below", r: 4 },
};

function InsightCard({
  kicker,
  title,
  headline,
  body,
}: {
  kicker: string;
  title: string;
  headline: React.ReactNode;
  body?: React.ReactNode;
}) {
  return (
    <div className="mb-5 rounded-2xl border border-aura/30 bg-gradient-to-br from-ice/[0.05] via-ice/[0.02] to-transparent px-5 py-5 md:px-6 md:py-6">
      <div className="text-[10px] uppercase tracking-[0.32em] text-aura/80">{kicker}</div>
      <div className="mt-3 text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {title}
      </div>
      <div className="mt-2 font-serif text-2xl leading-tight text-ice text-aura md:text-3xl">
        {headline}
      </div>
      {body && (
        <p className="mt-3 max-w-2xl text-[13px] font-light leading-[1.7] text-muted-foreground md:text-sm">
          {body}
        </p>
      )}
    </div>
  );
}

function dominantTier(data: GradeDist[]) {
  const groups: Record<GradeTier, GradeDist[]> = { top: [], mid: [], base: [] };
  data.forEach((d) => groups[gradeTier(d.grade)].push(d));
  let best: GradeTier = "mid";
  let bestPct = 0;
  (Object.keys(groups) as GradeTier[]).forEach((t) => {
    const sum = groups[t].reduce((s, d) => s + d.pct, 0);
    if (sum > bestPct) {
      bestPct = sum;
      best = t;
    }
  });
  const grades = groups[best];
  return {
    tier: best,
    range:
      grades.length === 0
        ? "—"
        : grades.length === 1
          ? grades[0].grade
          : `${grades[0].grade}–${grades[grades.length - 1].grade}`,
    pct: bestPct,
    label: TIER_META[best].label,
  };
}

function premiumAnalysis(data: EstByGrade[]) {
  const top = data[data.length - 1];
  const benchmark =
    data.find((d) => d.gradeNum === 55) ||
    data.find((d) => d.gradeNum >= 53 && d.gradeNum <= 58) ||
    data[Math.floor(data.length / 2)];
  const pct = Math.round(((top.estimate - benchmark.estimate) / benchmark.estimate) * 100);
  return { top, benchmark, pct };
}



function MarketSection({ coin }: { coin: Coin }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  // Interactive filters
  const allTiers: GradeTier[] = ["top", "mid", "base"];
  const [activeTiers, setActiveTiers] = useState<Set<GradeTier>>(new Set(allTiers));
  const allHouses = Array.from(new Set(coin.market.auctions.map((a) => a.house)));
  const [activeHouses, setActiveHouses] = useState<Set<string>>(new Set(allHouses));

  const toggle = <T,>(set: Set<T>, key: T, fallback: T[]) => {
    const next = new Set(set);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    return next.size === 0 ? new Set(fallback) : next;
  };

  const isAuctionVisible = (a: AuctionRecord) =>
    activeTiers.has(gradeTier(a.grade)) && activeHouses.has(a.house);

  // Chronological order (oldest → newest) for the chart
  const chrono = [...coin.market.auctions]
    .map((a, originalIndex) => ({ a, originalIndex }))
    .reverse();

  const prices = coin.market.auctions.map((a) => a.priceNum);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const range = Math.max(max - min, 1);

  const W = 600;
  const H = 180;
  const padL = 36;
  const padR = 16;
  const padT = 18;
  const padB = 28;

  const pts = chrono.map((c, i) => {
    const x = padL + (i / Math.max(chrono.length - 1, 1)) * (W - padL - padR);
    const y = padT + (1 - (c.a.priceNum - min) / range) * (H - padT - padB);
    return { x, y, ...c };
  });

  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${pts[pts.length - 1].x} ${H - padB} L ${pts[0].x} ${H - padB} Z`;

  const activePointIndex =
    hovered !== null ? hovered : selected !== null ? selected : null;
  const activeAuctionIndex =
    activePointIndex !== null ? pts[activePointIndex].originalIndex : null;

  const TrendIcon =
    coin.market.trend.direction === "up"
      ? TrendingUp
      : coin.market.trend.direction === "down"
      ? TrendingDown
      : Minus;

  const onPointActivate = (i: number) => {
    setSelected(i);
    // On mobile open the bottom sheet
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches) {
      setSheetOpen(true);
    }
  };

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

  const estimateFor = (priceNum: number) =>
    Math.round(priceNum / 1.08 / 50) * 50;

  // y-axis ticks
  const ticks = [min, min + range / 2, max];

  return (
    <div className="space-y-14">
      {/* MARKET INTELLIGENCE — interpretation first */}
      <div className="rounded-2xl border border-border/40 bg-card/30 px-6 py-7 md:px-8 md:py-8">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Market Intelligence
        </div>
        <p className="mt-4 font-serif text-lg italic leading-[1.55] text-foreground/90 md:text-2xl">
          {coin.market.trend.direction === "up"
            ? `Prices have risen ${coin.market.trend.pct} over the last ${coin.market.trend.window}.`
            : coin.market.trend.direction === "down"
            ? `Prices have softened ${coin.market.trend.pct} over the last ${coin.market.trend.window}.`
            : `Prices have held steady across the last ${coin.market.trend.window}.`}
        </p>
        <ul className="mt-4 space-y-2 text-[13px] font-light leading-[1.7] text-muted-foreground md:text-sm">
          <li>
            · {coin.market.activity.lots12m} auction results in the last 12 months.
          </li>
          <li>
            · {coin.market.activity.sellThrough} sell-through rate.
          </li>
          <li>
            · Median result {coin.market.activity.medianPremium}.
          </li>
        </ul>
      </div>

      {/* MARKET SUMMARY — understanding before evidence */}
      {coin.market.summary && (
        <div>
          <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Market Summary
          </div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-5">
            <SummaryCell label="Appearances" value={String(coin.market.summary.totalAppearances)} />
            <SummaryCell label="Median Price" value={coin.market.summary.medianPrice} />
            <SummaryCell label="Highest Result" value={coin.market.summary.highestResult} />
            <SummaryCell label="Lowest Result" value={coin.market.summary.lowestResult} />
            <SummaryCell label="Most Common Grade" value={coin.market.summary.mostCommonGrade} />
          </div>
        </div>
      )}

      {/* GRADE DISTRIBUTION */}
      {coin.market.gradeDistribution && (
        <GradeDistributionChart
          data={coin.market.gradeDistribution}
          auctions={coin.market.auctions}
        />
      )}

      {/* ESTIMATED VALUE BY GRADE */}
      {coin.market.estimatedByGrade && (
        <EstimatedByGradeChart data={coin.market.estimatedByGrade} />
      )}

      {/* INDICATORS */}
      <div className="grid gap-px overflow-hidden rounded-xl border border-border/40 bg-border/40 md:grid-cols-3">
        <Stat
          label="Market Momentum"
          value={
            <span className="inline-flex items-center gap-2">
              <TrendIcon className="size-5" strokeWidth={1.5} />
              {coin.market.trend.pct}
            </span>
          }
          sub={`Trend over ${coin.market.trend.window}`}
        />
        <Stat
          label="Market Activity"
          value={String(coin.market.activity.lots12m)}
          sub={`Auction appearances in last 12 mo · ${coin.market.activity.sellThrough} sold`}
        />
        <Stat
          label="Auction Performance"
          value={coin.market.activity.medianPremium}
          sub="Median result vs. auction estimate"
        />
      </div>

      {/* PRICE HISTORY — numismatic auction chart */}
      <div>
        <InsightCard
          kicker="Auction Behaviour"
          title="Market development"
          headline={
            <>
              {coin.market.trend.pct}{" "}
              <span className="text-foreground/70">
                over the last {coin.market.trend.window}
              </span>
            </>
          }
          body={
            <span className="block space-y-1">
              <span className="block">
                {coin.market.activity.lots12m} auction results in the last 12 months.
              </span>
              <span className="block">
                {coin.market.activity.sellThrough} sell-through rate.
              </span>
              <span className="block">
                Average result: {coin.market.activity.medianPremium}.
              </span>
            </span>
          }
        />
        <div className="mb-2 flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Auction Record
            </div>
            <div className="mt-1 font-serif text-sm italic text-muted-foreground">
              Each point is a real sale. Color reflects grade. Tap to inspect.
            </div>
          </div>
          <div className="hidden font-serif text-sm italic text-muted-foreground md:block">
            {chrono[0].a.date} → {chrono[chrono.length - 1].a.date}
          </div>
        </div>


        <div className="relative rounded-xl border border-border/40 bg-card/30 p-4">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
            className="h-56 w-full md:h-64"
            onMouseLeave={() => setHovered(null)}
          >
            <defs>
              <linearGradient id="priceFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0.22" />
                <stop offset="100%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* y grid + labels */}
            {ticks.map((t, i) => {
              const y = padT + (1 - (t - min) / range) * (H - padT - padB);
              return (
                <g key={i}>
                  <line
                    x1={padL}
                    x2={W - padR}
                    y1={y}
                    y2={y}
                    stroke="oklch(0.3 0.01 250)"
                    strokeOpacity="0.35"
                    strokeDasharray="2 4"
                  />
                  <text
                    x={padL - 6}
                    y={y + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill="oklch(0.62 0.01 250)"
                    fontFamily="Inter, sans-serif"
                  >
                    €{formatPrice(t)}
                  </text>
                </g>
              );
            })}

            {/* area + line */}
            <path d={areaPath} fill="url(#priceFill)" />
            <path
              d={linePath}
              fill="none"
              stroke="oklch(0.78 0.04 230)"
              strokeOpacity="0.65"
              strokeWidth="1.25"
            />

            {/* x labels (first/middle/last) */}
            {[0, Math.floor(pts.length / 2), pts.length - 1].map((i) => (
              <text
                key={`xl-${i}`}
                x={pts[i].x}
                y={H - 8}
                textAnchor="middle"
                fontSize="9"
                fill="oklch(0.62 0.01 250)"
                fontFamily="Inter, sans-serif"
              >
                {pts[i].a.date}
              </text>
            ))}

            {/* points */}
            {pts.map((p, i) => {
              const tier = gradeTier(p.a.grade);
              const meta = TIER_META[tier];
              const isActive = activePointIndex === i;
              const visible = isAuctionVisible(p.a);
              return (
                <g
                  key={i}
                  style={{
                    opacity: visible ? 1 : 0.12,
                    transition: "opacity 320ms ease",
                  }}
                >
                  {isActive && visible && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={meta.r + 6}
                      fill={meta.color}
                      fillOpacity="0.18"
                    />
                  )}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={meta.r}
                    fill={meta.color}
                    stroke="oklch(0.12 0.005 250)"
                    strokeWidth="1.5"
                  />
                  {/* invisible hit target */}
                  {visible && (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={16}
                      fill="transparent"
                      style={{ cursor: "pointer" }}
                      onMouseEnter={() => setHovered(i)}
                      onClick={() => onPointActivate(i)}
                    />
                  )}
                </g>
              );
            })}
          </svg>

          {/* Desktop floating card */}
          {activePointIndex !== null && (
            <FloatingAuctionCard
              point={pts[activePointIndex]}
              boxW={W}
              boxH={H}
              estimate={estimateFor(pts[activePointIndex].a.priceNum)}
            />
          )}
        </div>

        {/* Legend */}
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          {(Object.keys(TIER_META) as GradeTier[]).map((t) => (
            <span key={t} className="inline-flex items-center gap-2">
              <span
                className="inline-block size-2.5 rounded-full"
                style={{ background: TIER_META[t].color }}
              />
              {TIER_META[t].label}
            </span>
          ))}
        </div>

        {/* Interactive filters */}
        <FilterChips
          label="Grade"
          options={allTiers.map<ChipOption>((t) => ({
            key: t,
            label: TIER_META[t].label.split(" ")[0],
            swatch: TIER_META[t].color,
            count: coin.market.auctions.filter((a) => gradeTier(a.grade) === t).length,
          }))}
          active={activeTiers as Set<string>}
          onToggle={(k) =>
            setActiveTiers((s) => toggle(s, k as GradeTier, allTiers))
          }
          onAll={() => setActiveTiers(new Set(allTiers))}
          totalLabel={`${coin.market.auctions.filter(isAuctionVisible).length} of ${coin.market.auctions.length} visible`}
        />
        <FilterChips
          label="House"
          options={allHouses.map<ChipOption>((h) => ({
            key: h,
            label: h,
            count: coin.market.auctions.filter((a) => a.house === h).length,
          }))}
          active={activeHouses}
          onToggle={(k) => setActiveHouses((s) => toggle(s, k, allHouses))}
          onAll={() => setActiveHouses(new Set(allHouses))}
        />
      </div>

      {/* RECENT SALES — connected to chart */}
      <div>
        <div className="mb-5 flex items-baseline justify-between">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Recent sales
          </div>
          {activeAuctionIndex !== null && (
            <button
              onClick={() => {
                setSelected(null);
                setHovered(null);
              }}
              className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground transition hover:text-ice"
            >
              Clear selection
            </button>
          )}
        </div>
        <div className="divide-y divide-border/40">
          <div className="hidden grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] gap-4 pb-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground md:grid">
            <div>Auction house</div>
            <div>Date</div>
            <div>Grade</div>
            <div>Lot</div>
            <div className="text-right">Result</div>
          </div>
          {coin.market.auctions.map((a, i) => {
            const tier = gradeTier(a.grade);
            const isActive = activeAuctionIndex === i;
            const visible = isAuctionVisible(a);
            // Map original index back to chart point index
            const chartIndex = pts.findIndex((p) => p.originalIndex === i);
            return (
              <button
                key={i}
                onClick={() => visible && setSelected(chartIndex)}
                onMouseEnter={() => visible && setHovered(chartIndex)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  opacity: visible ? 1 : 0.28,
                  transition: "opacity 280ms ease",
                }}
                className={`grid w-full grid-cols-[1fr_auto] gap-x-4 gap-y-1 py-4 text-left transition md:grid-cols-[1.4fr_1fr_0.8fr_0.8fr_1fr] md:items-baseline ${
                  isActive
                    ? "bg-ice/[0.04] px-3 -mx-3 rounded-md"
                    : "hover:bg-card/40 px-3 -mx-3 rounded-md"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="inline-block size-2 shrink-0 rounded-full"
                    style={{ background: TIER_META[tier].color }}
                  />
                  <span className="font-serif text-base text-foreground md:text-lg">
                    {a.house}
                  </span>
                </div>
                <div className="order-3 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                  {a.date}
                </div>
                <div className="order-4 col-span-2 text-xs text-muted-foreground md:order-none md:col-span-1 md:text-sm">
                  <span className="md:hidden">Grade · </span>
                  {a.grade}
                </div>
                <div className="order-5 col-span-2 hidden text-sm text-muted-foreground md:block">
                  {a.lot ? `#${a.lot}` : "—"}
                </div>
                <div
                  className={`text-right font-serif text-lg md:text-xl ${
                    isActive ? "text-ice text-aura" : "text-ice"
                  }`}
                >
                  {a.price}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile bottom sheet for point detail */}
      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent
          side="bottom"
          className="rounded-t-2xl border-border/60 bg-background p-0 md:hidden"
        >
          {activePointIndex !== null && (
            <AuctionDetail
              record={pts[activePointIndex].a}
              estimate={estimateFor(pts[activePointIndex].a.priceNum)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function FloatingAuctionCard({
  point,
  boxW,
  boxH,
  estimate,
}: {
  point: { x: number; y: number; a: AuctionRecord };
  boxW: number;
  boxH: number;
  estimate: number;
}) {
  const leftPct = (point.x / boxW) * 100;
  const topPct = (point.y / boxH) * 100;
  // Flip card to other side near edges
  const flipX = leftPct > 65;
  const flipY = topPct < 35;
  return (
    <div
      className="pointer-events-none absolute z-10 hidden md:block"
      style={{
        left: `${leftPct}%`,
        top: `${topPct}%`,
        transform: `translate(${flipX ? "calc(-100% - 14px)" : "14px"}, ${
          flipY ? "10px" : "calc(-100% - 10px)"
        })`,
      }}
    >
      <div className="w-72 rounded-xl border border-ice/30 bg-background/95 p-4 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur">
        <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">
          {point.a.house}
        </div>
        <div className="mt-1 font-serif text-2xl text-ice">{point.a.price}</div>
        <div className="mt-1 flex items-baseline justify-between text-xs font-light text-muted-foreground">
          <span>Estimate €{new Intl.NumberFormat("en-US").format(estimate)}</span>
          <PremiumBadge price={point.a.priceNum} estimate={estimate} />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3 border-t border-border/40 pt-3">
          <Detail label="Sale date" value={point.a.date} />
          <Detail label="Grade" value={point.a.grade} />
          {point.a.lot && <Detail label="Lot" value={`#${point.a.lot}`} />}
        </div>
        <div className="mt-3 border-t border-border/40 pt-3 text-[10px] uppercase tracking-[0.22em] text-aura/80">
          View auction record →
        </div>
      </div>

    </div>
  );
}

function AuctionDetail({ record, estimate }: { record: AuctionRecord; estimate: number }) {
  return (
    <div className="px-5 pb-8 pt-6">
      <div className="mx-auto mb-5 h-1 w-10 rounded-full bg-border/80" />
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {record.house}
      </div>
      <div className="mt-2 font-serif text-4xl text-ice">{record.price}</div>
      <div className="mt-1 flex items-baseline justify-between text-sm font-light text-muted-foreground">
        <span>Estimate €{new Intl.NumberFormat("en-US").format(estimate)}</span>
        <PremiumBadge price={record.priceNum} estimate={estimate} />
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border/40 pt-5">
        <Detail label="Sale date" value={record.date} />
        <Detail label="Grade" value={record.grade} />
        {record.lot && <Detail label="Lot" value={`#${record.lot}`} />}
        <Detail
          label="Premium vs estimate"
          value={`${record.priceNum >= estimate ? "+" : ""}${Math.round(((record.priceNum - estimate) / estimate) * 100)}%`}
        />
      </div>
      <div className="mt-6 flex gap-3">
        <button className="flex-1 rounded-md border border-ice/40 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-ice transition hover:bg-ice/10">
          View Auction Record
        </button>
        <button className="flex-1 rounded-md border border-border/60 px-4 py-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-ice/40 hover:text-ice">
          View Images
        </button>
      </div>
    </div>
  );
}

function PremiumBadge({ price, estimate }: { price: number; estimate: number }) {
  const pct = Math.round(((price - estimate) / estimate) * 100);
  const positive = pct >= 0;
  return (
    <span
      className={`rounded-full border px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] ${
        positive
          ? "border-aura/40 text-aura"
          : "border-border/50 text-muted-foreground"
      }`}
    >
      {positive ? "+" : ""}
      {pct}% vs est
    </span>
  );
}



function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[9px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
      <div className="mt-1 font-serif text-base text-foreground">{value}</div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div className="bg-background/40 p-6">
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-3 font-serif text-2xl text-foreground md:text-3xl">{value}</div>
      {sub && <div className="mt-1 text-xs font-light text-muted-foreground">{sub}</div>}
    </div>
  );
}

function PopulationSection({ coin }: { coin: Coin }) {
  const { ngc, pcgs, knownExamples } = coin.population;

  // Derive finest known across both services
  const gradeOrder = ["MS", "AU", "EF", "VF", "F", "VG", "G"];
  const parseGrade = (g: string) => {
    const prefix = gradeOrder.find((p) => g.startsWith(p)) || "";
    const num = parseInt(g.replace(/\D/g, ""), 10) || 0;
    return { prefix, num, raw: g };
  };
  const ngcParsed = parseGrade(ngc.topGrade);
  const pcgsParsed = parseGrade(pcgs.topGrade);
  const finest =
    gradeOrder.indexOf(ngcParsed.prefix) > gradeOrder.indexOf(pcgsParsed.prefix)
      ? { grade: ngc.topGrade, count: ngc.finer, source: "NGC" }
      : gradeOrder.indexOf(ngcParsed.prefix) < gradeOrder.indexOf(pcgsParsed.prefix)
        ? { grade: pcgs.topGrade, count: pcgs.finer, source: "PCGS" }
        : ngcParsed.num >= pcgsParsed.num
          ? { grade: ngc.topGrade, count: ngc.finer, source: "NGC" }
          : { grade: pcgs.topGrade, count: pcgs.finer, source: "PCGS" };

  return (
    <div className="space-y-14">
      {/* KNOWN EXAMPLES — dominant conclusion */}
      {knownExamples !== undefined && (
        <div>
          <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Known Examples
          </div>
          <div className="mt-5 font-serif text-7xl leading-none text-ice text-aura md:text-8xl">
            {knownExamples}
          </div>
          <p className="mt-6 max-w-xl font-serif text-lg italic leading-[1.6] text-muted-foreground md:text-xl">
            Across grading services, auction records and documented collections.
            High-grade survivors remain materially scarcer than the headline figure suggests.
          </p>
        </div>
      )}

      {/* FINEST KNOWN — second insight */}
      <div className="border-t border-border/30 pt-10">
        <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Finest Known
        </div>
        <div className="mt-4 flex items-baseline gap-5">
          <div className="font-serif text-5xl text-ice md:text-6xl">{finest.grade}</div>
          <div className="text-sm font-light text-muted-foreground">
            {finest.count} example{finest.count === 1 ? "" : "s"} at the highest recorded grade
          </div>
        </div>
      </div>

      {/* GRADING SERVICES — structured evidence */}
      <div className="border-t border-border/30 pt-10">
        <div className="mb-6 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
          Grading Services
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          <PopCard service="NGC" graded={ngc.graded} top={ngc.topGrade} finer={ngc.finer} />
          <PopCard service="PCGS" graded={pcgs.graded} top={pcgs.topGrade} finer={pcgs.finer} />
        </div>
      </div>

      {/* TOP CENSUS */}
      {coin.population.topCensus && coin.population.topCensus.length > 0 && (
        <div className="border-t border-border/30 pt-10">
          <div className="mb-5 text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Top Census
          </div>
          <ul className="divide-y divide-border/40 border-y border-border/40">
            {coin.population.topCensus.map((c, i) => (
              <li key={i} className="flex items-baseline justify-between gap-6 py-3">
                <span className="font-serif text-lg text-foreground">{c.grade}</span>
                <span className="text-sm text-muted-foreground">
                  {c.count} example{c.count === 1 ? "" : "s"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function PopCard({
  service,
  graded,
  top,
  finer,
}: {
  service: string;
  graded: number;
  top: string;
  finer: number;
}) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 px-6 py-6">
      <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">{service}</div>
      <div className="mt-3 font-serif text-4xl text-foreground">{graded}</div>
      <div className="mt-1 text-xs font-light text-muted-foreground">Total certified</div>
      <div className="mt-5 flex items-baseline justify-between border-t border-border/40 pt-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Finest
          </div>
          <div className="mt-1 font-serif text-2xl text-ice">{top}</div>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            At finest
          </div>
          <div className="mt-1 font-serif text-2xl text-foreground">{finer}</div>
        </div>
      </div>
    </div>
  );
}


function ExpertSection({ coin }: { coin: Coin }) {
  const [tab, setTab] = useState<"dies" | "variants" | "literature" | "comparatives" | "notes">("dies");
  const tabs = [
    { id: "dies" as const, label: "Die studies" },
    { id: "variants" as const, label: "Variants" },
    { id: "literature" as const, label: "Literature" },
    { id: "comparatives" as const, label: "Comparative examples" },
    { id: "notes" as const, label: "Specialist notes" },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-x-6 gap-y-2 border-b border-border/40 pb-3">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`text-[10px] uppercase tracking-[0.32em] transition ${
              tab === t.id ? "text-ice" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.label}
            {tab === t.id && (
              <span className="ml-2 inline-block size-1 rounded-full bg-ice align-middle shadow-[0_0_8px_rgba(180,210,255,0.8)]" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 min-h-[160px]">
        {tab === "dies" && (
          <p className="max-w-2xl font-serif text-lg leading-[1.7] text-foreground/90">
            {coin.expert.dieStudies}
          </p>
        )}
        {tab === "variants" && (
          <ul className="space-y-5">
            {coin.expert.variants.map((v, i) => (
              <li key={i} className="border-b border-border/30 pb-5 last:border-b-0">
                <div className="font-serif text-lg text-foreground">{v.name}</div>
                <div className="mt-1 text-sm font-light text-muted-foreground">{v.note}</div>
              </li>
            ))}
          </ul>
        )}
        {tab === "literature" && (
          <ul className="space-y-5">
            {coin.expert.literature.map((l, i) => (
              <li key={i} className="grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-border/30 pb-5 last:border-b-0">
                <div>
                  <div className="font-serif text-lg italic text-foreground">{l.title}</div>
                  <div className="mt-1 text-sm font-light text-muted-foreground">{l.author}</div>
                </div>
                <div className="font-serif text-ice">{l.year}</div>
              </li>
            ))}
          </ul>
        )}
        {tab === "comparatives" && (
          coin.expert.comparatives && coin.expert.comparatives.length > 0 ? (
            <ul className="space-y-5">
              {coin.expert.comparatives.map((c, i) => (
                <li key={i} className="border-b border-border/30 pb-5 last:border-b-0">
                  <div className="font-serif text-lg text-foreground">{c.title}</div>
                  <div className="mt-1 text-sm font-light text-muted-foreground">{c.detail}</div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="max-w-2xl font-serif text-base italic text-muted-foreground">
              Comparable specimens are being indexed.
            </p>
          )
        )}
        {tab === "notes" && (
          <p className="max-w-2xl font-serif text-lg leading-[1.7] text-foreground/90">
            {coin.expert.notes}
          </p>
        )}
      </div>
    </div>
  );
}

function SummaryCell({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
      <div className="mt-2 font-serif text-2xl text-foreground md:text-3xl">{value}</div>
    </div>
  );
}

function gradeIsMintState(g: string) {
  return /ms/i.test(g);
}
function gradeIsAU(g: string) {
  return /au/i.test(g);
}
function gradeTierLabel(g: string) {
  if (gradeIsMintState(g)) return "Mint State";
  if (gradeIsAU(g)) return "About Uncirculated";
  if (/ef|xf/i.test(g)) return "Extremely Fine";
  return "Very Fine";
}

function typicalRange(data: GradeDist[]) {
  // contiguous span (by input order) of grades covering ≥60% cumulative share,
  // expanded from the modal grade outward.
  if (data.length === 0) return null;
  const modeIdx = data.reduce((best, d, i) => (d.pct > data[best].pct ? i : best), 0);
  let lo = modeIdx;
  let hi = modeIdx;
  let sum = data[modeIdx].pct;
  while (sum < 60 && (lo > 0 || hi < data.length - 1)) {
    const left = lo > 0 ? data[lo - 1].pct : -1;
    const right = hi < data.length - 1 ? data[hi + 1].pct : -1;
    if (right >= left) {
      hi += 1;
      sum += data[hi].pct;
    } else {
      lo -= 1;
      sum += data[lo].pct;
    }
  }
  return {
    from: data[lo].grade,
    to: data[hi].grade,
    tier: gradeTierLabel(data[modeIdx].grade),
    pct: sum,
  };
}

function GradeDistributionChart({
  data,
  auctions,
}: {
  data: GradeDist[];
  auctions: AuctionRecord[];
}) {
  const max = Math.max(...data.map((d) => d.pct));
  const [selected, setSelected] = useState<string | null>(null);

  const mostCommon = data.reduce((best, d) => (d.count > best.count ? d : best), data[0]);
  const rarest = data.reduce((least, d) => (d.count < least.count ? d : least), data[0]);
  const range = typicalRange(data);

  const formatPrice = (n: number) =>
    `€${new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n)}`;

  const detailFor = (grade: string) => {
    const dist = data.find((d) => d.grade === grade);
    if (!dist) return null;
    const matches = auctions.filter((a) => a.grade === grade);
    if (matches.length === 0) {
      return { dist, count: 0, avg: null, high: null, latest: null };
    }
    const prices = matches.map((m) => m.priceNum);
    return {
      dist,
      count: matches.length,
      avg: Math.round(prices.reduce((a, b) => a + b, 0) / prices.length),
      high: matches.reduce((h, m) => (m.priceNum > h.priceNum ? m : h), matches[0]),
      latest: matches[0], // auctions array is newest-first
    };
  };

  const detail = selected ? detailFor(selected) : null;

  return (
    <div>
      <div className="mb-5 grid gap-4 md:grid-cols-3">
        <InsightCard
          kicker="Insight"
          title="Most common grade"
          headline={mostCommon.grade}
          body={<>{mostCommon.pct}% of all documented auction results.</>}
        />
        <InsightCard
          kicker="Insight"
          title="Rarest documented grade"
          headline={rarest.grade}
          body={
            <>
              Only {rarest.count} documented auction result
              {rarest.count === 1 ? "" : "s"}.
            </>
          }
        />
        {range && (
          <InsightCard
            kicker="Insight"
            title="Typical market range"
            headline={`${range.from}–${range.to}`}
            body={
              <>
                The majority of documented examples fall within the {range.tier} range.
              </>
            }
          />
        )}
      </div>

      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Grade Distribution
          </div>
          <div className="mt-1 font-serif text-sm italic text-muted-foreground">
            Evidence · share of recorded auction appearances by grade. Select a grade for detail.
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-card/30 p-5 md:p-6">
        <div className="grid grid-cols-1 gap-3">
          {data.map((d, i) => {
            const w = Math.max((d.pct / max) * 100, 2);
            const on = selected === null || selected === d.grade;
            const isActive = selected === d.grade;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelected(isActive ? null : d.grade)}
                className="grid grid-cols-[60px_1fr_72px] items-center gap-4 rounded-md px-1 py-1 text-left transition hover:bg-ice/[0.04]"
                style={{ opacity: on ? 1 : 0.3 }}
              >
                <span
                  className={cn(
                    "text-[11px] uppercase tracking-[0.22em]",
                    isActive ? "text-ice" : "text-muted-foreground",
                  )}
                >
                  {d.grade}
                </span>
                <div className="relative h-2 overflow-hidden rounded-full bg-border/40">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${w}%`,
                      background: isActive
                        ? "linear-gradient(90deg, oklch(0.82 0.13 238) 0%, oklch(0.9 0.07 230) 100%)"
                        : "linear-gradient(90deg, oklch(0.72 0.12 240) 0%, oklch(0.82 0.06 230) 100%)",
                      transition: "width 480ms cubic-bezier(.22,.61,.36,1)",
                    }}
                  />
                </div>
                <span className="text-right font-serif text-sm text-foreground">
                  {d.pct}% · {d.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {detail && (
        <div className="mt-4 rounded-2xl border border-aura/30 bg-gradient-to-br from-ice/[0.05] via-ice/[0.02] to-transparent px-5 py-5 md:px-6 md:py-6">
          <div className="flex items-baseline justify-between gap-4">
            <div>
              <div className="text-[10px] uppercase tracking-[0.32em] text-aura/80">
                Grade detail
              </div>
              <div className="mt-2 font-serif text-2xl text-aura md:text-3xl">
                {detail.dist.grade}
              </div>
              <div className="mt-1 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
                {gradeTierLabel(detail.dist.grade)}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-ice"
            >
              Close
            </button>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-5 md:grid-cols-5">
            <SummaryCell label="Auction results" value={String(detail.dist.count)} />
            <SummaryCell
              label="Average price"
              value={detail.avg !== null ? formatPrice(detail.avg) : "—"}
            />
            <SummaryCell
              label="Highest result"
              value={detail.high ? formatPrice(detail.high.priceNum) : "—"}
            />
            <SummaryCell
              label="Latest result"
              value={
                detail.latest
                  ? `${formatPrice(detail.latest.priceNum)} · ${detail.latest.date}`
                  : "—"
              }
            />
            <SummaryCell label="Share of sales" value={`${detail.dist.pct}%`} />
          </div>
          {detail.count === 0 && (
            <p className="mt-4 text-[13px] font-light leading-[1.7] text-muted-foreground md:text-sm">
              No matching auction results in the sampled record for this grade.
            </p>
          )}
        </div>
      )}
    </div>
  );
}


function EstimatedByGradeChart({ data }: { data: EstByGrade[] }) {
  const allGrades = data.map((d) => d.grade);
  const [active, setActive] = useState<Set<string>>(new Set(allGrades));
  const toggle = (g: string) =>
    setActive((s) => {
      const next = new Set(s);
      if (next.has(g)) next.delete(g);
      else next.add(g);
      return next.size === 0 ? new Set(allGrades) : next;
    });
  const isOn = (g: string) => active.has(g);

  const W = 600;
  const H = 220;
  const padL = 44;
  const padR = 16;
  const padT = 16;
  const padB = 32;

  const allVals = data.flatMap((d) => [d.low, d.high, ...d.sales]);
  const maxVal = Math.max(...allVals);
  const minX = Math.min(...data.map((d) => d.gradeNum));
  const maxX = Math.max(...data.map((d) => d.gradeNum));

  const xFor = (g: number) =>
    padL + ((g - minX) / Math.max(maxX - minX, 1)) * (W - padL - padR);
  const yFor = (v: number) =>
    padT + (1 - v / maxVal) * (H - padT - padB);

  const linePath = data
    .map((d, i) => `${i === 0 ? "M" : "L"} ${xFor(d.gradeNum)} ${yFor(d.estimate)}`)
    .join(" ");
  const areaTop = data.map((d) => `${xFor(d.gradeNum)},${yFor(d.high)}`).join(" ");
  const areaBottom = [...data]
    .reverse()
    .map((d) => `${xFor(d.gradeNum)},${yFor(d.low)}`)
    .join(" ");

  const formatPrice = (n: number) =>
    new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(n);

  const ticks = [0, Math.round(maxVal / 2), maxVal];

  const prem = premiumAnalysis(data);
  return (
    <div>
      <InsightCard
        kicker="Insight"
        title="Grade premium analysis"
        headline={
          <>
            {prem.top.grade}{" "}
            <span className="text-foreground/70">
              achieves approximately {prem.pct}% higher results
            </span>{" "}
            than {prem.benchmark.grade}
          </>
        }
        body={
          <>
            The strongest value increase starts above AU58 and accelerates within
            the Mint State range.
          </>
        }
      />
      <div className="mb-2 flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            Estimated Value by Grade
          </div>
          <div className="mt-1 font-serif text-sm italic text-muted-foreground">
            Evidence · estimate curve, 80% confidence interval, observed sales.
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border/40 bg-card/30 p-4">
        <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="h-64 w-full md:h-72">
          <defs>
            <linearGradient id="ciFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0.28" />
              <stop offset="100%" stopColor="oklch(0.72 0.12 240)" stopOpacity="0.04" />
            </linearGradient>
          </defs>
          {ticks.map((t, i) => {
            const y = yFor(t);
            return (
              <g key={i}>
                <line
                  x1={padL}
                  x2={W - padR}
                  y1={y}
                  y2={y}
                  stroke="oklch(0.3 0.01 250)"
                  strokeOpacity="0.35"
                  strokeDasharray="2 4"
                />
                <text
                  x={padL - 6}
                  y={y + 3}
                  textAnchor="end"
                  fontSize="9"
                  fill="oklch(0.62 0.01 250)"
                  fontFamily="Inter, sans-serif"
                >
                  €{formatPrice(t)}
                </text>
              </g>
            );
          })}
          <polygon points={`${areaTop} ${areaBottom}`} fill="url(#ciFill)" />
          <path d={linePath} fill="none" stroke="oklch(0.78 0.11 238)" strokeWidth="1.5" />
          {data.flatMap((d) =>
            d.sales.map((s, j) => {
              const on = isOn(d.grade);
              return (
                <circle
                  key={`${d.grade}-${j}`}
                  cx={xFor(d.gradeNum)}
                  cy={yFor(s)}
                  r={3}
                  fill="oklch(0.78 0.11 238)"
                  fillOpacity={on ? 0.55 : 0.08}
                  stroke="oklch(0.12 0.005 250)"
                  strokeWidth="1"
                  style={{ transition: "fill-opacity 300ms ease" }}
                />
              );
            }),
          )}
          {data.map((d, i) => {
            const on = isOn(d.grade);
            return (
              <g key={`x-${i}`} style={{ opacity: on ? 1 : 0.28, transition: "opacity 300ms ease" }}>
                <circle
                  cx={xFor(d.gradeNum)}
                  cy={yFor(d.estimate)}
                  r={4}
                  fill="oklch(0.92 0.04 230)"
                  stroke="oklch(0.12 0.005 250)"
                  strokeWidth="1.5"
                />
                <text
                  x={xFor(d.gradeNum)}
                  y={H - 10}
                  textAnchor="middle"
                  fontSize="9"
                  fill="oklch(0.62 0.01 250)"
                  fontFamily="Inter, sans-serif"
                >
                  {d.grade}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <FilterChips
        label="Grade"
        options={data.map<ChipOption>((d) => ({ key: d.grade, label: d.grade }))}
        active={active}
        onToggle={toggle}
        onAll={() => setActive(new Set(allGrades))}
        totalLabel={`${active.size} of ${allGrades.length} grades`}
      />
      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-0.5 w-5 bg-[oklch(0.78_0.11_238)]" />
          Estimate curve
        </span>
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-3 rounded-sm"
            style={{ background: "oklch(0.72 0.12 240 / 0.25)" }}
          />
          80% confidence
        </span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block size-2 rounded-full bg-[oklch(0.78_0.11_238)]" />
          Observed sales
        </span>
      </div>
    </div>
  );
}
