# Luxury Black & Gold Portfolio 🎨✨

A premium, cinematic interactive portfolio website redesigned with cutting-edge luxury aesthetics and advanced animations.

## 🎨 Design Philosophy

This portfolio has been completely redesigned into a **luxury, cinematic Black & Gold theme** with:

- **Color Scheme**: Deep matte black (#0B0B0B) with metallic gold (#FFD700)
- **Typography**: Cinematic Playfair Display for headings, clean Inter for body
- **Depth & Layering**: Glassmorphic cards, shadows, and layered UI elements
- **Premium Interactions**: Smooth scroll animations, hover effects, micro-interactions

## ✨ Key Features

### 🖱 Custom Gold Cursor
- Magnetic hover effect on buttons
- Ripple effect on click
- Glow animation on movement
- Touch device detection (disabled on mobile)

### 🧭 Navigation
- Floating navbar with gold underline animation
- Transparent glass effect on scroll
- Smooth anchor scrolling
- Mobile-responsive hamburger menu

### 🦸 Hero Section
- Full-screen cinematic layout
- Animated name with gold shimmer gradient
- 3D card profile with tilt effect
- Quick stats cards
- Dual CTA buttons (Primary: gold filled, Secondary: gold outline)

### 🎨 About Section
- Glassmorphic cards for highlights
- Smooth hover animations
- Grid layout with descriptions
- Icon indicators for each highlight

### 🚀 Projects Section
- Interactive 3D-style cards
- Hover → lift + gold shadow
- Spotlight effect on mouse move
- Click → modal popup with:
  - Project details and description
  - Tech stack display
  - GitHub & Live demo links
  - Category badges

### 🛠 Skills Section
- Animated skill indicators
- Grouped by category (Programming, Frontend, etc.)
- Hover glow effects
- Smooth reveal animations

### 📬 Contact Section
- Floating label inputs with smooth animation
- Gold focus & validation
- Glassmorphic form design
- Social media links with icon buttons
- Email integration via EmailJS

### 🤖 Portfolio Chatbot
- AI-powered Q&A interface
- Black glass panel with gold accents
- Responsive chat UI
- Typing indicators
- Quick answers about skills, projects, and contact

## 🔧 Technology Stack

- **Frontend**: React 19 + Vite
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion + Three.js
- **3D Graphics**: React Three Fiber
- **Icons**: React SVG
- **Email**: EmailJS
- **Typography**: Playfair Display + Inter

## 📦 Project Structure

```
src/
├── components/
│   ├── Button.jsx (reusable button components)
│   ├── CustomCursor.jsx (luxury gold cursor)
│   ├── Chatbot.jsx (AI assistant)
│   ├── Layout.jsx (main layout wrapper)
│   ├── Nav.jsx (navigation bar)
│   ├── SectionReveal.jsx (scroll animations)
│   ├── Scene3D.jsx (3D scenes)
│   └── ...other components
├── sections/
│   ├── Hero.jsx (hero section)
│   ├── About.jsx (about section)
│   ├── Skills.jsx (skills section)
│   ├── Projects.jsx (projects showcase)
│   ├── Experience.jsx (timeline)
│   └── Contact.jsx (contact form)
├── data/
│   └── portfolio.js (portfolio content & chatbot answers)
├── hooks/
│   ├── useMediaQuery.js
│   └── useReducedMotion.js
├── App.jsx (main app)
├── index.css (global styles)
└── main.jsx (entry point)
```

## 🎯 Animations & Effects

### Scroll Animations
- Fade-in on scroll (from bottom/sides)
- Scale animations
- Staggered children animations
- Progress bar animations

### Hover Effects
- Glow animations
- Scale-up transitions
- Gradient shifts
- Shadow depth changes
- Spotlight effects (projects)

### Micro-interactions
- Button ripples on click
- Floating labels on input focus
- Typing indicators
- Message animations
- Smooth rotations

## 🎬 Color Palette

```css
--primary: #FFD700 (Metallic Gold)
--primary-dark: #D4AF37 (Dark Gold)
--primary-light: #FFF8DC (Light Gold)
--bg-dark: #0B0B0B (Deep Black)
--bg-surface: #1A1A1A (Surface Black)
--bg-card: #0F0F0F (Card Black)
--text-primary: #FFFFFF (White)
--text-secondary: #B0B0B0 (Light Gray)
--text-tertiary: #808080 (Medium Gray)
```

## 🚀 Performance Optimizations

- Lazy loading on images
- Optimized animations with GPU acceleration
- Reduced motion detection for accessibility
- Touch device cursor detection
- Efficient scroll listeners
- Component code splitting

## ♿ Accessibility

- Proper heading hierarchy
- ARIA labels on buttons
- Keyboard navigation support
- Reduced motion support
- Color contrast compliance
- Semantic HTML structure

## 🌐 Responsive Design

- Mobile-first approach
- Tablet & desktop optimized
- Flexible grid layouts
- Responsive typography
- Touch-friendly buttons (min 48px)
- Mobile hamburger menu

## 📚 Text Effects

### Typography Hierarchy
- **H1**: 6rem (desktop) with gold shimmer gradient
- **H2**: 5rem with gold underline
- **H3**: 2rem for subsections
- **Body**: 1rem Inter for readability

### Text Shadows
- Gold glow effect on headings
- Subtle shadows on dark backgrounds
- Hover text-shadow transitions

## 🎨 Component Showcase

### Buttons
```jsx
// Primary - Gold filled
<a href="#" className="btn-primary">View Project</a>

// Secondary - Gold outline
<a href="#" className="btn-secondary">Learn More</a>

// Glass - Transparent with border
<a href="#" className="btn-glass">Connect</a>
```

### Cards
```jsx
// All components use base card class
<div className="card">Content here</div>
```

### Tags
```jsx
<span className="tag-primary">React</span>
<span className="tag-secondary">Design</span>
```

## 🔐 Environment Variables

For EmailJS integration, add to `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

4. **Preview production build**
   ```bash
   npm run preview
   ```

## 📖 Customization Guide

### Change Colors
Edit `tailwind.config.js` in the `extend.colors` section:

```javascript
colors: {
  gold: {
    primary: "#FFD700", // Change this
    // ... other golds
  },
  black: {
    dark: "#0B0B0B", // Change this
    // ... other blacks
  }
}
```

### Add/Edit Animations
Update `@keyframes` in `index.css`:

```css
@keyframes customAnimation {
  0% { /* start */ }
  50% { /* middle */ }
  100% { /* end */ }
}
```

### Update Portfolio Data
Edit `src/data/portfolio.js`:

```javascript
export const projects = [
  {
    id: "project-1",
    title: "Project Title",
    // ... project details
  }
]
```

## 🎯 Design Tokens

All design values are centralized:

- **Spacing**: Tailwind multiples of 4px
- **Border Radius**: `rounded-card` (16px), `rounded-lg` (12px)
- **Shadows**: Gold, elevation, glow variants
- **Transitions**: 0.2s-0.8s with cubic-bezier easing
- **Z-index**: Organized layers (cursor: 9999, chat: 50, etc.)

## 📱 Mobile Considerations

- Touch gestures for navigation
- No hover effects on mobile
- Optimized tap targets
- Responsive text sizes
- Mobile menu animation
- Simplified animations on lower-end devices

## 🔍 Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📋 Browser Feature Requirements

- CSS Grid & Flexbox
- CSS Variables
- CSS Backdrop Filter
- SVG support
- ES6+ JavaScript
- Intersection Observer API

## 🎬 Animation Performance Tips

1. Use `will-change` sparingly
2. Prefer `transform` and `opacity` changes
3. Use GPU acceleration with 3D transforms
4. Reduce particle count on mobile
5. Disable animations in reduced-motion mode

## 📄 License

This project and design are created for Mohamed Nafeez S's premium portfolio.

## 🙏 Credits

- **Design**: Luxury Black & Gold theme with cinematic aesthetics
- **Animations**: Framer Motion + GSAP
- **3D**: Three.js & React Three Fiber
- **Fonts**: Playfair Display, Inter from Google Fonts
- **Icons**: Custom SVG components

---

**Version**: 2.0 - Luxury Redesign  
**Last Updated**: February 25, 2026  
**Status**: Production Ready ✨
