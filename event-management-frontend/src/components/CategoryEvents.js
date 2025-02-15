import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CategoryEvents.css";

const categories = [
  { name: "Concerts", key: "concert", image: "concert.png" },
  { name: "Workshops", key: "workshop", image: "workshop.jpg" },
  { name: "Seminars", key: "seminar", image: "seminar.jpg" },
  { name: "Sports", key: "sports", image: "sports.jpg" },
];

const CategorySection = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryKey) => {
    navigate(`/allevents?category=${categoryKey}`);
  };

  return (
    <div className="category-section">
      <h2 className="category-title">Event Categories</h2>
      <div className="category-container">
        {categories.map((category) => (
          <div
            key={category.key}
            className="category-card"
            onClick={() => handleCategoryClick(category.key)}
          >
            <img
              src={`/images/${category.image}`}
              alt={category.name}
              className="category-image"
            />
            <div className="category-name">{category.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
