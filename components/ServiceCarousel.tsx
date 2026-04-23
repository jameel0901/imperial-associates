"use client";

import Image from "next/image";
import type { TransitionEvent } from "react";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import SliderAshCaption from "./SliderAshCaption";
import { useSliderNav } from "./SliderNavContext";

/** Slide images: public/images filenames aligned to each service title */
const slides = [
  {
    title: "Civil Construction",
    subtitle: "Earthworks, structures, and site execution for durable civil packages.",
    image: "/images/civil-constructions.png",
    alt: "Civil construction and site execution",
  },
  {
    title: "DGPS and Drone Survey",
    subtitle: "Precision control networks and aerial corridor capture for roads.",
    image: "/images/DGPS%26Drone-survey.png",
    alt: "DGPS and drone survey for roads and corridors",
  },
  {
    title: "BIM MEP Services",
    subtitle: "Modelling, multi-discipline coordination, and issue-ready documentation for building services.",
    image: "/images/MEP-services.png",
    alt: "BIM services and building systems coordination",
  },
  {
    title: "Architecture & Interior design",
    subtitle: "Spatial planning and architectural coordination from shell to fit-out.",
    image: "/images/architecture.png",
    alt: "Architecture and spatial planning",
  },
] as const;

const SLIDE_COUNT = slides.length;
const AUTOPLAY_MS = 5500;
const STRIP_COUNT = 8;
const STRIP_STAGGER_MS = 70;
const STRIP_DURATION_MS = 550;
const STRIP_COMPLETE_FALLBACK_MS =
  STRIP_DURATION_MS + (STRIP_COUNT - 1) * STRIP_STAGGER_MS + 400;
