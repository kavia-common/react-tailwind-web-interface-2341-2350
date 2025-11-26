# Lightweight React Template for KAVIA

This project provides a minimal React + Tailwind template with a bold Electric Orange theme.

## Features

- **Electric Orange Theme**: Black base, vibrant orange accents via CSS tokens and Tailwind.
- **Components**: Fixed Navbar, responsive Carousel, and Footer integrated in `App.js`.
- **Responsive**: Mobile-first, accessible, and keyboard-friendly.
- **Lightweight**: Minimal dependencies.

## Getting Started

In the project directory, you can run:

### `npm start`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Customization

### Colors

Theme tokens are defined in `src/theme/tokens.css` and exposed to Tailwind in `tailwind.config.js` under the `eo` color namespace.

### Layout

- Navbar is fixed with a built-in spacer to offset content.
- Main content uses `min-h-screen` via `flex flex-col` on the root app container.
- Carousel and content sections use container classes:
  - `mx-auto max-w-7xl px-4 sm:px-6 lg:px-8`

## Learn More

- React: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
