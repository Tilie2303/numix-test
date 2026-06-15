import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  life: number;
  maxLife: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────
const GOLD_COLORS = [
  "oklch(0.82 0.18 85)",
  "oklch(0.75 0.16 80)",
  "oklch(0.88 0.20 90)",
  "oklch(0.70 0.14 75)",
  "oklch(0.92 0.18 88)",
];

const PHASES = [
  {
    id: "pour",
    label: "Origin",
    headline: "From the earth,",
    sub: "liquid gold.",
  },
  {
    id: "form",
    label: "Formation",
    headline: "Shaped by fire,",
    sub: "given form.",
  },
  {
    id: "king",
    label: "History",
    headline: "Held by kings,",
    sub: "passed through centuries.",
  },
  {
    id: "trader",
    label: "Today",
    headline: "Understood by",
    sub: "those who know.",
  },
];

// ─── Gold Canvas (Phase 1 + 2) ────────────────────────────────────────────────
function GoldCanvas({
  phase,
  progress,
}: {
  phase: number;
  progress: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener("resize", resize);

    const W = () => canvas.offsetWidth;
    const H = () => canvas.offsetHeight;

    // Spawn particles
    const spawnParticle = (): Particle => {
      const spread = W() * 0.35;
      return {
        x: W() / 2 + (Math.random() - 0.5) * spread,
        y: -20,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 2 + Math.random() * 3,
        radius: 3 + Math.random() * 8,
        alpha: 0.6 + Math.random() * 0.4,
        life: 0,
        maxLife: 80 + Math.random() * 60,
      };
    };

    const draw = (time: number) => {
      timeRef.current = time;
      const w = W();
      const h = H();

      ctx.clearRect(0, 0, w, h);

      // ── Phase 1: Pouring gold ──────────────────────────────────────────────
      if (phase === 0) {
        // Spawn new particles
        const spawnRate = Math.floor(3 + progress * 8);
        for (let i = 0; i < spawnRate; i++) {
          if (particlesRef.current.length < 300) {
            particlesRef.current.push(spawnParticle());
          }
        }

        // Draw stream
        const streamGrad = ctx.createLinearGradient(w / 2, 0, w / 2, h * 0.6);
        streamGrad.addColorStop(0, "oklch(0.88 0.20 90 / 0)");
        streamGrad.addColorStop(0.2, "oklch(0.88 0.20 90 / 0.9)");
        streamGrad.addColorStop(0.7, "oklch(0.75 0.16 80 / 0.6)");
        streamGrad.addColorStop(1, "oklch(0.75 0.16 80 / 0)");

        const streamW = 20 + Math.sin(time * 0.003) * 8 + progress * 30;
        ctx.beginPath();
        ctx.moveTo(w / 2 - streamW / 2, 0);
        ctx.bezierCurveTo(
          w / 2 - streamW * 0.8,
          h * 0.3,
          w / 2 + streamW * 0.6,
          h * 0.5,
          w / 2,
          h * 0.7
        );
        ctx.bezierCurveTo(
          w / 2 - streamW * 0.4,
          h * 0.5,
          w / 2 + streamW * 0.8,
          h * 0.3,
          w / 2 + streamW / 2,
          0
        );
        ctx.fillStyle = streamGrad;
        ctx.fill();

        // Update & draw particles
        particlesRef.current = particlesRef.current.filter((p) => {
          p.life++;
          p.x += p.vx + Math.sin(time * 0.002 + p.y * 0.01) * 0.5;
          p.vy += 0.08; // gravity
          p.y += p.vy;
          p.alpha *= 0.992;

          const lifeRatio = p.life / p.maxLife;
          const alpha = p.alpha * (1 - lifeRatio * lifeRatio);

          // Glow
          const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
          grd.addColorStop(0, `oklch(0.92 0.18 88 / ${alpha})`);
          grd.addColorStop(0.5, `oklch(0.82 0.18 85 / ${alpha * 0.6})`);
          grd.addColorStop(1, `oklch(0.75 0.16 80 / 0)`);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();

          // Core
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = `oklch(0.92 0.20 90 / ${alpha})`;
          ctx.fill();

          return p.life < p.maxLife && p.y < h + 50;
        });

        // Pool at bottom
        const poolY = h * 0.75;
        const poolGrad = ctx.createRadialGradient(w / 2, poolY, 0, w / 2, poolY, w * 0.35 * progress);
        poolGrad.addColorStop(0, `oklch(0.88 0.20 90 / ${0.9 * progress})`);
        poolGrad.addColorStop(0.5, `oklch(0.80 0.17 85 / ${0.6 * progress})`);
        poolGrad.addColorStop(1, "oklch(0.75 0.16 80 / 0)");
        ctx.beginPath();
        ctx.ellipse(w / 2, poolY, w * 0.35 * progress, h * 0.08 * progress, 0, 0, Math.PI * 2);
        ctx.fillStyle = poolGrad;
        ctx.fill();

        // Surface ripples
        if (progress > 0.3) {
          for (let i = 0; i < 3; i++) {
            const rippleR = (w * 0.15 * progress * ((time * 0.0005 + i * 0.33) % 1));
            const rippleAlpha = (1 - ((time * 0.0005 + i * 0.33) % 1)) * 0.4 * progress;
            ctx.beginPath();
            ctx.ellipse(w / 2, poolY, rippleR, rippleR * 0.25, 0, 0, Math.PI * 2);
            ctx.strokeStyle = `oklch(0.90 0.18 88 / ${rippleAlpha})`;
            ctx.lineWidth = 1.5;
            ctx.stroke();
          }
        }
      }

      // ── Phase 2: Gold forms into coin ─────────────────────────────────────
      if (phase === 1) {
        particlesRef.current = [];

        const coinR = Math.min(w, h) * 0.32 * progress;
        const cx = w / 2;
        const cy = h / 2;

        // Outer glow
        const outerGlow = ctx.createRadialGradient(cx, cy, coinR * 0.5, cx, cy, coinR * 2);
        outerGlow.addColorStop(0, `oklch(0.88 0.20 90 / ${0.4 * progress})`);
        outerGlow.addColorStop(1, "oklch(0.82 0.18 85 / 0)");
        ctx.beginPath();
        ctx.arc(cx, cy, coinR * 2, 0, Math.PI * 2);
        ctx.fillStyle = outerGlow;
        ctx.fill();

        // Coin body
        const coinGrad = ctx.createRadialGradient(
          cx - coinR * 0.3,
          cy - coinR * 0.3,
          0,
          cx,
          cy,
          coinR
        );
        coinGrad.addColorStop(0, `oklch(0.95 0.22 92 / ${progress})`);
        coinGrad.addColorStop(0.3, `oklch(0.85 0.19 88 / ${progress})`);
        coinGrad.addColorStop(0.7, `oklch(0.75 0.16 82 / ${progress})`);
        coinGrad.addColorStop(1, `oklch(0.65 0.13 78 / ${progress})`);

        ctx.beginPath();
        ctx.arc(cx, cy, coinR, 0, Math.PI * 2);
        ctx.fillStyle = coinGrad;
        ctx.fill();

        // Rim
        ctx.beginPath();
        ctx.arc(cx, cy, coinR, 0, Math.PI * 2);
        ctx.strokeStyle = `oklch(0.92 0.20 90 / ${progress * 0.8})`;
        ctx.lineWidth = 3;
        ctx.stroke();

        // Inner rim
        ctx.beginPath();
        ctx.arc(cx, cy, coinR * 0.9, 0, Math.PI * 2);
        ctx.strokeStyle = `oklch(0.78 0.14 82 / ${progress * 0.5})`;
        ctx.lineWidth = 1;
        ctx.stroke();

        // Center detail — cross hatch of light
        if (progress > 0.6) {
          const detailAlpha = (progress - 0.6) / 0.4;
          ctx.save();
          ctx.globalAlpha = detailAlpha;
          ctx.beginPath();
          ctx.arc(cx, cy, coinR * 0.85, 0, Math.PI * 2);
          ctx.clip();

          // Light streak
          const streak = ctx.createLinearGradient(
            cx - coinR,
            cy - coinR,
            cx + coinR * 0.3,
            cy + coinR * 0.3
          );
          streak.addColorStop(0, "oklch(1 0 0 / 0)");
          streak.addColorStop(0.4, "oklch(1 0 0 / 0.25)");
          streak.addColorStop(0.5, "oklch(1 0 0 / 0.15)");
          streak.addColorStop(1, "oklch(1 0 0 / 0)");
          ctx.fillStyle = streak;
          ctx.fillRect(cx - coinR, cy - coinR, coinR * 2, coinR * 2);
          ctx.restore();
        }

        // Liquid drips resolving into coin
        if (progress < 0.7) {
          const dripsLeft = 1 - progress / 0.7;
          for (let i = 0; i < 5; i++) {
            const angle = (i / 5) * Math.PI * 2 + time * 0.001;
            const dist = coinR + 30 * dripsLeft;
            const dx = cx + Math.cos(angle) * dist;
            const dy = cy + Math.sin(angle) * dist;
            const dripGrad = ctx.createRadialGradient(dx, dy, 0, dx, dy, 12 * dripsLeft);
            dripGrad.addColorStop(0, `oklch(0.88 0.20 90 / ${0.7 * dripsLeft})`);
            dripGrad.addColorStop(1, "oklch(0.82 0.18 85 / 0)");
            ctx.beginPath();
            ctx.arc(dx, dy, 12 * dripsLeft, 0, Math.PI * 2);
            ctx.fillStyle = dripGrad;
            ctx.fill();
          }
        }
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [phase, progress]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: "block" }}
    />
  );
}

