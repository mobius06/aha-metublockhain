/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        gradients: {
          'primary': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))',
        },
      },
    },
    plugins: [],
  }
  