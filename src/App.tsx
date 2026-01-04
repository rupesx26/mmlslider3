import React from 'react';
import ImageSlider from './slider/ImageSlider';
const App: React.FC = () => (
  <div className="app">
    <h1>Simple React + TypeScript + Sass app</h1>
    <ImageSlider
      slides={[
        {
          id: 1,
          image:
            'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Explore Now',
          link: '#',
        },
        {
          id: 2,
          image:
            'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Explore Now',
          link: '#',
        },
        {
          id: 3,
          image:
            'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=800&q=80',
          buttonText: 'Explore Now',
          link: '#',
        },
      ]}
    />  
  </div>
);

export default App;
