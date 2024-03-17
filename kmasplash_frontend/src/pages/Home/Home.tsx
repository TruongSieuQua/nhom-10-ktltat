import { Typography } from "antd";
import images from "assets/images/images";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import SearchInput from "components/SearchInput/SearchInput";
import SlideShow from "components/SlideShow/SlideShow";
import MainLayout from "layout/MainLayout";
import Lottie from "lottie-react";

import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  postsAdapter,
  postsSelector,
  useGetAllPostsQuery,
} from "redux/api/postApi";
interface IHomeProps {
  id?: any;
}

const Home: React.FunctionComponent<IHomeProps> = (props) => {
  const [page, setPage] = React.useState(1);
  const { data, refetch } = useGetAllPostsQuery(
    {
      page,
    },
    {
      selectFromResult: ({ data, ...otherParams }) => {
        return {
          data: postsSelector.selectAll(data ?? postsAdapter.getInitialState()),
          ...otherParams,
        };
      },
    },
  );

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
      {data && (
        <InfiniteScroll
          dataLength={data?.length || 0} //This is important field to render the next data
          next={() => {
            setPage((page) => page + 1);
          }}
          hasMore={true}
          loader={
            <Lottie animationData={images.catLoading} className="w-36 h-36 " />
          }
          refreshFunction={refetch}
          pullDownToRefresh
          pullDownToRefreshThreshold={50}
        >
          <PinterestLayout data={data || []} />
        </InfiniteScroll>
      )}
    </MainLayout>
  );
};

export default Home;
