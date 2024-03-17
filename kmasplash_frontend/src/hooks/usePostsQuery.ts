import {
  postsAdapter,
  postsSelector,
  useGetAllPostsQuery,
  useGetPostByCategoryQuery,
} from "redux/api/postApi";

export const usePostsQuery = ({
  category,
  page = 1,
}: {
  category?: string;
  page: number;
}) => {
  if (category) {
    const { data: postsCategory, refetch: refreshCategory } =
      useGetPostByCategoryQuery({
        category: category,
      });
    if (category) {
      return { data: postsCategory, refetch: refreshCategory };
    }
  }
  const { data: posts, refetch } = useGetAllPostsQuery(
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

  return { data: posts, refetch };
};
