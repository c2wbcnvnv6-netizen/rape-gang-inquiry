"use client";

import { useCallback, useState } from "react";
import { reportQuotes, type ReportQuote } from "@/data/quotes";
import { FireDropHeadline } from "@/components/FireDropHeadline";
import { PhoenixReveal } from "@/components/PhoenixReveal";

const PDF =
  "https://static1.squarespace.com/static/6810978a41bbc42489eafa81/t/6a314bb1151e511944bd4421/1781615537601/The+Rape+Gang+Inquiry+Report.pdf";

function randomIndex(exclude: number | null): number {
  if (reportQuotes.length <= 1) return 0;
  let idx: number;
  do {
    idx = Math.floor(Math.random() * reportQuotes.length);
  } while (idx === exclude);
  return idx;
}

const categoryLabels = {
  survivor: "Survivor testimony",
  scale: "Scale of crimes",
  institutional: "Institutional failure",
};

export function QuoteViewer() {
  const [index, setIndex] = useState(() => randomIndex(null));
  const [animKey, setAnimKey] = useState(0);

  const nextQuote = useCallback(() => {
    setIndex((prev) => {
      const next = randomIndex(prev);
      setAnimKey((k) => k + 1);
      return next;
    });
  }, []);

  const quote: ReportQuote = reportQuotes[index];

  return (
    <div className="relative flex h-full min-h-screen flex-col items-center justify-center px-5 py-12">
      <div className="ambient" aria-hidden>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="orb orb-3" />
      </div>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />

      <div className="relative z-10 w-full max-w-2xl">
        <header className="mb-10 text-center">
          <FireDropHeadline />
          <h1 className="mt-2 font-serif text-lg font-medium tracking-wide text-white/80">
            Rape Gang Inquiry
          </h1>
        </header>

        {quote && (
          <div className="glass-halo">
            <div className="glass-inner">
              <div key={animKey} className="quote-enter">
                <p
                  className={`category-pill mb-5 category-${quote.category}`}
                >
                  {categoryLabels[quote.category]}
                </p>
                <blockquote className="font-serif text-xl leading-relaxed text-white/92 sm:text-2xl sm:leading-relaxed">
                  &ldquo;{quote.text}&rdquo;
                </blockquote>
                <footer className="mt-8 text-sm text-white/40">
                  — {quote.source}
                </footer>
              </div>
            </div>
          </div>
        )}

        <div className="mt-10 flex flex-col items-center gap-4">
          <button
            type="button"
            onClick={nextQuote}
            className="glass-btn rounded-full px-10 py-3.5 text-sm font-medium tracking-wide text-white/90"
          >
            Another testimony
          </button>
        </div>

        <footer className="mt-16 flex justify-center">
          <a
            href={PDF}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="pdf-btn rounded-full px-8 py-3 text-sm font-medium tracking-wide"
          >
            Full PDF report
          </a>
        </footer>

        <PhoenixReveal />
      </div>
    </div>
  );
}
