import { CategoryName } from "models/post.interrface";

export const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const options = [
  { id: 1, label: "🌿", value: CategoryName.NATURE },
  { id: 2, label: "🐾", value: CategoryName.ANIMALS },
  { id: 3, label: "🍔", value: CategoryName.FOOD },
  { id: 4, label: "🏛️", value: CategoryName.ARCHITECTURE },
  { id: 5, label: "✈️", value: CategoryName.TRAVEL },
  { id: 6, label: "🎨", value: CategoryName.ART },
  { id: 7, label: "👗", value: CategoryName.FASHION },
  { id: 8, label: "⚽", value: CategoryName.SPORTS },
  { id: 9, label: "💻", value: CategoryName.TECHNOLOGY },
  { id: 10, label: "💼", value: CategoryName.BUSINESS },
  { id: 11, label: "🎵", value: CategoryName.MUSIC },
  { id: 12, label: "📚", value: CategoryName.EDUCATION },
  { id: 13, label: "💪", value: CategoryName.HEALTH },
  { id: 14, label: "👥", value: CategoryName.PEOPLE },
  { id: 15, label: "🚗", value: CategoryName.TRANSPORTATION },
  { id: 16, label: "🚀", value: CategoryName.SPACE },
  { id: 17, label: "🎁", value: CategoryName.HOLIDAY },
];
