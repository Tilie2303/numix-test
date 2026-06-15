import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "NUMIX — Sign in" },
      { name: "description", content: "Sign in to your private NUMIX terminal." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />
      <section className="relative z-10 mx-auto flex max-w-md flex-col px-6 pt-12 pb-24">
        <h1 className="font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Sign <span className="italic text-ice text-aura">in.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Access your private research terminal.
        </p>

        <form className="mt-12 space-y-6">
          <Field label="Email" type="email" placeholder="you@library.com" />
          <Field label="Password" type="password" placeholder="••••••••" />
          <button
            type="submit"
            className="w-full rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition hover:opacity-90"
          >
            Enter
          </button>
        </form>

        <div className="mt-8 flex items-center justify-between text-xs text-muted-foreground">
          <Link to="/auth/register" className="transition hover:text-ice">
            Request invitation
          </Link>
          <Link to="/auth/forgot" className="transition hover:text-ice">
            Forgot password
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
