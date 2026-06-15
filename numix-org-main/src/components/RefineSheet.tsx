import { useState, type ReactNode } from "react";
import { SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export function RefineSheet({ trigger }: { trigger?: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {trigger ?? (
          <button className="inline-flex items-center gap-2 text-xs text-muted-foreground transition hover:text-ice">
            <SlidersHorizontal className="size-3.5" strokeWidth={1.5} />
            Advanced
          </button>
        )}
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-full border-l border-border/40 bg-background/95 backdrop-blur-2xl sm:max-w-md"
      >
        <div className="pointer-events-none absolute -top-40 right-0 h-[420px] w-[420px] aura-soft" />

        <div className="relative flex h-full flex-col px-2 pt-10">
          <div className="text-[10px] uppercase tracking-[0.32em] text-muted-foreground">
            Advanced
          </div>
          <h2 className="mt-6 font-serif text-4xl leading-[1.05] tracking-tight md:text-5xl">
            Refine the
            <br />
            <span className="italic text-ice">search.</span>
          </h2>

          <div className="mt-14 space-y-10">
            <Group label="Period" options={["Ancient", "Medieval", "Modern"]} />
            <Group label="Metal" options={["Gold", "Silver", "Bronze"]} />
            <Group label="Grade" options={["MS", "AU", "XF", "VF"]} />
            <Group label="Provenance" options={["Named", "Auction", "Private"]} />
          </div>

          <div className="mt-auto pb-10 pt-12">
            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-full bg-primary py-3.5 text-sm font-medium text-primary-foreground transition hover:opacity-90"
            >
              Apply
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function Group({ label, options }: { label: string; options: string[] }) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
        {label}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            className="rounded-full border border-border/50 px-4 py-2 text-sm font-light text-foreground/80 transition hover:border-aura hover:text-ice"
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