// ─── Video Phase (King / Trader) ──────────────────────────────────────────────
function VideoPhase({
  src,
  poster,
  visible,
  label,
}: {
  src?: string;
  poster?: string;
  visible: boolean;
  label: string;
}) {
  return (
    <div
      className="absolute inset-0 transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      {src ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        // Placeholder until Higgsfield videos are ready
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="w-64 h-64 rounded-full border-2 flex items-center justify-center"
            style={{
              borderColor: "oklch(0.82 0.18 85 / 0.4)",
              background: "oklch(0.28 0.01 250 / 0.8)",
            }}
          >
            <div className="text-center px-6">
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ color: "oklch(0.82 0.18 85 / 0.6)" }}
              >
                Video Slot
              </div>
              <div
                className="font-serif text-lg italic"
                style={{ color: "oklch(0.82 0.18 85)" }}
              >
                {label}
              </div>
              <div
                className="text-xs mt-2"
                style={{ color: "oklch(0.78 0.012 250)" }}
              >
                Higgsfield · coming
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, oklch(0.24 0.005 250) 0%, transparent 15%, transparent 75%, oklch(0.24 0.005 250) 100%)",
        }}
      />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export function GoldStorySection({
  kingVideoSrc,
  kingVideoPoster,
  traderVideoSrc,
  traderVideoPoster,
}: {
  kingVideoSrc?: string;
  kingVideoPoster?: string;
  traderVideoSrc?: string;
  traderVideoPoster?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activePhase, setActivePhase] = useState(0);
  const [phaseProgress, setPhaseProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const totalHeight = el.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const rawProgress = Math.max(0, Math.min(1, scrolled / totalHeight));

      // 4 phases, each takes 25% of scroll
      const phaseIndex = Math.min(3, Math.floor(rawProgress * 4));
      const phaseRaw = (rawProgress * 4) % 1;
      const pProgress = phaseIndex === 3 ? 1 : phaseRaw;

      setActivePhase(phaseIndex);
      setPhaseProgress(pProgress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const currentPhase = PHASES[activePhase];

  return (
    <div ref={sectionRef} className="relative" style={{ height: "400vh" }}>
      {/* Sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "oklch(0.12 0.005 250)" }}>

        {/* ── Canvas phases (0 = pour, 1 = form) ── */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: activePhase <= 1 ? 1 : 0 }}
        >
          <GoldCanvas phase={activePhase} progress={phaseProgress} />
        </div>

        {/* ── King video (phase 2) ── */}
        <VideoPhase
          src={kingVideoSrc}
          poster={kingVideoPoster}
          visible={activePhase === 2}
          label="The King"
        />

        {/* ── Trader video (phase 3) ── */}
        <VideoPhase
          src={traderVideoSrc}
          poster={traderVideoPoster}
          visible={activePhase === 3}
          label="The Trader"
        />

        {/* ── Phase label top-left ── */}
        <div className="absolute top-8 left-8 z-20">
          <div
            className="text-[10px] uppercase tracking-[0.35em] transition-all duration-500"
            style={{ color: "oklch(0.82 0.18 85 / 0.6)" }}
          >
            {String(activePhase + 1).padStart(2, "0")} / 04 — {currentPhase.label}
          </div>
        </div>

        {/* ── Progress dots top-right ── */}
        <div className="absolute top-8 right-8 z-20 flex gap-2">
          {PHASES.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-500"
              style={{
                width: i === activePhase ? "24px" : "6px",
                height: "6px",
                borderRadius: "3px",
                background:
                  i === activePhase
                    ? "oklch(0.82 0.18 85)"
                    : i < activePhase
                    ? "oklch(0.82 0.18 85 / 0.4)"
                    : "oklch(0.82 0.18 85 / 0.15)",
              }}
            />
          ))}
        </div>

        {/* ── Headline bottom ── */}
        <div className="absolute bottom-0 left-0 right-0 z-20 px-8 pb-16 md:px-16 md:pb-20">
          <div className="max-w-2xl">
            <h2
              key={activePhase}
              className="font-serif leading-[1.05] tracking-tight animate-rise"
              style={{
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                color: "oklch(0.96 0.003 250)",
              }}
            >
              {currentPhase.headline}
              <br />
              <span
                className="italic"
                style={{
                  color: "oklch(0.82 0.18 85)",
                  textShadow: "0 0 40px oklch(0.82 0.18 85 / 0.5)",
                }}
              >
                {currentPhase.sub}
              </span>
            </h2>

            {/* Scroll hint — only on first phase */}
            {activePhase === 0 && phaseProgress < 0.3 && (
              <div
                className="mt-8 flex items-center gap-3 animate-rise"
                style={{ color: "oklch(0.78 0.012 250 / 0.6)" }}
              >
                <div
                  className="h-8 w-px"
                  style={{
                    background:
                      "linear-gradient(to bottom, oklch(0.82 0.18 85 / 0.6), transparent)",
                  }}
                />
                <span className="text-xs uppercase tracking-[0.28em]">Scroll to discover</span>
              </div>
            )}
          </div>
        </div>

        {/* ── Vignette ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, oklch(0.12 0.005 250 / 0.6) 100%)",
          }}
        />
      </div>
    </div>
  );
}
