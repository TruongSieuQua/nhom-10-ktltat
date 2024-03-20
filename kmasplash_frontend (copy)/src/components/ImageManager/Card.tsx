import {
  AppstoreOutlined,
  CameraOutlined,
  CloseCircleOutlined,
  EditOutlined,
  FullscreenOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import CollectionAdd from "pages/Collection/CollectionAdd";
import PostDetail from "pages/Post/PostDetail";
import { postDetailRef } from "Provider/GlobalUiContainer";
import React, { useRef, useState } from "react";

function Card(props: { size: "small" | "medium" | "large" }) {
  const [isHover, setIsHover] = useState(false);

  return (
    <div
      style={{
        ...styles.card,
        ...styles[props.size],
        position: "relative",
      }}
      onMouseOver={() => {
        setIsHover(true);
      }}
      onMouseLeave={() => {
        setIsHover(false);
      }}
    >
      {isHover && (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-25">
          <div className="absolute top-4 left-4">
            <Button
              type="primary"
              icon={<FullscreenOutlined />}
              onClick={() => {
                postDetailRef.current.show();
              }}
            >
              View
            </Button>
          </div>
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button type="primary" icon={<HeartOutlined />} />

            <Button type="primary" icon={<CameraOutlined />} />
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    margin: "15px 10px",
    padding: 0,
    borderRadius: "16px",
    backgroundColor: "red",
    overflow: "hidden",
  },
  small: {
    gridRowEnd: "span 26",
  },
  medium: {
    gridRowEnd: "span 33",
  },
  large: {
    gridRowEnd: "span 45",
  },
};

export default Card;
