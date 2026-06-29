# Forge & Co — Agency Pro Template

A clean, professional, fully static HTML/CSS/JS template for an agency or studio website. No build tools, no frameworks — just semantic HTML, hand-written CSS, and vanilla JavaScript.

## Quick Start

1. Unzip / copy the `agency-pro-template` folder anywhere.
2. Open `index.html` directly in a browser, or upload the whole folder to any static host (Netlify, Vercel, GitHub Pages, S3, or a plain Apache/Nginx server).
3. No build step, no `npm install`, no dependencies beyond three Google Fonts loaded via CDN in `assets/css/style.css`.

## What's Included

- **14 HTML pages**: Home, About, Services, Service Detail, Portfolio, Portfolio Detail (case study), Pricing, Team, Testimonials, FAQ, Contact, Blog, Blog Detail, and a 404 page.
- **3 stylesheets**: `style.css` (design tokens + components), `responsive.css` (breakpoints), `animations.css` (keyframes + scroll reveal).
- **4 scripts**: `main.js` (nav, accordion, counters, reveal), `slider.js` (carousel), `portfolio-filter.js` (category filter), `contact-form.js` (validation + submit flow).
- **Full documentation**: see `documentation/index.html` for a detailed customization guide.

## Customizing

All colors and typography are controlled by CSS variables at the top of `assets/css/style.css`:

```css
:root{
  --paper:  #ECEAE3;   /* light background */
  --ink:    #1B1815;   /* primary text / dark sections */
  --copper: #C1542C;   /* primary accent / CTAs */
  --teal:   #2C6E6B;   /* secondary accent */
  --font-display: 'Big Shoulders', sans-serif;
  --font-body:    'Inter', sans-serif;
  --font-mono:    'IBM Plex Mono', monospace;
}
```

Change those values once and the entire site re-themes — buttons, badges, headers, and section dividers all reference the same variables.

## Adding Real Images

Every photo slot currently renders a styled placeholder block instead of a broken image icon. To swap in a real photo, replace the placeholder `<div class="img-placeholder">…</div>` with a standard `<img>` tag inside the same wrapper (e.g. `.team-photo`, `.blog-thumb`, `.portfolio-item`) — sizing and cropping are already handled by the wrapper's CSS. Suggested destinations for source files are the matching subfolders under `assets/images/`.

## Browser Support

Built with modern, standard CSS (Grid, custom properties, `clamp()`) and vanilla JS. Works in current Chrome, Firefox, Safari, and Edge, and is responsive down to 360px-wide phones. All motion respects `prefers-reduced-motion`.

## File List

```
agency-pro-template/
├── index.html
├── about.html
├── services.html
├── service-single.html
├── portfolio.html
├── portfolio-single.html
├── pricing.html
├── team.html
├── testimonials.html
├── faq.html
├── contact.html
├── blog.html
├── blog-single.html
├── 404.html
├── assets/
│   ├── css/ (style.css, responsive.css, animations.css)
│   ├── js/  (main.js, slider.js, portfolio-filter.js, contact-form.js)
│   ├── images/ (logo, hero, services, portfolio, team, testimonials, blog, icons)
│   └── fonts/
├── documentation/index.html
└── README.md
```

## License

This template is provided for your own project use. Replace all placeholder copy, contact details, and imagery before deploying to production.
