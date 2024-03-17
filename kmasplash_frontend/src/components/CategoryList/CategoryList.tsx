import React from "react";

import { Menu, Typography } from "antd";
import { useNavigate } from "react-router";
import Lottie from "lottie-react";
import images from "assets/images/images";

interface CategoryListProps {
  id?: string;
}
const categories = [
  { id: 1, name: "Nature", icon: "🌿" },
  { id: 2, name: "Animals", icon: "🐾" },
  { id: 3, name: "Food", icon: "🍔" },
  { id: 4, name: "Architecture", icon: "🏛️" },
  { id: 5, name: "Travel", icon: "✈️" },
  { id: 6, name: "Art", icon: "🎨" },
  { id: 7, name: "Fashion", icon: "👗" },
  { id: 8, name: "Sports", icon: "⚽" },
  { id: 9, name: "Technology", icon: "💻" },
  { id: 10, name: "Business", icon: "💼" },
  { id: 11, name: "Music", icon: "🎵" },
  { id: 12, name: "Education", icon: "📚" },
  { id: 13, name: "Health", icon: "💪" },
  { id: 14, name: "People", icon: "👥" },
  { id: 15, name: "Transportation", icon: "🚗" },
  { id: 16, name: "Space", icon: "🚀" },
  { id: 17, name: "Holiday", icon: "🎁" },
];
const CategoryList: React.FC<CategoryListProps> = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = React.useState(
    window.location.pathname.slice(1),
  );
  const handleCategoryClick = (category: string) => {
    navigate(`/${category}`);
    setSelectedCategory(category);
  };

  return (
    <div className="category-list antialiased">
      <Menu mode="horizontal" className="justify-center">
        {categories.map((category) => (
          <Menu.Item
            key={category.name}
            className="flex-row"
            icon={category.icon}
            onClick={() => {
              handleCategoryClick(category.name);
            }}
          >
            <Typography.Text
              className="ml-1 text-md"
              style={
                selectedCategory === category.name
                  ? { color: "#1890ff", fontWeight: "800" }
                  : { fontWeight: "500" }
              }
            >
              {category.name}
            </Typography.Text>
          </Menu.Item>
        ))}
      </Menu>
    </div>
  );
};

export default CategoryList;
