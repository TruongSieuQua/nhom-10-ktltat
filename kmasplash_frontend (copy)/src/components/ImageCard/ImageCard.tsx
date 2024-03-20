import {
  DownloadOutlined,
  FullscreenOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Image } from "antd";
import CommonButton from "components/Button/CommonButton";
import { Post } from "models/post.interrface";
import CollectionAdd from "pages/Collection/CollectionAdd";
import { postDetailRef } from "Provider/GlobalUiContainer";
import React, { useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
const ImageCardCommon: React.FC<{
  value: Post;
  scrollPosition: any;
}> = ({ value, scrollPosition }) => {
  const { _id, fileName, URL } = value;
  const collectionRef = useRef<any>();
  return (
    <>
      <div key={_id} className="rounded-lg m-5">
        <div className="relative group">
          <LazyLoadImage
            src={URL || fileName}
            alt={value.title}
            scrollPosition={scrollPosition}
            effect="blur"
            className="rounded-lg w-full h-full object-cover"
          />
          <div
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                postDetailRef.current?.show(value);
              }
            }}
            className="absolute top-0 rounded-lg left-0 w-full h-full bg-black overflow-hidden opacity-0 bg-opacity-20 transition-opacity duration-100 group-hover:opacity-100 group"
          >
            <div className="absolute -top-12 left-4 transform transition-transform duration-300 group-hover:translate-y-16">
              <CommonButton
                type="primary"
                size="large"
                className="bg-black bg-opacity-50"
                style={{ lineHeight: 0 }}
                title="View"
                icon={<FullscreenOutlined />}
                onClick={() => {
                  postDetailRef.current?.show(value);
                }}
              />
            </div>
            <div className="absolute top-4 -right-12 flex flex-col gap-2 transform transition-transform duration-300 group-hover:-translate-x-16">
              <CommonButton
                type="primary"
                size="large"
                className="bg-black bg-opacity-50"
                style={{ lineHeight: 0 }}
                icon={<HeartOutlined />}
              />
              <CommonButton
                type="primary"
                size="large"
                className="bg-black bg-opacity-50"
                style={{ lineHeight: 0 }}
                icon={<DownloadOutlined />}
                onClick={() => {
                  postDetailRef.current.downloadImage(URL, fileName);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <CollectionAdd ref={collectionRef} />
    </>
  );
};

export default ImageCardCommon;
