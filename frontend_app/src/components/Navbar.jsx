import { useState, useEffect, useRef } from 'react';

// PUBLIC_INTERFACE
export default function Navbar() {
  /** 
   * PUBLIC_INTERFACE
   * A fixed, responsive, accessible navigation bar styled with the Electric Orange theme.
   * - Fixed at the top with backdrop blur and translucent surface background.
   * - Brand area on the left, links center/left-aligned on md+, and a CTA on the right.
   * - Collapsible mobile menu with animated height/opacity and keyboard accessibility.
   * - Includes a skip-to-content link for keyboard users.
   */
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  // Close on escape and when clicking outside
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        setOpen(false);
        // Return focus to the hamburger button for accessibility
        if (buttonRef.current) buttonRef.current.focus();
      }
    }
    function onClickOutside(e) {
      if (!menuRef.current) return;
      if (open && !menuRef.current.contains(e.target) && !buttonRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClickOutside);
    };
  }, [open]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Skip to content for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-eo-primary focus:text-eo-text focus:px-3 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-eo-surface/80 backdrop-blur supports-[backdrop-filter]:bg-eo-surface/60 text-eo-text"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-eo-primary/90 ring-1 ring-white/10 shadow shadow-orange-500/20" aria-hidden="true" />
              <span className="text-lg font-bold tracking-wide">Brand</span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-8">
              <ul className="flex items-center gap-6">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      className="text-sm font-medium text-white/80 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-orange-500 focus-visible:ring-offset-black transition-colors"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right actions (CTA) */}
            <div className="hidden md:flex items-center">
              <a
                href="#get-started"
                className="inline-flex items-center rounded-lg bg-eo-primary px-4 py-2 text-sm font-semibold text-eo-text shadow-sm hover:bg-orange-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
              >
                Get Started
              </a>
            </div>

            {/* Mobile hamburger */}
            <div className="md:hidden">
              <button
                ref={buttonRef}
                type="button"
                className="inline-flex items-center justify-center rounded-md p-2 text-white/80 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                aria-controls="mobile-menu"
                aria-expanded={open}
                aria-label="Toggle navigation menu"
                onClick={() => setOpen((v) => !v)}
              >
                <span className="sr-only">{open ? 'Close main menu' : 'Open main menu'}</span>
                {/* Icon */}
                <svg
                  className={`h-6 w-6 transition-transform ${open ? 'rotate-90' : ''}`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-4 pb-4 pt-2 space-y-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    onClick={() => setOpen(false)}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-2">
              <a
                href="#get-started"
                className="block w-full text-center rounded-lg bg-eo-primary px-4 py-2 text-sm font-semibold text-eo-text shadow-sm hover:bg-orange-500/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors"
                onClick={() => setOpen(false)}
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer to offset fixed navbar height for page content flow */}
      <div aria-hidden="true" className="h-16" />
    </>
  );
}
