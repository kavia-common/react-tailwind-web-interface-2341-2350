import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

/**
 * PUBLIC_INTERFACE
 * Carousel component with auto-advance, hover pause, indicators only (no arrows), keyboard navigation, and accessibility.
 * - Accepts optional slides via props; defaults to internal slides array with title, subtitle, and optional background image or gradient.
 * - Auto-advances every ~4-5 seconds, paused on hover and when document/window not focused or page hidden.
 * - Shows only clickable indicators (dots) for manual navigation with aria-current and keyboard focus.
 * - Keyboard: left/right arrows still work when the carousel is focused.
 * - Announces slide changes via aria-live="polite".
 * - Visually enhanced with gradient overlays, rounded corners, subtle motion (opacity/translate/scale).
 * - Exposes className prop; cleans timers and listeners on unmount.
 */
export default function Carousel({
  // Optional slides: [{ title, subtitle, image? }]
  slides: slidesProp,
  autoAdvanceMs = 4500,
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
    setCurrent((c) => (c + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total);
  }, [total]);

  // Auto-advance logic with pause on hover, blur, and page visibility
  useEffect(() => {
    const isPageHidden =
      document.hidden ||
      (typeof document.visibilityState !== 'undefined' &&
        document.visibilityState !== 'visible');

    const shouldRun =
      !isHovered && !isPageHidden && document.hasFocus && document.hasFocus();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (shouldRun) {
      intervalRef.current = setInterval(() => {
        next();
      }, autoAdvanceMs);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isHovered, autoAdvanceMs, next]);

  // Pause/resume when window focus changes or visibility changes
  useEffect(() => {
    function handleVisibility() {
      // retrigger effect by toggling focus state noop
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
    const text = `${slide.title || 'Slide'}${
      slide.subtitle ? ` — ${slide.subtitle}` : ''
    } (${current + 1} of ${total})`;
    liveRegionRef.current.textContent = text;
  }, [current, slides, total]);

  // Derived classes
  const containerClasses =
    'relative w-full overflow-hidden rounded-2xl shadow-xl bg-eo-surface text-eo-text ring-1 ring-white/10';
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
        {/* gradient accent border glow */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent" aria-hidden="true" />
        {slides.map((slide, idx) => {
          const isActive = idx === current;
          return (
            <div
              key={idx}
              role="group"
              aria-roledescription="slide"
              aria-label={`${idx + 1} of ${total}`}
              className={`absolute inset-0 transition-all duration-700 ease-out ${
                isActive
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-2 scale-[0.98] pointer-events-none'
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
                  {/* EO gradient overlay for readability */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/20 to-transparent mix-blend-screen" aria-hidden="true" />
                </div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 to-black" />
              )}

              {/* Foreground content */}
              <div className="relative z-10 h-full w-full p-6 sm:p-8 md:p-10 flex items-end">
                <div className="max-w-3xl">
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight drop-shadow-[0_2px_8px_rgba(249,115,22,0.35)]">
                    {slide.title}
                  </h3>
                  {slide.subtitle && (
                    <p className="mt-2 text-sm sm:text-base md:text-lg text-white/85">
                      {slide.subtitle}
                    </p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Indicators only (no arrows) */}
      <div className="absolute bottom-3 left-0 right-0">
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, idx) => {
            const active = idx === current;
            return (
              <button
                key={idx}
                type="button"
                className={`${indicatorButtonClasses} ${
                  active ? 'bg-white shadow shadow-orange-500/40 scale-110' : 'bg-white/40 hover:bg-white/70'
                } transition-transform`}
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
