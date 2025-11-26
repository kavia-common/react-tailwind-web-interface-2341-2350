import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Footer component styled with the Electric Orange theme tokens and Tailwind.
 * - Responsive grid: 1 column on mobile, 2 on sm, 3 on md, and 4 on lg+.
 * - Accessible semantics: <footer> with aria-label, nav landmarks with labels.
 * - Focus-visible rings for links and interactive elements.
 * - Colors: bg-eo-surface background, text white/70, accents in text-eo-primary.
 */
// PUBLIC_INTERFACE
export default function Footer() {
  const year = new Date().getFullYear();

  const sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Roadmap', href: '#roadmap' },
        { label: 'Changelog', href: '#changelog' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#about' },
        { label: 'Careers', href: '#careers' },
        { label: 'Blog', href: '#blog' },
        { label: 'Press', href: '#press' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Docs', href: '#docs' },
        { label: 'Support', href: '#support' },
        { label: 'Community', href: '#community' },
        { label: 'Status', href: '#status' },
      ],
    },
  ];

  const social = [
    { label: 'Twitter', href: '#twitter', icon: TwIcon },
    { label: 'GitHub', href: '#github', icon: GhIcon },
    { label: 'LinkedIn', href: '#linkedin', icon: LiIcon },
  ];

  return (
    <footer
      className="bg-eo-surface text-white/70 border-t border-white/10"
      aria-label="Site footer"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Top: Brand and short description */}
        <div className="mb-10">
          <a
            href="#home"
            className="inline-flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-md"
          >
            <div
              aria-hidden="true"
              className="h-9 w-9 rounded-lg bg-eo-primary/90 ring-1 ring-white/10 shadow shadow-orange-500/30"
            />
            <span className="text-lg font-bold text-white tracking-wide">
              <span className="text-eo-primary">Electric</span> Orange
            </span>
          </a>
          <p className="mt-3 max-w-2xl text-sm text-white/70">
            Bold, responsive, and accessible components for building striking web
            experiences. Powered by React and Tailwind CSS.
          </p>
        </div>

        {/* Middle: Responsive grid of links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Sections */}
          {sections.map((sec) => (
            <nav key={sec.title} aria-label={sec.title}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
                {sec.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {sec.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black px-1 -mx-1"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Social column */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white/90">
              Follow
            </h3>
            <ul className="mt-4 flex gap-3">
              {social.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      aria-label={s.label}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Bottom: Divider and legal */}
        <div className="mt-10 border-t border-white/10 pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-white/60">
            © {year} Electric Orange UI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs">
            <a
              href="#privacy"
              className="text-white/70 hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 px-1 -mx-1"
            >
              Privacy
            </a>
            <a
              href="#terms"
              className="text-white/70 hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 px-1 -mx-1"
            >
              Terms
            </a>
            <a
              href="#cookies"
              className="text-white/70 hover:text-white rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 px-1 -mx-1"
            >
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/**
 * Simple inline SVG icons to avoid extra dependencies
 */
function TwIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M22.162 5.656c-.743.33-1.541.553-2.379.653a4.154 4.154 0 0 0 1.822-2.29 8.27 8.27 0 0 1-2.63 1.004 4.136 4.136 0 0 0-7.04 3.77A11.74 11.74 0 0 1 3.151 4.7a4.128 4.128 0 0 0 1.28 5.517 4.106 4.106 0 0 1-1.872-.517v.05a4.136 4.136 0 0 0 3.316 4.055 4.153 4.153 0 0 1-1.866.071 4.138 4.138 0 0 0 3.864 2.872A8.297 8.297 0 0 1 2 18.407a11.72 11.72 0 0 0 6.349 1.862c7.62 0 11.786-6.314 11.786-11.787 0-.18-.004-.357-.012-.534a8.413 8.413 0 0 0 2.04-2.146l-.001-.146z" />
    </svg>
  );
}

function GhIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.423 2.865 8.174 6.839 9.498.5.092.682-.217.682-.483 0-.238-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.907-.62.069-.608.069-.608 1.002.07 1.53 1.03 1.53 1.03.892 1.53 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.338-2.221-.253-4.555-1.112-4.555-4.946 0-1.092.39-1.987 1.029-2.687-.103-.254-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.57 9.57 0 0 1 12 6.844c.851.004 1.707.115 2.507.337 1.909-1.296 2.748-1.026 2.748-1.026.546 1.378.202 2.396.1 2.65.64.7 1.027 1.595 1.027 2.687 0 3.843-2.338 4.69-4.566 4.939.36.31.68.92.68 1.855 0 1.338-.012 2.418-.012 2.747 0 .268.18.58.688.482C19.138 20.188 22 16.438 22 12.017 22 6.484 17.523 2 12 2z" />
    </svg>
  );
}

function LiIcon({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M4.983 3.5C4.983 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5zM.3 8.238h4.4V24H.3V8.238zM8.538 8.238h4.216v2.145h.06c.588-1.116 2.026-2.293 4.17-2.293 4.461 0 5.282 2.936 5.282 6.753V24H18.06v-6.95c0-1.657-.03-3.785-2.308-3.785-2.312 0-2.667 1.805-2.667 3.67V24H8.538V8.238z" />
    </svg>
  );
}
