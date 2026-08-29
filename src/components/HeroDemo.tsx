"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  HERO_JOB_IDS,
  HERO_JOBS,
  type HeroJobId,
  type HeroThreadLine,
} from "@/data/hero-jobs";

type Reveal = "card" | "user" | "bot";

const REVEAL_MS = 2200;

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function nextJob(id: HeroJobId, delta: number): HeroJobId {
  const index = HERO_JOB_IDS.indexOf(id);
  const next = (index + delta + HERO_JOB_IDS.length) % HERO_JOB_IDS.length;
  return HERO_JOB_IDS[next];
}

function visibleLines(thread: readonly HeroThreadLine[], reveal: Reveal) {
  if (reveal === "card") return [];
  if (reveal === "user") {
    return thread.filter((line) => line.sender === "user");
  }
  return thread;
}

export function HeroDemo() {
  const [jobId, setJobId] = useState<HeroJobId>(HERO_JOB_IDS[0]);
  const [reveal, setReveal] = useState<Reveal>("bot");
  const tabRefs = useRef<Partial<Record<HeroJobId, HTMLButtonElement | null>>>(
    {},
  );
  const panelId = useId();
  const job = HERO_JOBS[jobId];
  const lines = visibleLines(job.thread, reveal);

  const selectJob = useCallback((id: HeroJobId, focus = false) => {
    setJobId(id);
    setReveal(prefersReducedMotion() ? "bot" : "card");
    if (focus) tabRefs.current[id]?.focus();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setReveal("bot");
      return;
    }

    setReveal("card");
    const order: Reveal[] = ["card", "user", "bot"];
    let step = 0;
    const timer = window.setInterval(() => {
      step += 1;
      if (step >= order.length) {
        step = 0;
      }
      setReveal(order[step]);
    }, REVEAL_MS);

    return () => window.clearInterval(timer);
  }, [jobId]);

  function onTabKeyDown(
    event: React.KeyboardEvent<HTMLDivElement>,
  ) {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectJob(nextJob(jobId, 1), true);
      return;
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectJob(nextJob(jobId, -1), true);
      return;
    }
    if (event.key === "Home") {
      event.preventDefault();
      selectJob(HERO_JOB_IDS[0], true);
      return;
    }
    if (event.key === "End") {
      event.preventDefault();
      selectJob(HERO_JOB_IDS[HERO_JOB_IDS.length - 1], true);
    }
  }

  return (
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">A proactive agent for every Rippling rep</p>
        <h1>The agents that work while your reps sell.</h1>
        <p className="hero-intro">
          Grok Bot listens to calls, watches the inbox, and researches accounts
          in the background. Work starts it. Not another prompt.
        </p>
        <div
          className="hero-phone-jobs"
          role="tablist"
          aria-label="Rippling GTM jobs"
          onKeyDown={onTabKeyDown}
        >
          {HERO_JOB_IDS.map((id) => {
            const selected = id === jobId;
            return (
              <button
                key={id}
                ref={(node) => {
                  tabRefs.current[id] = node;
                }}
                type="button"
                role="tab"
                id={`${panelId}-${id}`}
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => selectJob(id)}
              >
                {selected ? (
                  <svg viewBox="0 0 12 12" aria-hidden>
                    <path d="m2 6 2.4 2.4L10 3" />
                  </svg>
                ) : null}
                {HERO_JOBS[id].label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="hero-bot-demo">
        <div className="hero-phone" aria-label="Grok Bot on iPhone">
          <div className="hero-phone-notch notch" aria-hidden />
          <header className="hero-phone-header header">
            <span className="hero-phone-back" aria-hidden>
              ‹
            </span>
            <p>
              <strong>{job.agent} Agent</strong>
              <small>Working in the cloud</small>
            </p>
            <span className="hero-phone-desk" aria-hidden>
              ▣
            </span>
          </header>
          <div
            className="hero-phone-thread thread"
            id={panelId}
            role="tabpanel"
            aria-labelledby={`${panelId}-${jobId}`}
            aria-live="polite"
          >
            <article className="hero-work-card">
              <p className="hero-work-label">New work detected</p>
              <p className="hero-work-kicker">{job.trigger}</p>
              <p className="hero-work-account">{job.account}</p>
              <p className="hero-work-context">{job.context}</p>
              <p className="hero-work-signal">{job.signal}</p>
              <p className="hero-work-artifact">{job.artifact}</p>
            </article>
            {lines.map((line, index) => (
              <p
                key={`${line.sender}-${index}`}
                className={`hero-bubble is-${line.sender}`}
              >
                {line.body}
              </p>
            ))}
          </div>
          <footer className="hero-phone-composer composer">
            <span aria-hidden>+</span>
            <p>Message {job.agent} Agent</p>
            <span aria-hidden>◉</span>
          </footer>
        </div>
      </div>
    </section>
  );
}
