import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Camera, RefreshCw, Check, X, ArrowLeft, SwitchCamera } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/search/photo/capture")({
  head: () => ({
    meta: [
      { title: "NUMIX — Capture coin" },
      {
        name: "description",
        content: "Photograph a coin live with your camera for instant numismatic identification.",
      },
    ],
  }),
  component: CapturePage,
});

function CapturePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();

  const [facing, setFacing] = useState<"environment" | "user">("environment");
  const [shot, setShot] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const stop = () => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  };

  const start = async () => {
    setError(null);
    setReady(false);
    try {
      stop();
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: facing }, width: { ideal: 1920 }, height: { ideal: 1440 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
        setReady(true);
      }
    } catch {
      setError(
        "Camera access denied. Allow camera permission in your browser, or upload an image instead.",
      );
    }
  };

  useEffect(() => {
    start();
    return stop;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [facing]);

  const capture = () => {
    const v = videoRef.current;
    const c = canvasRef.current;
    if (!v || !c) return;
    const w = v.videoWidth;
    const h = v.videoHeight;
    if (!w || !h) return;
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    ctx.drawImage(v, 0, 0, w, h);
    setShot(c.toDataURL("image/jpeg", 0.92));
    stop();
  };

  const retake = () => {
    setShot(null);
    start();
  };

  const confirm = () => {
    // In a real flow we'd persist the shot. For now route back with success state.
    navigate({ to: "/search/photo" });
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-background grain">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[700px] w-[1100px] -translate-x-1/2 aura-hero animate-aura" />
      <SiteHeader />
      <section className="relative z-10 mx-auto flex max-w-2xl flex-col px-6 pt-10 pb-24">
        <Link
          to="/search/photo"
          className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition hover:text-ice"
        >
          <ArrowLeft className="size-3.5" strokeWidth={1.5} />
          Back
        </Link>

        <h1 className="mt-6 font-serif text-4xl tracking-tight text-foreground md:text-5xl">
          Capture the <span className="italic text-ice text-aura">coin.</span>
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Hold the piece flat under even light. Fill the circle with the obverse, then capture.
        </p>

        <div className="mt-10 overflow-hidden rounded-3xl border border-border/60 bg-card/30 backdrop-blur-xl">
          <div className="relative aspect-[4/3] w-full bg-black">
            {/* live video */}
            {!shot && (
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}
            {/* still */}
            {shot && (
              <img
                src={shot}
                alt="Captured coin"
                className="absolute inset-0 h-full w-full object-cover"
              />
            )}

            {/* framing overlay */}
            {!shot && (
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute inset-0 [background:radial-gradient(circle_at_center,transparent_0,transparent_38%,oklch(0_0_0/0.55)_70%)]" />
                <div className="absolute left-1/2 top-1/2 size-[62%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ice/40 shadow-[0_0_60px_-10px_oklch(0.78_0.11_238/0.45)]" />
                <div className="absolute left-1/2 top-1/2 size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ice/70" />
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-background/60 px-3 py-1 text-[10px] uppercase tracking-[0.28em] text-muted-foreground backdrop-blur">
                  {ready ? "Center · Steady · Capture" : "Awaiting camera"}
                </div>
              </div>
            )}

            {error && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-8 text-center">
                <Camera className="size-8 text-muted-foreground" strokeWidth={1} />
                <p className="font-serif text-base italic text-foreground/80">{error}</p>
                <Link
                  to="/search/photo"
                  className="mt-2 rounded-full border border-border/50 px-4 py-1.5 text-xs text-muted-foreground transition hover:border-aura hover:text-ice"
                >
                  Upload instead
                </Link>
              </div>
            )}
          </div>

          {/* controls */}
          <div className="flex items-center justify-between gap-3 border-t border-border/40 px-5 py-4">
            {!shot ? (
              <>
                <button
                  type="button"
                  onClick={() => setFacing((f) => (f === "environment" ? "user" : "environment"))}
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-aura hover:text-ice"
                  aria-label="Switch camera"
                >
                  <SwitchCamera className="size-3.5" strokeWidth={1.5} />
                  Flip
                </button>

                <button
                  type="button"
                  onClick={capture}
                  disabled={!ready}
                  className="group relative grid size-16 place-items-center rounded-full border border-ice/40 bg-ice/10 transition hover:bg-ice/20 disabled:opacity-40"
                  aria-label="Capture"
                >
                  <span className="size-12 rounded-full bg-ice/90 transition group-hover:scale-95" />
                </button>

                <Link
                  to="/search/photo"
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-aura hover:text-ice"
                >
                  Cancel
                </Link>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={retake}
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-aura hover:text-ice"
                >
                  <RefreshCw className="size-3.5" strokeWidth={1.5} />
                  Retake
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShot(null);
                    navigate({ to: "/search/photo" });
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-border/50 px-3 py-2 text-[11px] uppercase tracking-[0.22em] text-muted-foreground transition hover:border-aura hover:text-ice"
                  aria-label="Discard"
                >
                  <X className="size-3.5" strokeWidth={1.5} />
                  Discard
                </button>
                <button
                  type="button"
                  onClick={confirm}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-[11px] uppercase tracking-[0.22em] text-primary-foreground transition hover:opacity-90"
                >
                  <Check className="size-3.5" strokeWidth={1.5} />
                  Identify
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-3 text-[10px] uppercase tracking-[0.24em] text-muted-foreground">
          <FrameTip n="01" label="Hold steady" />
          <FrameTip n="02" label="Even light" />
          <FrameTip n="03" label="Fill circle" />
        </div>

        <canvas ref={canvasRef} className="hidden" />
      </section>
    </div>
  );
}

function FrameTip({ n, label }: { n: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border/40 bg-card/30 px-4 py-3 backdrop-blur-xl">
      <div className="font-serif text-base text-ice">{n}</div>
      <div className="mt-1">{label}</div>
    </div>
  );
}
