import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import '../css/ModernCarousel.css';
import newsimage from '../images/Newsn.jpg';
import midlaneimage from '../images/midlanem.jpg';

const ModernHeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const carouselItems = [
    {
      id: 1,
      image: newsimage,
      title: "NEWS",
      description: "Description for Event 1.",
      btnText: "Learn More"
    },
    {
      id: 2,
      image: midlaneimage,
      title: "MIDLANE",
      description: "Description for Event 2.",
      btnText: "View Details"
    }
  ];

  const handleSelect = (selectedIndex) => {
    setActiveIndex(selectedIndex);
  };

  return (
    <div className="hero-carousel-container">
      <div className="hero-carousel-progress-wrapper">
        {carouselItems.map((_, index) => (
          <div 
            key={index} 
            className={`hero-carousel-progress-item ${index === activeIndex ? 'hero-progress-active' : ''}`}
            onClick={() => setActiveIndex(index)}
          >
            <div className="hero-progress-bar-inner"></div>
          </div>
        ))}
      </div>

      <Carousel 
        activeIndex={activeIndex}
        onSelect={handleSelect}
        fade={true}
        controls={false}
        indicators={false}
        interval={5000}
        className="hero-modern-carousel"
      >
        {carouselItems.map((item) => (
          <Carousel.Item key={item.id}>
            <div className="hero-carousel-img-wrapper">
              <img className="hero-carousel-img" src={item.image} alt={item.title} />
              <div className="hero-img-overlay"></div>
            </div>
            
            <Carousel.Caption className="hero-carousel-caption">
              <div className="hero-content-box">
                <span className="hero-carousel-featured-tag">Featured</span>
                <h2 className="hero-carousel-heading">{item.title}</h2>
                <p className="hero-carousel-text">{item.description}</p>
                <button className="hero-carousel-cta">
                  {item.btnText}
                  <svg className="hero-arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
                  </svg>
                </button>
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="hero-carousel-controls">
        <button 
          className="hero-nav-btn hero-prev-btn"
          onClick={() => setActiveIndex(activeIndex === 0 ? carouselItems.length - 1 : activeIndex - 1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
          </svg>
        </button>
        <div className="hero-slide-counter">
          <span className="hero-current-slide">{(activeIndex + 1).toString().padStart(2, '0')}</span>
          <span className="hero-counter-separator">/</span>
          <span className="hero-total-slides">{carouselItems.length.toString().padStart(2, '0')}</span>
        </div>
        <button 
          className="hero-nav-btn hero-next-btn"
          onClick={() => setActiveIndex(activeIndex === carouselItems.length - 1 ? 0 : activeIndex + 1)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ModernHeroCarousel;