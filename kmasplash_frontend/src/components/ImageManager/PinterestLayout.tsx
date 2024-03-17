import ImageCardCommon from "components/ImageCard/ImageCard";
import { Post } from "models/post.interrface";
import React from "react";
import { trackWindowScroll } from "react-lazy-load-image-component";
import Lottie from "lottie-react";

import Masonry from "react-masonry-css";
import images from "assets/images/images";
import { Col, Typography } from "antd";
const breakpointColumnsObj = {
  default: 4,
  1100: 3,
  700: 2,
  500: 1,
};
const PinterestLayout: React.FunctionComponent<any> = ({
  data = [],
  scrollPosition,
}) => {
  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex justify-center"
    >
      {data.length > 0 ? (
        data?.map((item: Post) => (
          <ImageCardCommon
            value={item}
            key={item._id}
            scrollPosition={scrollPosition}
          />
        ))
      ) : (
        <Col>
          <Lottie
            animationData={images.emptycat}
            className="w-128 h-128 justify-center items-center"
          />
          <Typography.Text
            className="mb-2 text-xl text-center"
            style={{
              display: "block",
            }}
          >
            No related post images found.
          </Typography.Text>
          <Typography.Text
            style={{
              display: "block",
            }}
            className="text-gray-500 text-xl text-center"
          >
            Please upload more for the next time!
          </Typography.Text>
        </Col>
      )}
    </Masonry>
  );
};
export default trackWindowScroll(PinterestLayout);
