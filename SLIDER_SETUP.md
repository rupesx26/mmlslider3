# Image Slider - Setup & Running Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm start

# Build for production
npm run build
```

---

## What's Implemented

### ✅ Component Features

1. **State Management**
   - Active slide index managed with `useState`
   - Circular navigation (wraps from last to first slide)

2. **Layout & Visual Design**
   - **Desktop/Tablet (≥768px)**: Shows 3 slides simultaneously
     - Active slide centered at 100% scale
     - Previous slide on left (25% visible) at 90% scale
     - Next slide on right (25% visible) at 90% scale
   - **Mobile (<768px)**: Shows 1 slide only, completely hides side images
   - Z-index layering creates depth effect

3. **Navigation Controls**
   - Left/Right arrow buttons (circular navigation)
   - Dot indicators (click to jump to slide)
   - Arrow buttons prominent on mobile, subtle on desktop
   - All buttons are fully accessible with ARIA labels

4. **Touch/Swipe Support**
   - Gesture detection with `onTouchStart`, `onTouchMove`, `onTouchEnd`
   - Minimum 50px swipe threshold prevents accidental slides
   - Swipe left → next slide
   - Swipe right → previous slide

5. **CTA Buttons**
   - Positioned at bottom center of each slide
   - Only visible on active slide
   - Always within slide bounds (responsive padding)
   - Uses standard anchor links (`<a href="">`)
   - Smooth hover effects with scaling

6. **Responsive Behavior**
   - Flexbox-based layout
   - No hardcoded widths (uses %, vw, max-width)
   - Responsive font sizes and padding
   - Prevents layout shifts on resize
   - Supports all screen sizes: phones (320px+), tablets, desktops

7. **Animations & Performance**
   - GPU-accelerated transforms only
   - 0.5s smooth transitions with cubic-bezier easing
   - Respects `prefers-reduced-motion` setting
   - Optimized re-renders using refs for touch tracking

8. **Accessibility**
   - Semantic HTML (`<article>`, `<button>`)
   - ARIA labels on all buttons
   - Keyboard navigation support
   - Focus states with visible outlines
   - Screen reader friendly

---

## File Structure

```
swipslider/
├── package.json
├── tsconfig.json
├── babel.config.json
├── webpack.config.js
├── public/
│   └── index.html
├── src/
│   ├── index.tsx
│   ├── App.tsx
│   ├── styles.scss
│   ├── global.d.ts
│   └── slider/
│       ├── ImageSlider.tsx      # Main component
│       └── ImageSlider.scss     # Responsive styles
├── dist/                         # Build output (generated)
├── node_modules/               # Dependencies (generated)
├── .gitignore
├── README.md
└── SLIDER_DOCUMENTATION.md
```

---

## Component Usage

### Basic Example

```tsx
import ImageSlider, { type Slide } from './slider/ImageSlider';

const slides: Slide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    buttonText: 'Explore Mountains',
    link: '/mountains'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e',
    buttonText: 'Discover Beaches',
    link: '/beaches'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1494526585095-c41746248156',
    buttonText: 'Experience Forests',
    link: '/forests'
  }
];

export default function App() {
  return <ImageSlider slides={slides} />;
}
```

---

## Responsive Breakpoints

### Desktop (≥768px)
```
[◄ 25% LEFT] [◄►◄► 100% CENTER ◄►◄►] [25% RIGHT ►]
```
- 3 visible slides
- Side images partially visible (25% each)
- Subtle navigation buttons
- Hover effects on arrows

### Mobile (<768px)
```
[      ◄► 100% CENTER ◄►      ]
[  ◄ button    |    button ►  ]
```
- 1 visible slide (full width)
- No side image visibility
- Prominent navigation buttons on top
- Larger dot indicators

---

## Touch Gesture Behavior

| Gesture | Direction | Action |
|---------|-----------|--------|
| Swipe Left | ← | Next slide |
| Swipe Right | → | Previous slide |
| Tap Arrow | N/A | Navigate to adjacent slide |
| Tap Dot | N/A | Jump to specific slide |
| Short swipe | Any | No action (below 50px threshold) |

---

## CSS Class Names

```scss
.slider-container      // Main container (full viewport)
.slider               // Carousel wrapper
.slide                // Individual slide
  .slide.active       // Currently visible slide
  .slide.prev         // Previous slide (left)
  .slide.next         // Next slide (right)
  .slide.hidden       // Off-screen slides
.cta                  // CTA button
.nav                  // Navigation arrow button
  .nav.prev           // Previous button
  .nav.next           // Next button
.slide-indicators     // Dot indicator container
.indicator            // Individual dot
  .indicator.active   // Current slide indicator
```

---

## Configuration Files

### `webpack.config.js`
- Development: Inline source maps, style-loader
- Production: Extracted CSS with hash filenames, source maps
- Dev server: Port 3000, auto-open, history API fallback

### `babel.config.json`
- Preset: ES2019, React (auto JSX), TypeScript

### `tsconfig.json`
- Target: ES2019
- Module: ESNext
- Strict mode enabled
- No emit (Babel handles transpilation)

---

## Development

### Watch Mode
```bash
npm start
```
Starts webpack dev server with hot reload at `http://localhost:3000`

### Building Production
```bash
npm run build
```
Creates optimized bundle in `dist/` folder

---

## Browser Support

| Browser | Version | Support |
|---------|---------|---------|
| Chrome | Latest | ✅ Full |
| Firefox | Latest | ✅ Full |
| Safari | Latest | ✅ Full |
| Edge | Latest | ✅ Full |
| Mobile Safari | iOS 12+ | ✅ Full |
| Chrome Mobile | Latest | ✅ Full |

---

## Performance Notes

- **Animations**: GPU-accelerated (transform & opacity only)
- **Image Optimization**: Load images from CDN or optimize locally
- **Code Splitting**: Currently single bundle (can be enhanced with webpack split chunks)
- **Bundle Size**: ~50KB (React + ReactDOM included)

---

## Known Limitations & Future Improvements

### Current Limitations
- No keyboard arrow key support (arrows only clickable)
- No auto-play feature
- No image lazy loading
- Only horizontal swipes (vertical swipes ignored)

### Potential Enhancements
- [ ] Auto-play with configurable delay
- [ ] Keyboard navigation (←/→ arrows)
- [ ] Lazy load images on scroll
- [ ] Custom transition duration prop
- [ ] Swipe velocity-based sliding
- [ ] Integration with Next.js Image component
- [ ] Configurable scale/opacity values

---

## Troubleshooting

### Issue: Swipe not working on mobile
**Solution**: 
- Test on real device (emulation may have limitations)
- Ensure `onTouchStart`, `onTouchMove`, `onTouchEnd` are firing
- Check minimum threshold (50px)

### Issue: CTA button not visible
**Solution**:
- Button only shows on active slide
- Check CSS specificity for `.slide.active`
- Verify image has loaded

### Issue: Styles not compiling
**Solution**:
- Check SCSS syntax (arithmetic not allowed in media queries)
- Verify sass-loader in webpack config
- Rebuild after changes: `npm start`

### Issue: TypeScript errors
**Solution**:
- Ensure `src/global.d.ts` is present
- Run `npm install` to update types
- Check `tsconfig.json` includes `src/`

---

## Support & Questions

For issues or questions about the slider component, refer to:
1. `SLIDER_DOCUMENTATION.md` - Complete technical docs
2. `src/slider/ImageSlider.tsx` - Component code with comments
3. `src/slider/ImageSlider.scss` - SCSS with detailed comments

---

**Happy Sliding! 🎉**
