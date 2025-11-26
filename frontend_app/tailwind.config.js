/** @type {import('tailwindcss').Config} */
module.exports = {
  // We will prefer class-based dark mode toggling for flexibility
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Legacy direct colors (kept to not break prior usage)
        primary: '#F97316',
        secondary: '#10B981',
        success: '#10B981',
        error: '#EF4444',
        background: '#000000',
        surface: '#1F2937',
        // Electric Orange CSS variable-driven palette
        eo: {
          primary: 'var(--eo-primary)',
          secondary: 'var(--eo-secondary)',
          success: 'var(--eo-success)',
          error: 'var(--eo-error)',
          bg: 'var(--eo-bg)',
          surface: 'var(--eo-surface)',
          text: 'var(--eo-text)'
        }
      }
      // Note: Gradient provided via CSS utility .eo-gradient using --eo-primary-gradient
    }
  },
  plugins: []
};
