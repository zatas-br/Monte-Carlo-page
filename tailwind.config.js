import { typewindTransforms } from 'typewind/transform';

/** @type {import('tailwindcss').Config} */
export default {
  content: {
    files: ['./src/**/*.{js,jsx,ts,tsx}'],
    transform: typewindTransforms,
  },
  theme: {
    extend: {},
  },
  plugins: [],
}
