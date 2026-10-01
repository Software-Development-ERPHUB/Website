/** Brand colours live as CSS variables in src/index.css (:root) so they can
 *  be changed in one place without touching components. */
const v = (name) => `rgb(var(--c-${name}) / <alpha-value>)`

export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    screens: { xs: '400px', sm: '640px', md: '768px', lg: '1024px', xl: '1280px', '2xl': '1440px' },
    extend: {
      colors: {
        ink: v('ink'),
        brand: { DEFAULT: v('primary'), strong: v('primary-strong'), soft: v('primary-soft') },
        accent: v('accent'),
        steel: { DEFAULT: v('secondary'), soft: v('secondary-soft') },
        paper: v('paper'),
        line: v('line'),
        muted: v('muted'),
      },
      fontFamily: {
        display: ['"Schibsted Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { page: '1200px', prose: '68ch' },
      boxShadow: {
        lift: '0 1px 2px rgb(15 42 34 / .06), 0 8px 24px -12px rgb(15 42 34 / .18)',
        pop: '0 2px 4px rgb(15 42 34 / .06), 0 20px 40px -18px rgb(15 42 34 / .28)',
      },
    },
  },
  plugins: [],
}
