import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { AuraField } from "@/components/AuraField";
import { LiveDemo } from "@/components/LiveDemo";
import editorialUnderstanding from "@/assets/editorial-understanding.jpg";
import editorialEvidence from "@/assets/editorial-evidence.jpg";
import editorialVitrine from "@/assets/editorial-vitrine.jpg";
import coinHero from "@/assets/coin-hero.jpg";
import coinDemo from "@/assets/coin-demo.jpg";
import { ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NUMIX — The intelligence layer behind rare coins" },
      { name: "description", content: "Understanding first. Evidence on demand." },
      { property: "og:title", content: "NUMIX — The intelligence layer behind rare coins" },
      { property: "og:description", content: "Understanding first. Evidence on demand." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />

      <SiteHeader />

      {/* ───────── HERO ───────── */}
      <section className="relative z-10 flex flex-col items-center px-5 pt-14 pb-12 md:px-6 md:pt-20 md:pb-20">
        <h1 className="animate-rise max-w-xl text-center font-serif text-[1.8rem] leading-[1.08] tracking-tight text-foreground sm:text-[2.2rem] md:max-w-2xl md:text-5xl lg:text-[3.6rem]">
          The Intelligence
          <br />
          <span className="italic text-ice text-aura">Behind Rarity.</span>
        </h1>

        <div className="mt-12 w-full animate-rise delay-2 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── LIVE DEMO ───────── */}
      <section className="relative z-10 flex justify-center px-6 pb-12">
        <LiveDemo />
      </section>



      {/* ───────── UNDERSTANDING ───────── */}
      <EditorialChapter
        image={editorialUnderstanding}
        statement={<>True <span className="italic text-ice">value,</span><br />beyond the price.</>}
        align="left"
      />

      {/* ───────── EVIDENCE ───────── */}
      <EditorialChapter
        image={editorialEvidence}
        statement={<>Fine <span className="italic text-ice">data,</span><br />expert insights unlocked.</>}
        align="right"
      />


      {/* ───────── EDITORIAL III ───────── */}
      <EditorialChapter
        image={editorialVitrine}
        statement={<>Collect with <span className="italic text-ice">confidence,</span><br />Build value.</>}
        align="right"
      />

      {/* ───────── CLOSING SEARCH ───────── */}
      <section className="relative z-10 mx-auto max-w-4xl px-5 pt-20 pb-28 text-center md:px-6 md:pt-28 md:pb-36">
        <h2 className="font-serif text-[1.6rem] leading-[1.08] tracking-tight sm:text-[2rem] md:text-5xl">
          <span className="italic text-ice text-aura">Begin.</span>
        </h2>

        <div className="mt-12 flex justify-center">
          <AuraField />
        </div>
      </section>

      {/* ───────── NUMIX JOURNAL ───────── */}
      <section className="relative z-10 mx-auto max-w-5xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between md:mb-16">
          <div>
            <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
              Research &amp; Analysis
            </div>
            <h2 className="mt-3 font-serif text-[1.5rem] leading-[1.08] tracking-tight text-foreground sm:text-[2rem] md:text-[2.6rem]">
              NUMIX <span className="italic text-ice">Journal</span>
            </h2>
          </div>
          <span className="hidden text-[11px] uppercase tracking-[0.28em] text-muted-foreground sm:block">
            Latest insights
          </span>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {/* Card 1 */}
          <article className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl transition hover:border-aura">
            <div className="relative h-52 overflow-hidden md:h-60">
              <img
                src={coinHero}
                alt="Athens Tetradrachm"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full border border-aura/30 bg-background/50 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-ice backdrop-blur-md">
                Market Analysis
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Attica</span>
                <span className="opacity-30">·</span>
                <span>c. 450 BC</span>
                <span className="opacity-30">·</span>
                <span>MS62</span>
              </div>
              <h3 className="mt-3 font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">
                The Owl Surge: Why Athenian Tetradrachms Outperformed Gold in 2024
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                Auction data shows a 34% price appreciation for high-grade Owls of Athena. We dissect the grades — from EF40 to MS63 — and what they mean for entry points.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ice transition group-hover:opacity-80">
                <span>Read analysis</span>
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </div>
            </div>
          </article>

          {/* Card 2 */}
          <article className="group relative overflow-hidden rounded-2xl border border-border/40 bg-card/30 backdrop-blur-xl transition hover:border-aura">
            <div className="relative h-52 overflow-hidden md:h-60">
              <img
                src={coinDemo}
                alt="Friedrich August I Thaler"
                loading="lazy"
                className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-background/60 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card/80 to-transparent" />
              <span className="absolute top-4 left-4 rounded-full border border-aura/30 bg-background/50 px-3 py-1 text-[9px] uppercase tracking-[0.24em] text-ice backdrop-blur-md">
                Auction Intelligence
              </span>
            </div>
            <div className="p-5 md:p-6">
              <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>Saxony</span>
                <span className="opacity-30">·</span>
                <span>1711</span>
                <span className="opacity-30">·</span>
                <span>AU55</span>
              </div>
              <h3 className="mt-3 font-serif text-lg leading-snug tracking-tight text-foreground md:text-xl">
                Davenport 747: A Thaler's Journey from VF30 to Record AU58
              </h3>
              <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                Tracing every verified auction appearance since 2011. How strike quality, cabinet toning and provenance created a €48,000 delta between grades.
              </p>
              <div className="mt-5 flex items-center gap-1.5 text-[11px] uppercase tracking-[0.22em] text-ice transition group-hover:opacity-80">
                <span>Read analysis</span>
                <ArrowUpRight className="size-3.5" strokeWidth={1.5} />
              </div>
            </div>
          </article>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border/30 px-6 py-8 md:px-14 md:py-12">
        <div className="flex flex-col items-center justify-between gap-5 md:flex-row md:gap-6">
          <Link to="/" aria-label="NUMIX" className="group">
            <img
              src="/logo.png"
              alt="NUMIX"
              className="h-10 w-auto md:h-12 transition-transform duration-300 group-hover:-translate-y-0.5"
            />
          </Link>
          <nav className="flex items-center gap-5 text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
            <Link to="/auth/login" className="transition hover:text-ice">Sign in</Link>
            <span className="opacity-30">·</span>
            <Link to="/auth/register" className="transition hover:text-ice">Become a member</Link>
            <span className="opacity-30">·</span>
            <Link to="/auth/forgot" className="transition hover:text-ice">Recover access</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function EditorialChapter({
  image,
  statement,
  align,
}: {
  image: string;
  statement: React.ReactNode;
  align: "left" | "right";
}) {
  return (
    <section className="relative z-10 w-full">
      <div className="relative h-[60vh] min-h-[420px] w-full overflow-hidden md:h-[70vh]">
        <img
          src={image}
          alt=""
          loading="lazy"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* top fade into page */}
        <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-background to-transparent" />
        {/* bottom anchor — heavy on mobile so the statement always reads, lighter on desktop */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-background via-background/85 to-transparent md:h-[35%] md:via-background/40" />

        <div
          className={`absolute inset-0 flex items-end px-7 pb-16 md:items-center md:px-24 md:pb-0 ${
            align === "right" ? "md:justify-end" : "md:justify-start"
          }`}
        >
          <div className="max-w-xl">
            <h3
              className="font-serif text-[1.6rem] leading-[1.08] tracking-tight text-foreground sm:text-[2rem] md:text-[2.4rem]"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.55)" }}
            >
              {statement}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

