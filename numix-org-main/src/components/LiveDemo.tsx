import { Link } from "@tanstack/react-router";
import coinDemo from "@/assets/coin-demo.jpg";

export function LiveDemo() {
  return (
    <Link
      to="/coin/$id"
      params={{ id: "davenport-747" }}
      className="group relative block w-full max-w-5xl animate-rise delay-3"
    >
      {/* dramatic aura behind the value */}
      <div className="absolute inset-0 -m-20 aura-hero pointer-events-none" />

      <div className="relative grid items-center gap-12 overflow-hidden rounded-3xl border border-border/30 bg-card/20 backdrop-blur-xl p-10 md:grid-cols-[260px_1fr] md:gap-16 md:p-16">
        {/* coin */}
        <div className="relative mx-auto w-full max-w-[260px]">
          <div className="absolute inset-0 -m-8 aura-soft" />
          <img
            src={coinDemo}
            alt="Friedrich August I thaler, 1711"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative aspect-square w-full rounded-full object-cover shadow-[0_40px_120px_-30px_oklch(0.82_0.18_240/0.55)]"
          />
        </div>

        {/* verdict */}
        <div className="text-center md:text-left">
          <div className="font-serif text-2xl text-muted-foreground md:text-2xl">
            Friedrich August I · 1711
          </div>

          {/* The focal point */}
          <div className="relative mt-4">
            <div className="font-serif text-6xl leading-none tracking-tight text-ice text-aura md:text-8xl">
              €4,800
            </div>
            <div className="mt-2 font-serif text-lg text-muted-foreground md:text-xl">
              <span className="italic">to</span> €6,200
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-4 md:justify-start">
            <Mark label="Rarity" value="Rare" />
            <Mark label="Demand" value="Strong" />
            <Mark label="Data Confidence" value="High" accent />
          </div>
        </div>
      </div>
    </Link>
  );
}

function Mark({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</div>
      <div className={`mt-2 font-serif text-2xl ${accent ? "text-ice" : "text-foreground"}`}>
        {value}
      </div>
    </div>
  );
}
