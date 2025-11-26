import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import Footer from './components/Footer';

/**
 * PUBLIC_INTERFACE
 * App entry component integrating Navbar (fixed), Carousel, and Footer.
 * Ensures:
 * - Offset spacer for fixed navbar handled in Navbar itself (h-16).
 * - Main content uses min-h-screen minus footer height via flex layout.
 * - Container spacing uses Tailwind utility classes.
 */
function App() {
  return (
    <div className="min-h-screen flex flex-col text-eo-text eo-gradient" style={{ backgroundColor: 'rgba(0,0,0,0.2)' }}>
      <Navbar />
      <main id="main-content" className="flex-1">
        {/* Hero/Carousel section */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <Carousel className="h-full" />
        </section>

        {/* Example content area to demonstrate spacing under fixed navbar */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome to Electric Orange
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            A bold, high-contrast theme powered by React and Tailwind. Explore
            the components above and enjoy a clean, accessible layout with a fixed
            navbar, responsive carousel, and footer.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
