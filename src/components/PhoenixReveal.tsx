"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const PHRASE = "millions must go";
const SPARK_COUNT = 20;
const TYPE_MS = 85;

type Phase = "logo" | "reveal" | "evaporate";

export function PhoenixReveal() {
  const [phase, setPhase] = useState<Phase>("logo");
  const [typed, setTyped] = useState("");
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const typeTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    if (typeTimer.current) clearInterval(typeTimer.current);
  }, []);

  const schedule = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timers.current.push(id);
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== "logo") return;
    clearTimers();
    setTyped("");
    setPhase("reveal");
  }, [phase, clearTimers]);

  useEffect(() => {
    if (phase !== "reveal") return;

    let i = 0;
    typeTimer.current = setInterval(() => {
      i += 1;
      setTyped(PHRASE.slice(0, i));
      if (i >= PHRASE.length && typeTimer.current) {
        clearInterval(typeTimer.current);
        schedule(() => setPhase("evaporate"), 800);
      }
    }, TYPE_MS);

    return () => {
      if (typeTimer.current) clearInterval(typeTimer.current);
    };
  }, [phase, schedule]);

  useEffect(() => {
    if (phase === "evaporate") {
      schedule(() => {
        setTyped("");
        setPhase("logo");
      }, 1500);
    }
  }, [phase, schedule]);

  useEffect(() => clearTimers, [clearTimers]);

  const showLogo = phase === "logo";
  const showPhrase = phase === "reveal" || phase === "evaporate";
  const isTyping = phase === "reveal" && typed.length < PHRASE.length;

  return (
    <div className="rb-logo-wrap mt-10 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        disabled={phase !== "logo"}
        className={`rb-logo-btn ${phase !== "logo" ? "rb-logo-btn-busy" : ""}`}
        aria-label="Restore Britain"
      >
        <div className="rb-logo-stage">
          {showLogo && (
            <div className="rb-halo-wrap">
              <div className="rb-logo-backdrop">
                <div className="rb-glow-ring" aria-hidden />
                <div className="rb-sparks" aria-hidden>
                  {Array.from({ length: SPARK_COUNT }).map((_, i) => (
                    <span
                      key={i}
                      className="rb-spark"
                      style={{ "--i": i } as React.CSSProperties}
                    />
                  ))}
                </div>
                <Image
                  src="/restore-britain-logo.png"
                  alt=""
                  width={200}
                  height={89}
                  className="rb-logo-img h-auto w-44 sm:w-52"
                />
              </div>
            </div>
          )}

          {showPhrase && (
            <p
              className={`rb-phrase ${phase === "evaporate" ? "rb-phrase-evaporate" : ""}`}
              aria-live="polite"
            >
              {typed}
              {isTyping && (
                <span className="rb-type-cursor" aria-hidden>
                  |
                </span>
              )}
              {phase === "evaporate" && (
                <span className="rb-phrase-embers" aria-hidden>
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span
                      key={i}
                      style={{ "--e": i } as React.CSSProperties}
                    />
                  ))}
                </span>
              )}
            </p>
          )}
        </div>
      </button>
    </div>
  );
}
