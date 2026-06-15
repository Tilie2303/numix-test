import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth/forgot")({
  head: () => ({
    meta: [
      { title: "NUMIX — Reset access" },
      { name: "description", content: "Recover access to your NUMIX terminal." },
    ],
  }),
  component: ForgotPage,
});

function ForgotPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />
      <section className="relative z-10 mx-auto flex max-w-md flex-col px-6 pt-12 pb-24">
        <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Recover <span className="italic text-ice text-aura">access.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          We will send a private link to your registered address.
        </p>

        <form className="mt-12 space-y-6">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">Email</span>
            <input
              type="email"
              placeholder="you@library.com"
              className="mt-3 w-full rounded-full border border-border/50 bg-card/50 px-5 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 backdrop-blur-xl focus:border-aura focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Send link
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          <Link to="/auth/login" className="transition hover:text-ice">
            Back to sign in
          </Link>
        </div>
      </section>
    </div>
  );
}
