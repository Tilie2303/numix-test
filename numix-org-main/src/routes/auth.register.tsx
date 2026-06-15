import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "NUMIX — Request invitation" },
      { name: "description", content: "Request access to the NUMIX private research terminal." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />
      <section className="relative z-10 mx-auto flex max-w-md flex-col px-6 pt-12 pb-24">
        <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Request <span className="italic text-ice text-aura">access.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          NUMIX is offered by invitation. Tell us about your collection.
        </p>

        <form className="mt-12 space-y-6">
          <Field label="Full name" type="text" placeholder="Friedrich August" />
          <Field label="Email" type="email" placeholder="you@library.com" />
          <Field label="Collecting focus" type="text" placeholder="German thalers, 17th–18th c." />
          <Field label="Password" type="password" placeholder="••••••••" />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Submit request
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-muted-foreground">
          Already a member?{" "}
          <Link to="/auth/login" className="transition hover:text-ice">
            Sign in
          </Link>
        </div>
      </section>
    </div>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.28em] text-muted-foreground">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-3 w-full rounded-full border border-border/50 bg-card/50 px-5 py-3 text-sm font-light text-foreground placeholder:text-muted-foreground/60 backdrop-blur-xl focus:border-aura focus:outline-none"
      />
    </label>
  );
}
