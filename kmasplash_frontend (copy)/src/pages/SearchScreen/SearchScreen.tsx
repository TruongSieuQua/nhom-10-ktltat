import images from "assets/images/images";
import PinterestLayout from "components/ImageManager/PinterestLayout";
import MainLayout from "layout/MainLayout";
import Lottie from "lottie-react";

import * as React from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  postsSearchAdapter,
  postsSearchSelector,
  useGetPostSearchQuery,
} from "redux/api/postApi";
interface ISearchScreenProps {
  id?: any;
}

const SearchScreen: React.FunctionComponent<ISearchScreenProps> = (props) => {
  const [page, setPage] = React.useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("q");
  const navigate = useNavigate();
  const { data, refetch, isError } = useGetPostSearchQuery(
    {
      page,
      search: keyword || "",
    },
    {
      selectFromResult: ({ data, ...otherParams }) => {
        return {
          data: postsSearchSelector.selectAll(
            data ?? postsSearchAdapter.getInitialState(),
          ),
          ...otherParams,
        };
      },
      refetchOnMountOrArgChange: true,
    },
  );
  if (keyword === undefined || keyword?.length === 0 || isError) {
    navigate("/notFound");
  }

  return (
    <MainLayout key={keyword}>
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

export default SearchScreen;
