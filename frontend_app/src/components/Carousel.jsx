import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Carousel component with auto-advance, hover pause, prev/next, indicators, keyboard navigation, and accessibility.
 * - Accepts optional slides via props; defaults to internal slides array with title, subtitle, and optional background image or gradient.
 * - Auto-advances every ~5 seconds, paused on hover and when document/window not focused or page hidden.
 * - Includes accessible Previous/Next buttons with aria-labels.
 * - Focusable dot indicators to jump to slides, with aria-current for the active slide.
 * - Keyboard navigation: left/right arrows when the carousel container is focused.
 * - Announces slide changes via aria-live="polite".
 * - Responsive layout with rounded-xl, shadow, and an overlay gradient if no image.
 * - Exposes className prop for parent spacing/customization.
 * - Cleans up timers and event listeners on unmount.
 */
export default function Carousel({
  // Optional slides: [{ title, subtitle, image? }]
  slides: slidesProp,
  autoAdvanceMs = 5000,
  className = '',
}) {
  // Internal default slides if none provided
  const defaultSlides = useMemo(
    () => [
      {
        title: 'Power your UI with Electric Orange',
        subtitle: 'Bold, responsive, and accessible components out-of-the-box.',
        image: null, // will use gradient overlay
      },
      {
        title: 'Fast Development',
        subtitle: 'React + Tailwind for rapid iteration and beautiful design.',
        image:
          'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1600&auto=format&fit=crop',
      },
      {
        title: 'Accessible by Default',
        subtitle:
          'Keyboard navigation, live regions, and semantic roles included.',
        image:
          'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1600&auto=format&fit=crop',
      },
    ],
    []
  );

  const slides = slidesProp && slidesProp.length ? slidesProp : defaultSlides;

  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false); // focus within carousel
  const intervalRef = useRef(null);
  const rootRef = useRef(null);
  const liveRegionRef = useRef(null);

  const total = slides.length;

  const goTo = useCallback(
    (index) => {
      const next = (index + total) % total;
      setCurrent(next);
    },
    [total]
  );

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  // Auto-advance logic with pause on hover, blur, and page visibility
  useEffect(() => {
    const isPageHidden =
      document.hidden || (typeof document.visibilityState !== 'undefined' && document.visibilityState !== 'visible');

    const shouldRun =
      !isHovered && !isPageHidden && document.hasFocus && document.hasFocus();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (shouldRun) {
      intervalRef.current = setInterval(() => {
        setCurrent((c) => (c + 1) % total);
      }, autoAdvanceMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, total, autoAdvanceMs, isFocused, current]);

  // Pause/resume when window focus changes or visibility changes
  useEffect(() => {
    function handleVisibility() {
      // Re-run effect above by toggling a state update: handled naturally as effect depends on nothing here.
      // We force an update using setIsFocused(prev => prev) to retrigger effect chain safely
      setIsFocused((v) => v);
    }
    function handleFocusChange() {
      setIsFocused((v) => v);
    }

    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocusChange);
    window.addEventListener('blur', handleFocusChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocusChange);
      window.removeEventListener('blur', handleFocusChange);
    };
  }, []);

  // Keyboard navigation when carousel wrapper is focused
  const onKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      }
    },
    [next, prev]
  );

  // Update aria-live region on slide change
  useEffect(() => {
    if (!liveRegionRef.current) return;
    const slide = slides[current];
    const text = `${slide.title || 'Slide'}${slide.subtitle ? ` — ${slide.subtitle}` : ''} (${current + 1} of ${total})`;
    liveRegionRef.current.textContent = text;
  }, [current, slides, total]);

  // Derived classes
  const containerClasses =
    'relative w-full overflow-hidden rounded-xl shadow-lg bg-eo-surface text-eo-text';
  const controlButtonClasses =
    'inline-flex items-center justify-center rounded-md bg-black/40 hover:bg-black/60 text-white px-3 py-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 transition';
  const indicatorButtonClasses =
    'w-2.5 h-2.5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500';

  return (
    <section
      ref={rootRef}
      className={`${containerClasses} ${className}`}
      aria-roledescription="carousel"
      aria-label="Featured content"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onFocus={() => setIsFocused(true)}
      onBlur={(e) => {
        // Only set unfocused when focus leaves the entire carousel region
        if (!rootRef.current?.contains(e.relatedTarget)) {
          setIsFocused(false);
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Live region to announce slide changes */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Slides wrapper */}
      <div className="relative h-[320px] sm:h-[380px] md:h-[420px] lg:h-[480px]">
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
              className={`absolute inset-0 transition-opacity duration-500 ${
                isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
              }`}
            >
              {/* Background image or gradient */}
              {slide.image ? (
                <div className="absolute inset-0">
                  <img
                    src={slide.image}
                    alt=""
                    className="h-full w-full object-cover"
                    draggable="false"
                  />
                  {/* Dark gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/80" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-black" />
              )}

              {/* Foreground content */}
              <div className="relative z-10 h-full w-full p-6 sm:p-8 md:p-10 flex items-end">
                <div className="max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="mt-2 text-sm sm:text-base md:text-lg text-white/80">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Controls */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2 sm:px-3">
        <button
          type="button"
          className={`${controlButtonClasses} pointer-events-auto`}
          onClick={prev}
          aria-label="Previous slide"
        >
          <span aria-hidden="true" className="sr-only sm:not-sr-only sm:mr-2">
            Previous
          </span>
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <button
          type="button"
          className={`${controlButtonClasses} pointer-events-auto`}
          onClick={next}
          aria-label="Next slide"
        >
          <span aria-hidden="true" className="sr-only sm:not-sr-only sm:mr-2">
            Next
          </span>
          <svg
            className="h-5 w-5 sm:h-6 sm:w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-3 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => {
            const active = idx === current;
            return (
              <button
                key={idx}
                type="button"
                className={`${indicatorButtonClasses} ${
                  active ? 'bg-white' : 'bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={active ? 'true' : undefined}
                onClick={() => goTo(idx)}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
