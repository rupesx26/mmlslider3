import React, { useState, useRef } from 'react';
import './ImageSlider.scss'; // SCSS stylesheet with responsive design

export type Slide = {
  id: number;
  image: string;
  buttonText: string;
  link: string;
};

type Props = {
  slides: Slide[];
};

const SWIPE_THRESHOLD = 50; // Minimum swipe distance in pixels

const ImageSlider: React.FC<Props> = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Navigate to previous slide (circular wrapping)
  const goToPrevious = () => {
    setActiveIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  // Navigate to next slide (circular wrapping)
  const goToNext = () => {
    setActiveIndex((i) => (i + 1) % slides.length);
  };

  // Handle touch start event
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  // Handle touch move event
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  // Handle touch end - detect swipe direction and magnitude
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;

    const swipeDistance = touchStartX.current - touchEndX.current;

    // Only trigger slide change if swipe exceeds threshold
    if (Math.abs(swipeDistance) > SWIPE_THRESHOLD) {
      if (swipeDistance > 0) {
        // Swiped left → move to next slide
        goToNext();
      } else {
        // Swiped right → move to previous slide
        goToPrevious();
      }
    }

    // Reset touch tracking
    touchStartX.current = null;
    touchEndX.current = null;
  };

  // Get slide position class based on index relative to active slide
  const getSlideClass = (index: number): string => {
    const prevIndex = (activeIndex - 1 + slides.length) % slides.length;
    const nextIndex = (activeIndex + 1) % slides.length;

    if (index === activeIndex) return 'slide active';
    if (index === prevIndex) return 'slide prev';
    if (index === nextIndex) return 'slide next';
    return 'slide hidden';
  };

  return (
    <div
      className="slider-container"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Image slider"
    >
      {/* Main slider wrapper */}
      <div className="slider">
        {slides.map((slide, index) => (
          <article key={slide.id} className={getSlideClass(index)}>
            {/* Slide image */}
            <img src={slide.image} alt={`Slide ${index + 1}`} />

            {/* CTA button - visible on all slides (prev, active, next) on high resolution, mobile only on active */}
            <a href={slide.link} className="cta" aria-label={slide.buttonText}>
              {slide.buttonText}
            </a>
          </article>
        ))}
      </div>

      {/* Navigation buttons */}
      <button
        className="nav prev"
        onClick={goToPrevious}
        aria-label="Previous slide"
        type="button"
      >
        &#10094;
      </button>

      <button
        className="nav next"
        onClick={goToNext}
        aria-label="Next slide"
        type="button"
      >
        &#10095;
      </button>

      {/* Slide indicators (dots) */}
      <div className="slide-indicators" role="tablist" aria-label="Slide navigation">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
            aria-pressed={index === activeIndex}
            type="button"
            role="tab"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
