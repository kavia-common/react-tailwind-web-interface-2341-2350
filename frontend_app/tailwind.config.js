/** @type {import('tailwindcss').Config} */
module.exports = {
  // We will prefer class-based dark mode toggling for flexibility
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Electric Orange theme tokens (can be used later for components)
        primary: '#F97316',
        secondary: '#10B981',
        success: '#10B981',
        error: '#EF4444',
        background: '#000000',
        surface: '#1F2937'
      }
    }
  },
  plugins: []
};
