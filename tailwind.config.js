/** @type {import('tailwindcss').Config} */
export default {
content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
theme: {
extend: {
fontFamily: {
sans: ["Inter", "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "Noto Sans", "Ubuntu", "Cantarell", "Helvetica Neue", "Arial", "sans-serif"],
mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "Liberation Mono", "monospace"],
},
colors: {
primary: {
50: '#f0f9ff', 100: '#e0f2fe', 200: '#bae6fd', 300: '#7dd3fc', 400: '#38bdf8',
500: '#0ea5e9', 600: '#0284c7', 700: '#0369a1', 800: '#075985', 900: '#0c4a6e'
},
success: { 500: '#10b981', 600: '#059669' },
warning: { 500: '#f59e0b', 600: '#d97706' },
danger: { 500: '#f43f5e', 600: '#e11d48' }
},
boxShadow: {
card: '0 1px 2px rgb(0 0 0 / 0.04), 0 8px 24px rgb(0 0 0 / 0.06)'
},
borderRadius: {
xl: '1rem',
'2xl': '1.25rem'
}
}
},
plugins: []
};
