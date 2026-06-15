import { Link } from "@tanstack/react-router";

export function SiteHeader() {
  return (
    <header className="relative z-20 flex items-center justify-between gap-4 px-5 py-5 md:px-14 md:py-8">
      <Link to="/" aria-label="NUMIX" className="group shrink-0">
        <img
          src="/logo.png"
          alt="NUMIX"
          className="h-11 w-auto md:h-[68px] transition-transform duration-300 group-hover:-translate-y-0.5"
        />
      </Link>

      <nav className="flex items-center gap-3 md:gap-5">
        <Link
          to="/auth/register"
          className="rounded-full border border-aura/40 bg-ice/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-ice shadow-[0_0_30px_-10px_oklch(0.72_0.12_240/0.6)] transition hover:bg-ice/20 hover:text-foreground md:px-5 md:text-xs"
        >
          Become a member
        </Link>
        <Link
          to="/auth/login"
          className="text-[11px] font-medium uppercase tracking-[0.22em] text-foreground/80 transition hover:text-ice md:text-xs"
        >
          Sign in
        </Link>
      </nav>
    </header>
  );
}
