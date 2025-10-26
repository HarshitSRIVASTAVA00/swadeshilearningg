 Swadeshi Learning Platform

> **Empowering Atmanirbhar Bharat through Skill Exchange**

A modern, gamified peer-to-peer learning platform where users exchange skills without money, earn skill points, and build a self-reliant India through collaborative education.

## 🚀 Features

- **Skill Exchange System**: Learn by teaching what you know
- **Gamification**: Earn skill points, badges, and climb leaderboards
- **Swadeshi Knowledge Library**: Access ancient scriptures and Indian wisdom
- **Multi-language Support**: Available in all major Indian languages
- **Dark/Light Mode**: Fully themed with persistent preferences
- **Progressive Web App**: Installable on mobile devices, works offline
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: WCAG 2.1 compliant with semantic HTML

## 📁 Project Structure

```
swadeshi-learning/
├── public/                # Static assets
│   ├── manifest.json     # PWA manifest
│   └── robots.txt        # SEO configuration
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── ui/          # Shadcn UI primitives
│   │   ├── AnimatedSection.tsx
│   │   ├── FeatureCard.tsx
│   │   ├── Footer.tsx
│   │   ├── Navbar.tsx
│   │   ├── StatsCard.tsx
│   │   └── ThemeToggle.tsx
│   ├── contexts/        # React Context providers
│   │   └── ThemeContext.tsx
│   ├── data/           # Mock API data (JSON)
│   │   └── courses.json
│   ├── hooks/          # Custom React hooks
│   │   ├── use-mobile.tsx
│   │   ├── use-toast.ts
│   │   └── useIntersectionObserver.tsx
│   ├── lib/           # Utilities
│   │   └── utils.ts
│   ├── pages/         # Route components
│   │   ├── About.tsx
│   │   ├── AncientScripture.tsx
│   │   ├── Community.tsx
│   │   ├── Contact.tsx
│   │   ├── Courses.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   └── Teach.tsx
│   ├── App.tsx        # Main app with routing
│   ├── index.css      # Design system
│   └── main.tsx       # Entry point
├── index.html         # SEO meta tags
├── tailwind.config.ts # Tailwind config
└── vite.config.ts     # Build config
```

## 🎨 Design System

All design tokens are defined in `src/index.css` using CSS variables.

### Color Palette (HSL format)

```css
/* Primary - Saffron */
--primary: 30 100% 60%

/* Secondary - Green */
--secondary: 115 91% 28%

/* Tertiary - Blue */
--tertiary: 210 100% 55%
```

### Typography (Fluid responsive)

```css
--font-size-base: clamp(1rem, 0.9rem + 0.5vw, 1.125rem)
--font-size-5xl: clamp(3rem, 2.25rem + 3vw, 4rem)
```

### Animations

- Intersection Observer for scroll animations
- Smooth transitions with cubic-bezier easing
- Glass morphism effects

## 🛠️ Installation

```bash
npm install     # Install dependencies
npm run dev     # Start dev server
npm run build   # Build for production
```

## 📱 PWA Features

- Offline support via service worker
- Installable on mobile devices
- Optimized for mobile performance
- 192x192 and 512x512 app icons

## ♿ Accessibility

- Semantic HTML5 (`<main>`, `<section>`, `<nav>`)
- ARIA labels and roles
- Keyboard navigation support
- Color contrast ≥ 4.5:1

## 📊 Mock API

Course data in `src/data/courses.json`:

```json
{
  "courses": [...],
  "categories": [...],
  "stats": {...}
}
```

## 🌙 Dark Mode

Toggle via ThemeContext with localStorage persistence.

## Project Links

**Lovable Project**: https://lovable.dev/projects/03275110-ab7e-49ab-904d-31a3dada8f83

## Technologies

- Vite + TypeScript + React
- Shadcn UI + Tailwind CSS
- React Router v6
- Lucide React icons
- Vite PWA Plugin

## Deploy

Click **Publish** in Lovable or run `npm run build` for static hosting.

---

**Made with ❤️ for Atmanirbhar Bharat**
