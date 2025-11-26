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
   * - Adds a "Services" dropdown with accessible interactions (hover/focus on desktop, click on mobile),
   *   close on outside click and ESC, and EO styling with rounded panel and subtle shadow.
   */
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  const servicesBtnRef = useRef(null);
  const servicesMenuRef = useRef(null);

  // Close on escape and when clicking outside
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'Escape') {
        if (servicesOpen) {
          setServicesOpen(false);
          servicesBtnRef.current?.focus();
          return;
        }
        setOpen(false);
        // Return focus to the hamburger button for accessibility
        if (buttonRef.current) buttonRef.current.focus();
      }
    }
    function onClickOutside(e) {
      const target = e.target;
      const clickedOutsideMobile =
        open &&
        !menuRef.current?.contains(target) &&
        !buttonRef.current?.contains(target);

      const clickedOutsideServices =
        servicesOpen &&
        !servicesMenuRef.current?.contains(target) &&
        !servicesBtnRef.current?.contains(target);

      if (clickedOutsideMobile) setOpen(false);
      if (clickedOutsideServices) setServicesOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('click', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('click', onClickOutside);
    };
  }, [open, servicesOpen]);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Contact', href: '#contact' },
  ];

  const servicesItems = [
    { label: 'Design', href: '#design' },
    { label: 'Development', href: '#development' },
    { label: 'Consulting', href: '#consulting' },
  ];

  // Keyboard helpers for services button/menu (desktop)
  function handleServicesKeyDown(e) {
    if (e.key === 'Escape') {
      e.stopPropagation();
      setServicesOpen(false);
      servicesBtnRef.current?.focus();
    }
    if ((e.key === 'Enter' || e.key === ' ') && e.currentTarget === servicesBtnRef.current) {
      e.preventDefault();
      setServicesOpen((v) => !v);
    }
    if (e.key === 'ArrowDown' && servicesOpen) {
      e.preventDefault();
      const first = servicesMenuRef.current?.querySelector('a');
      first?.focus();
    }
  }

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
              <div className="h-8 w-8 rounded-md bg-eo-primary/90 ring-1 ring-white/10 shadow shadow-orange-500/30" aria-hidden="true" />
              <span className="text-lg font-bold tracking-wide">
                <span className="text-eo-primary">Electric</span> Orange
              </span>
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

                {/* Services dropdown - desktop hover/focus */}
                <li className="relative" onKeyDown={handleServicesKeyDown}>
                  <button
                    ref={servicesBtnRef}
                    id="services-button"
                    type="button"
                    className="inline-flex items-center gap-1 rounded-md px-2 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                    aria-controls="services-menu"
                    onClick={() => setServicesOpen((v) => !v)}
                    onMouseEnter={() => setServicesOpen(true)}
                    onFocus={() => setServicesOpen(true)}
                  >
                    Services
                    <svg
                      className={`h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.25 8.33a.75.75 0 01-.02-1.12z" clipRule="evenodd" />
                    </svg>
                  </button>

                  {/* Dropdown menu (desktop) */}
                  <div
                    id="services-menu"
                    ref={servicesMenuRef}
                    role="menu"
                    aria-labelledby="services-button"
                    className="absolute left-0 top-full mt-2 w-52 rounded-lg border border-white/10 bg-eo-surface/90 backdrop-blur shadow-xl shadow-black/40 ring-1 ring-white/10 overflow-hidden hidden md:block"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                    style={{ display: servicesOpen ? 'block' : 'none' }}
                  >
                    <div className="p-1">
                      {servicesItems.map((s) => (
                        <a
                          key={s.href}
                          href={s.href}
                          role="menuitem"
                          className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                          onClick={() => setServicesOpen(false)}
                        >
                          {s.label}
                          <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-eo-primary/80" aria-hidden="true" />
                        </a>
                      ))}
                    </div>
                  </div>
                </li>
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
            open ? 'max-h-[28rem] opacity-100' : 'max-h-0 opacity-0'
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

              {/* Mobile Services collapsible */}
              <li className="pt-1">
                <button
                  type="button"
                  className="flex w-full items-center justify-between rounded-md px-3 py-2 text-base font-medium text-white/90 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                  aria-expanded={servicesOpen}
                  aria-controls="mobile-services-panel"
                  onClick={() => setServicesOpen((v) => !v)}
                >
                  <span>Services</span>
                  <svg
                    className={`h-5 w-5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 10.585l3.71-3.354a.75.75 0 111.02 1.1l-4.22 3.815a.75.75 0 01-1.02 0L5.25 8.33a.75.75 0 01-.02-1.12z" clipRule="evenodd" />
                  </svg>
                </button>
                <div
                  id="mobile-services-panel"
                  className={`overflow-hidden transition-all ${servicesOpen ? 'max-h-60' : 'max-h-0'}`}
                >
                  <div className="mt-1 space-y-1 rounded-lg border border-white/10 bg-white/5 backdrop-blur-sm p-2">
                    {servicesItems.map((s) => (
                      <a
                        key={s.href}
                        href={s.href}
                        className="block rounded-md px-3 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                        onClick={() => {
                          setOpen(false);
                          setServicesOpen(false);
                        }}
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </li>
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
