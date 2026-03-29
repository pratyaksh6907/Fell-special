"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type Dot = {
  id: number;
  x: number;
  y: number;
};

export function CursorBloomTrail() {
  const [dots, setDots] = useState<Dot[]>([]);
  const lastTickRef = useRef(0);
  const idRef = useRef(0);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - lastTickRef.current < 34) return;
      lastTickRef.current = now;

      const newDot: Dot = {
        id: idRef.current++,
        x: event.clientX,
        y: event.clientY,
      };

      setDots((prev) => [...prev.slice(-16), newDot]);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40" aria-hidden>
      <AnimatePresence>
        {dots.map((dot, index) => (
          <motion.span
            key={dot.id}
            className="absolute rounded-full"
            style={{
              left: dot.x,
              top: dot.y,
              width: `${14 - index * 0.45}px`,
              height: `${14 - index * 0.45}px`,
              background:
                "radial-gradient(circle at 30% 30%, rgba(255,252,245,0.95), rgba(255,164,197,0.75) 45%, rgba(231,101,150,0.35) 100%)",
              boxShadow: "0 0 22px rgba(231,101,150,0.38)",
            }}
            initial={{ x: -7, y: -7, opacity: 0.8, scale: 0.72 }}
            animate={{ x: -7, y: -7, opacity: 0, scale: 1.65 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.72, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