const CAPTION_EXIT_FALLBACK_MS = 1100;

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioningTo, setTransitioningTo] = useState<number | null>(null);
  const [stripsOpen, setStripsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isCaptionExiting, setIsCaptionExiting] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);

  const stripOpenRaf = useRef<number | null>(null);
  const pendingIndexRef = useRef<number | null>(null);
  const transitionFinishedRef = useRef(false);
  const pendingAfterAshRef = useRef<number | null>(null);
  const sliderPresenceRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const activeIndexRef = useRef(0);
  const isStripPhaseRef = useRef(false);
  const isCaptionExitingRef = useRef(false);
  const pausedRef = useRef(false);
  const reducedMotionRef = useRef(false);
  const tabHiddenRef = useRef(false);

  const { setSliderInView } = useSliderNav();

  const isStripPhase = transitioningTo !== null;
  isStripPhaseRef.current = isStripPhase;

  const transitionBusy = isCaptionExiting || isStripPhase;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useLayoutEffect(() => {
    activeIndexRef.current = activeIndex;
    isCaptionExitingRef.current = isCaptionExiting;
    pausedRef.current = paused;
    reducedMotionRef.current = reducedMotion;
    tabHiddenRef.current = tabHidden;
  });

  const finishStripTransition = useCallback(() => {
    const target = pendingIndexRef.current;
    pendingIndexRef.current = null;
    if (target === null) return;
    setActiveIndex(target);
    setTransitioningTo(null);
    setStripsOpen(false);
  }, []);

  useEffect(() => {
    if (transitioningTo !== null) transitionFinishedRef.current = false;
  }, [transitioningTo]);

  const beginStripReveal = useCallback((next: number) => {
    pendingIndexRef.current = next;
    setStripsOpen(false);
    setTransitioningTo(next);
  }, []);

  const onCaptionExitComplete = useCallback(() => {
    const next = pendingAfterAshRef.current;
    pendingAfterAshRef.current = null;
    setIsCaptionExiting(false);
    if (next === null) return;
    beginStripReveal(next);
  }, [beginStripReveal]);

  useEffect(() => {
    if (!isCaptionExiting || reducedMotion) return;
    const expected = pendingAfterAshRef.current;
    if (expected === null) return;
    const id = window.setTimeout(() => {
      if (!isCaptionExitingRef.current) return;
      if (pendingAfterAshRef.current !== expected) return;
      pendingAfterAshRef.current = null;
      setIsCaptionExiting(false);
      beginStripReveal(expected);
    }, CAPTION_EXIT_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [isCaptionExiting, reducedMotion, beginStripReveal]);

  const goToIndex = useCallback((next: number) => {
    if (next === activeIndexRef.current) return;
    if (isCaptionExitingRef.current || isStripPhaseRef.current) return;
    if (reducedMotionRef.current) {
      setActiveIndex(next);
      return;
    }
    pendingAfterAshRef.current = next;
    setIsCaptionExiting(true);
  }, []);

  const goPrev = useCallback(() => {
    goToIndex((activeIndexRef.current + SLIDE_COUNT - 1) % SLIDE_COUNT);
  }, [goToIndex]);

  const goNext = useCallback(() => {
    goToIndex((activeIndexRef.current + 1) % SLIDE_COUNT);
  }, [goToIndex]);

  useEffect(() => {
    if (transitioningTo === null) return;
    stripOpenRaf.current = requestAnimationFrame(() => {
      stripOpenRaf.current = requestAnimationFrame(() => setStripsOpen(true));
    });
    return () => {
      if (stripOpenRaf.current !== null) cancelAnimationFrame(stripOpenRaf.current);
    };
  }, [transitioningTo]);

  useEffect(() => {
    if (transitioningTo === null) return;
    const id = window.setTimeout(() => {
      if (transitionFinishedRef.current) return;
      transitionFinishedRef.current = true;
      finishStripTransition();
    }, STRIP_COMPLETE_FALLBACK_MS);
    return () => window.clearTimeout(id);
  }, [transitioningTo, finishStripTransition]);

  useEffect(() => {
    if (reducedMotion || paused || tabHidden || transitionBusy) return;
    const id = window.setTimeout(() => {
      if (reducedMotionRef.current || pausedRef.current || tabHiddenRef.current) return;
      if (isCaptionExitingRef.current || isStripPhaseRef.current) return;
      goToIndex((activeIndexRef.current + 1) % SLIDE_COUNT);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [reducedMotion, paused, tabHidden, transitionBusy, activeIndex, goToIndex]);

  useEffect(() => {
    const sync = () => setTabHidden(document.visibilityState === "hidden");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  useLayoutEffect(() => {
    const el = sliderPresenceRef.current;
    if (!el) return;
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      ([entry]) => setSliderInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "0px" }
    );
    observer.observe(el);
    observerRef.current = observer;
    return () => {
      observer.disconnect();
      observerRef.current = null;
    };
  }, [setSliderInView]);

  const onLastStripTransitionEnd = useCallback(
    (e: TransitionEvent<HTMLDivElement>) => {
      if (e.propertyName !== "transform") return;
      if (transitionFinishedRef.current) return;
      transitionFinishedRef.current = true;
      finishStripTransition();
    },
    [finishStripTransition]
  );

  const currentSlide = slides[activeIndex];
  const incomingSlide = transitioningTo !== null ? slides[transitioningTo] : null;
  const showCaptionLayer = isCaptionExiting || !isStripPhase;

  return (
    <section id="home-carousel" className="service-image-slider-section">
      <div
        ref={sliderPresenceRef}
        className="service-image-slider-fullbleed"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="service-image-slider">
          <div
            className="service-image-slider-viewport service-image-slider-viewport--fullscreen"
            role="region"
            aria-roledescription="carousel"
            aria-label={`Featured service slides. Current: ${currentSlide.title}.`}
          >
            <div className="service-image-slider-base">
              <Image
                src={currentSlide.image}
                alt={isStripPhase ? "" : currentSlide.alt}
                fill
                sizes="100vw"
                className="service-image-slider-img"
                priority
                aria-hidden={isStripPhase}
              />
            </div>

            {incomingSlide && transitioningTo !== null && (
              <div className="service-image-slider-reveal-layer" aria-hidden>
                <Image
                  src={incomingSlide.image}
                  alt={incomingSlide.alt}
                  fill
                  sizes="100vw"
                  className="service-image-slider-img"
                />
                <div className="service-image-slider-strips" aria-hidden>
                  {Array.from({ length: STRIP_COUNT }).map((_, i) => (
                    <div
                      key={i}
                      className={`service-image-slider-strip${stripsOpen ? " is-open" : ""}`}
                      style={
                        {
                          "--strip-i": i,
                          "--strip-stagger": `${i * STRIP_STAGGER_MS}ms`,
                          "--strip-dur": `${STRIP_DURATION_MS}ms`,
                        } as React.CSSProperties
                      }
                      onTransitionEnd={
                        i === STRIP_COUNT - 1 ? onLastStripTransitionEnd : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            )}

            {showCaptionLayer && (
              <>
                <div className="service-image-slider-scrim" aria-hidden />
                <SliderAshCaption
                  key={activeIndex}
                  animationKey={activeIndex}
                  isExiting={isCaptionExiting}
                  reducedMotion={reducedMotion}
                  onExitComplete={onCaptionExitComplete}
                  className="service-image-slider-caption"
                >
                  <p className="service-image-slider-kicker">Featured</p>
                  <h3 className="service-image-slider-title service-image-slider-title-shiny">
                    {currentSlide.title}
                  </h3>
                  <p className="service-image-slider-sub">{currentSlide.subtitle}</p>
                  <a href="#services" className="service-image-slider-cta">
                    Read more <span aria-hidden>→</span>
                  </a>
                </SliderAshCaption>
              </>
            )}

            <div className="service-image-slider-chrome">
              <div className="service-image-slider-chrome-spacer" aria-hidden />
              <div
                className="service-image-slider-dots"
                role="tablist"
                aria-label="Slide selection"
              >
                {slides.map((slide, index) => (
                  <button
                    key={slide.title}
                    type="button"
                    role="tab"
                    disabled={transitionBusy}
                    aria-selected={index === activeIndex && !transitionBusy}
                    aria-label={`Show slide ${index + 1}: ${slide.title}`}
                    className={`service-image-slider-dot${index === activeIndex && !transitionBusy ? " is-active" : ""}`}
                    onClick={() => goToIndex(index)}
                  />
                ))}
              </div>
              <div className="service-image-slider-arrows">
                <button
                  type="button"
                  className="service-image-slider-arrow button-lift"
                  onClick={goPrev}
                  disabled={transitionBusy}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="service-image-slider-arrow button-lift"
                  onClick={goNext}
                  disabled={transitionBusy}
                  aria-label="Next slide"
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
