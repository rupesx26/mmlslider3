# Image Slider Component - Complete Documentation

## Overview
A fully functional, responsive React image slider component built with TypeScript and SCSS. Features include:
- Smooth slide transitions with transform & transition animations
- Touch/swipe gesture support for mobile
- Responsive design (3 slides on desktop, 1 on mobile)
- CTA buttons on each slide
- Accessible navigation with ARIA labels
- Circular slide progression (wraps from last to first)

---

## Component Architecture

### File Structure
```
src/slider/
  ├── ImageSlider.tsx      # React component (TypeScript)
  └── ImageSlider.scss     # Responsive styles
```

---

## Component Props

```typescript
interface Slide {
  id: number;              // Unique identifier
  image: string;           // Image URL
  buttonText: string;      // CTA button label
  link: string;            // Navigation link (href)
}

type Props = {
  slides: Slide[];         // Array of slides to display
};
```

### Example Usage
```tsx
<ImageSlider
  slides={[
    {
      id: 1,
      image: 'https://example.com/image1.jpg',
      buttonText: 'Learn More',
      link: '/details'
    },
    // ... more slides
  ]}
/>
```

---

## Features & Implementation

### 1. State Management
- **`activeIndex`**: Tracks the currently visible slide
- **`touchStartX` / `touchEndX`**: Refs for touch gesture tracking

### 2. Navigation
- **Arrow Buttons**: Circular navigation (wraps around)
  - Previous: `goToPrevious()`
  - Next: `goToNext()`
- **Dot Indicators**: Click to jump to specific slide

### 3. Touch/Swipe Gestures
- Minimum threshold: 50px swipe distance
- Swipe Left → Next slide
- Swipe Right → Previous slide
- Smooth interaction without interfering with button clicks

### 4. Layout & Styling

#### Desktop (≥768px)
- **Visible Slides**: 3 (previous, active, next)
- **Layout**: Horizontal carousel
- **Side Visibility**: 25% of left & right images visible
- **Scaling**: Active slide at 100%, side slides at 90%
- **Z-Index**: Creates depth effect
- **Navigation**: Subtle, semi-transparent buttons

#### Mobile (<768px)
- **Visible Slides**: 1 (center only)
- **Layout**: Full-width slide
- **Side Visibility**: Hidden completely
- **Navigation**: Prominent, fully opaque buttons
- **Indicators**: Larger dot size for easier tapping

### 5. CTA Buttons
- Position: Absolute, bottom-center of image
- Always contained within slide bounds
- Only visible on active slide
- Responsive padding on small screens
- Hover effects: Scale and background change
- Keyboard accessible with focus states

### 6. Animations
- **Transition Duration**: 0.5s with cubic-bezier easing
- **Properties Animated**: `transform`, `opacity`, `z-index`
- **Performance**: Uses GPU-accelerated transforms only
- **Accessibility**: Respects `prefers-reduced-motion` setting

---

## Responsive Breakpoints

| Breakpoint | Device | Layout | Visible Slides |
|------------|--------|--------|---|
| ≥768px | Desktop/Tablet | 3-column carousel | 3 (25% left, 100% center, 25% right) |
| <768px | Mobile | Full-width | 1 (center) |
| <480px | Small phone | Compact | 1 (tighter spacing) |

---

## Accessibility Features

- ✅ Semantic HTML (`<article>`, `<button>`)
- ✅ ARIA labels on buttons (`aria-label`)
- ✅ Keyboard navigation support (buttons are focusable)
- ✅ Tab order maintained
- ✅ Focus states with visible outline
- ✅ Role attributes for screen readers (`role="tablist"`, `role="tab"`)
- ✅ Respects `prefers-reduced-motion` media query
- ✅ High contrast button styling

---

## CSS Classes & Structure

```html
<div class="slider-container">
  <!-- Main carousel -->
  <div class="slider">
    <article class="slide active">
      <img src="..." alt="..." />
      <a href="..." class="cta">Button Text</a>
    </article>
    <!-- More slides -->
  </div>

  <!-- Navigation controls -->
  <button class="nav prev">&#10094;</button>
  <button class="nav next">&#10095;</button>

  <!-- Slide indicators -->
  <div class="slide-indicators">
    <button class="indicator active"></button>
    <!-- More indicators -->
  </div>
</div>
```

---

## SCSS Variables

```scss
$slider-height: 70vh;
$slider-max-height: 600px;
$container-height: 100vh;
$border-radius: 16px;
$transition-duration: 0.5s;
$ease-function: cubic-bezier(0.4, 0.0, 0.2, 1);
$nav-button-size: 44px;
$cta-button-bg: #fff;
```

---

## Usage Example

```tsx
import ImageSlider, { type Slide } from './slider/ImageSlider';

const App = () => {
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
    // ...
  ];

  return <ImageSlider slides={slides} />;
};
```

---

## Performance Optimizations

- ✅ Uses `transform` and `opacity` for animations (GPU-accelerated)
- ✅ No layout shifts on resize (proper box-sizing)
- ✅ Touch refs prevent unnecessary re-renders
- ✅ Conditional rendering of CTA buttons
- ✅ CSS containment via `perspective` property

---

## Browser Support

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support (iOS 12+)
- Mobile browsers: ✅ Touch events supported

---

## Future Enhancements

- [ ] Keyboard arrow key navigation
- [ ] Auto-play with pause on hover
- [ ] Custom easing functions
- [ ] Lazy loading for images
- [ ] Integration with react-router-dom for navigation
- [ ] Swipe direction indicators (visual feedback)
- [ ] Custom animation speed prop

---

## Troubleshooting

### CTA button hidden
- Ensure slide has `active` class
- Check z-index values in SCSS
- Verify image has proper aspect ratio

### Swipe not working
- Check minimum threshold is met (50px)
- Ensure touch events are enabled (no `pointer-events: none`)
- Test on actual touch device (not just browser emulation)

### Styles not applying
- Verify SCSS file is imported in component
- Check SASS/SCSS loader in webpack config
- Rebuild after CSS changes

---

## Summary

This image slider provides a production-ready, fully accessible carousel component with:
- 💻 Desktop carousel view (3 slides)
- 📱 Mobile single-slide view
- ✋ Touch/swipe gestures
- 🔘 Navigation controls
- ♿ Full accessibility support
- ⚡ Optimized performance
- 🎨 Beautiful, responsive design
