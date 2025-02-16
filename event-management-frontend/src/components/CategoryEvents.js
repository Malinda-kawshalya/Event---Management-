import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/CategoryEvents.css";

const categories = [
  { name: "Concert", key: "concert", image: "concert.png", bgColor: "#AED2FF" },
  { name: "Workshop", key: "workshop", image: "workshop.png", bgColor: "#FFFFFF" },
  { name: "Seminar", key: "seminar", image: "seminar.png", bgColor: "#D8C0FF" },
  { name: "Sports", key: "sports", image: "sports.png", bgColor: "#C5E3FF" },
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
            style={{ backgroundColor: category.bgColor }}
            onClick={() => handleCategoryClick(category.key)}
          >
            <div className="category-label">{category.name}</div>
            <img
              src={`/images/${category.image}`}
              alt={category.name}
              className="category-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
