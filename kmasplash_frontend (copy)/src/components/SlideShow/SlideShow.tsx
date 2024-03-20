import React, { ReactNode } from "react";
import { Avatar, Carousel } from "antd";
import * as imgs from "assets/images/images";

interface SlideShowProps {
  images?: any[];
  children?: any;
}

const tempImages = [
  "https://images.pexels.com/photos/1402787/pexels-photo-1402787.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb",
  "https://images.pexels.com/photos/15286/pexels-photo.jpg",
  "https://images.pexels.com/photos/1486976/pexels-photo-1486976.jpeg?auto=compress&cs=tinysrgb",
];

const SlideShow: React.FC<SlideShowProps> = (props) => {
  const { images = tempImages, children } = props;

  return (
    <Carousel autoplay>
      {images.map((image, idx) => {
        return (
          <div className="w-full h-[580px] md:h-[520px] xs:h-[480px]" key={idx}>
            <img
              className="w-full h-full object-cover"
              src={image}
              loading="lazy"
            />
          </div>
        );
      })}
    </Carousel>
  );
};

export default SlideShow;
