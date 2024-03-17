import ImageCardCommon from "components/ImageCard/ImageCard";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import MansoryList from "components/MansoryList/MansoryList";
import { PhotosProps } from "models/commom.interface";
import * as React from "react";
import { useGetUserPostsQuery } from "redux/api/postApi";

const Photos: React.FunctionComponent<PhotosProps> = ({ userId }) => {
  const { data } = useGetUserPostsQuery(userId);

  return <PinterestLayout data={data || []} />;
};

export default Photos;
