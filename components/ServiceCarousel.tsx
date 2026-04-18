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
    title: "MEP Design Services",
    subtitle: "Mechanical, electrical, and plumbing design with coordinated documentation.",
    image: "/images/MEP-services.png",
    alt: "MEP mechanical electrical plumbing design",
  },
  {
    title: "Civil Architecture",
    subtitle: "Spatial planning and architectural coordination from shell to fit-out.",
    image: "/images/architecture.png",
    alt: "Architecture and spatial planning",
  },
] as const;

const AUTOPLAY_MS = 5500;
/** Horizontal shutter strips (reference: staggered row reveal, top finishes first) */
const STRIP_COUNT = 8;
const STRIP_STAGGER_MS = 70;
const STRIP_DURATION_MS = 550;

export default function ServiceCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  /** When set, strip-reveal animation is running from activeIndex → transitioningTo */
  const [transitioningTo, setTransitioningTo] = useState<number | null>(null);
  const [stripsOpen, setStripsOpen] = useState(false);
  const [paused, setPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const stripOpenRaf = useRef<number | null>(null);
  /** Target index for the in-flight strip animation (reliable on transition end) */
  const pendingIndexRef = useRef<number | null>(null);
  const transitionFinishedRef = useRef(false);
  const sliderPresenceRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  /** After ash-out, start strip to this index */
  const pendingAfterAshRef = useRef<number | null>(null);
  const { setSliderInView } = useSliderNav();
  const [isCaptionExiting, setIsCaptionExiting] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const isAnimating = transitioningTo !== null;

  const finishTransition = useCallback(() => {
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

  const handleCaptionAshExitComplete = useCallback(() => {
    const next = pendingAfterAshRef.current;
    pendingAfterAshRef.current = null;
    setIsCaptionExiting(false);
    if (next === null) return;
    setStripsOpen(false);
    pendingIndexRef.current = next;
    setTransitioningTo(next);
  }, []);

  const goToIndex = useCallback(
    (next: number) => {
      if (next === activeIndex || isAnimating || isCaptionExiting) return;
      if (reducedMotion) {
        setActiveIndex(next);
        return;
      }
      pendingAfterAshRef.current = next;
      setIsCaptionExiting(true);
    },
    [activeIndex, isAnimating, isCaptionExiting, reducedMotion]
  );

  const goPrev = useCallback(() => {
    goToIndex((activeIndex + slides.length - 1) % slides.length);
  }, [activeIndex, goToIndex]);

  const goNext = useCallback(() => {
    goToIndex((activeIndex + 1) % slides.length);
  }, [activeIndex, goToIndex]);

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
    if (reducedMotion || paused || isAnimating || isCaptionExiting) return;
    const id = window.setInterval(goNext, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [reducedMotion, paused, isAnimating, isCaptionExiting, goNext]);

  useLayoutEffect(() => {
    const el = sliderPresenceRef.current;
    if (!el) return;

    observerRef.current?.disconnect();

    const observer = new IntersectionObserver(
      ([entry]) => {
        setSliderInView(entry.isIntersecting);
      },
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
      finishTransition();
    },
    [finishTransition]
  );

  const currentSlide = slides[activeIndex];
  const incomingSlide = transitioningTo !== null ? slides[transitioningTo] : null;
  const showCaptionLayer = isCaptionExiting || !isAnimating;

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
            {/* Base layer: current slide (visible until strips reveal the next image) */}
            <div className="service-image-slider-base">
              <Image
                src={currentSlide.image}
                alt={isAnimating ? "" : currentSlide.alt}
                fill
                sizes="100vw"
                className="service-image-slider-img"
                priority
                aria-hidden={isAnimating}
              />
            </div>

            {/* Incoming layer + white shutter strips */}
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

            {/* Caption: ash-out, then strip; ash-in after strip. Hidden during strip only. */}
            {showCaptionLayer && (
              <>
                <div className="service-image-slider-scrim" aria-hidden />
                <SliderAshCaption
                  key={activeIndex}
                  animationKey={activeIndex}
                  isExiting={isCaptionExiting}
                  reducedMotion={reducedMotion}
                  onExitComplete={handleCaptionAshExitComplete}
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
                    disabled={isAnimating || isCaptionExiting}
                    aria-selected={index === activeIndex && !isAnimating && !isCaptionExiting}
                    aria-label={`Show slide ${index + 1}: ${slide.title}`}
                    className={`service-image-slider-dot${index === activeIndex && !isAnimating && !isCaptionExiting ? " is-active" : ""}`}
                    onClick={() => goToIndex(index)}
                  />
                ))}
              </div>
              <div className="service-image-slider-arrows">
                <button
                  type="button"
                  className="service-image-slider-arrow button-lift"
                  onClick={goPrev}
                  disabled={isAnimating || isCaptionExiting}
                  aria-label="Previous slide"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="service-image-slider-arrow button-lift"
                  onClick={goNext}
                  disabled={isAnimating || isCaptionExiting}
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
