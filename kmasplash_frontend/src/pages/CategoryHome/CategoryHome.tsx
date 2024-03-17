import { Typography } from "antd";
import images from "assets/images/images";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import CommonFullLoading from "components/Loading/Loading";
import SearchInput from "components/SearchInput/SearchInput";
import SlideShow from "components/SlideShow/SlideShow";
import { usePostsQuery } from "hooks/usePostsQuery";
import MainLayout from "layout/MainLayout";
import Lottie from "lottie-react";

import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useParams } from "react-router";
import { useGetPostByCategoryQuery } from "redux/api/postApi";
interface ICategoryHomeProps {
  id?: any;
}

const CategoryHome: React.FunctionComponent<ICategoryHomeProps> = (props) => {
  const params = useParams();
  const { data, refetch } = useGetPostByCategoryQuery({
    category: params?.category,
  });
  return (
    <MainLayout>
      <div className="w-full h-[580px] md:h-[520px] xs:h-[480px] bg-center  flex justify-center items-center relative">
        <div className="w-full h-full absolute top-0 left-0">
          <SlideShow />
        </div>

        <div className=" self-center flex-1 max-w-xl max-sm:px-5 z-10">
          <Typography className="text-white font-bold text-5xl">
            Kma Splash
          </Typography>
          <Typography className="text-white font-normal w-80 text-lg my-5">
            The internet’s source for visuals. Powered by creators everywhere.
          </Typography>
          <SearchInput
            className={
              "w-full p-2 rounded px-5 text-lg py-3 border-[#eee] border max-sm:hidden"
            }
          />
        </div>
      </div>

      <PinterestLayout data={data || []} />
    </MainLayout>
  );
};

export default CategoryHome;
