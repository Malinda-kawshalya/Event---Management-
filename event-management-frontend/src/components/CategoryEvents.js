import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CategoryEvents.css";

const categories = [
  { name: "Concert", key: "concert", image: "concert.png", icon: "🎵" },
  { name: "Workshop", key: "workshop", image: "workshop.png", icon: "🛠️" },
  { name: "Seminar", key: "seminar", image: "seminar.png", icon: "🎓" },
  { name: "Sports", key: "sports", image: "sports.png", icon: "🏆" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryKey) => {
    navigate(`/allevents?category=${categoryKey}`);
  };

  return (
    <div className="category-section">
      <div className="category-content">
        <h2 className="category-titl">
          <span className="highlight">Explore</span> Event Categories
        </h2>
        <p className="category-subtitle">Find the perfect events for your interests</p>
        
        <div className="category-container">
          {categories.map((category) => (
            <div
              key={category.key}
              className="category-card"
              onClick={() => handleCategoryClick(category.key)}
            >
              <div className="category-icon">{category.icon}</div>
              <div className="category-image-container">
                <img
                  src={`/images/${category.image}`}
                  alt={category.name}
                  className="category-image"
                />
              </div>
              <div className="category-details">
                <h3 className="category-name">{category.name}</h3>
                <div className="category-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#e6e606"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;