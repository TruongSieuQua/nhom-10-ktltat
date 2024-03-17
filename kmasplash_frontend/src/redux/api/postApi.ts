import {
  Comment,
  PostEntity,
  PostUpdate,
} from "./../../models/post.interrface";

import {
  Category,
  CreatePost,
  Post,
  UploadResponse,
} from "models/post.interrface";
import { baseApi } from "services/baseApi";
import { createEntityAdapter } from "@reduxjs/toolkit";

const createPost = "post";
const getUserPost = "post/user";
const uploadImage = "media/upload";
const getCategories = "category";
const searchPost = "post/search";
const like = "/like";
const comment = "/comment";

export const postsAdapter = createEntityAdapter({
  selectId: (item: Post) => item._id,
});

export const postsSearchAdapter = createEntityAdapter({
  selectId: (item: Post) => item._id,
});
export const postsSearchSelector = postsAdapter.getSelectors();

export const postsSelector = postsAdapter.getSelectors();
export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation<Post, CreatePost>({
      query: (body) => ({
        url: createPost,
        method: "POST",
        body,
      }),

      invalidatesTags: ["Posts"],
    }),
    uploadImage: builder.mutation<UploadResponse, any>({
      query: (body) => {
        return {
          url: uploadImage,
          method: "POST",
          body,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        url: getCategories,
      }),
    }),
    getPostById: builder.query<Post, any>({
      query: (postId) => ({
        url: createPost + "/" + postId,
      }),
      providesTags: ["Posts"],
    }),
    getAllPosts: builder.query<
      PostEntity,
      {
        page: number;
      }
    >({
      query: ({ page = 1 }) => ({
        url: createPost + `?page=${page}&limit=10`,
      }),
      transformResponse: (response: { posts: Post[] }, meta): any => {
        return postsAdapter.addMany(
          postsAdapter.getInitialState(),
          response.posts,
        );
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return currentArg?.page !== previousArg?.page;
      },
      serializeQueryArgs: ({ endpointName }) => {
        return endpointName;
      },

      merge: (currentState, incomingState) => {
        postsAdapter.addMany(
          currentState,
          postsSelector.selectAll(incomingState),
        );
      },
      providesTags: ["Posts"],
    }),
    getPostByCategory: builder.query<
      Post[],
      {
        category?: string;
      }
    >({
      query: ({ category }) => ({
        url: createPost + `?category=${category}`,
      }),
      transformResponse: (response: { posts: Post[] }, meta): any => {
        return response.posts;
      },
      providesTags: ["Posts"],
    }),
    getUserPosts: builder.query<Post[], any>({
      query: (userId: string) => ({
        url: getUserPost + "/" + userId,
      }),
      transformResponse: (response: { posts: Post[] }, meta): any => {
        return response.posts;
      },
      providesTags: ["Posts"],
    }),
    updatePost: builder.mutation<Post, PostUpdate>({
      query: ({
        postId,
        method,
        body,
      }: {
        postId: string;
        method: "PATCH" | "DELETE";
        body?: CreatePost;
      }) => ({
        url: createPost + "/" + postId,
        method: method,
        body: body,
      }),
      onCacheEntryAdded({ postId, method, body }, { dispatch }) {
        if (method === "DELETE") {
          dispatch(
            postApi.util.updateQueryData(
              "getAllPosts",
              { page: 1 },
              (draft) => {
                postsAdapter.removeOne(draft, postId);
              },
            ),
          );
        } else if (body && method === "PATCH") {
          dispatch(
            postApi.util.updateQueryData(
              "getAllPosts",
              { page: 1 },
              (draft) => {
                postsAdapter.updateOne(draft, {
                  id: postId,
                  changes: {
                    ...draft.entities[postId],
                    ...body,
                  },
                });
              },
            ),
          );
        }
      },
      invalidatesTags: ["Posts"],
    }),
    likePost: builder.mutation<Post, any>({
      query: ({ postId }: { postId: string }) => ({
        url: createPost + "/" + postId + like,
        method: "POST",
      }),
      invalidatesTags: ["Posts"],
    }),
    commentPost: builder.mutation<
      Post,
      {
        postId: string;
        body: Pick<Comment, "comment">;
      }
    >({
      query: ({
        postId,
        body,
      }: {
        postId: string;
        body: Pick<Comment, "comment">;
      }) => ({
        url: createPost + "/" + postId + comment,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Posts"],
    }),
    getPostSearch: builder.query<
      PostEntity,
      {
        page: number;
        search: string;
      }
    >({
      query: ({ page = 1, search }) => ({
        url: searchPost + `?page=${page}&limit=10&keyword=${search}`,
      }),

      transformResponse: (response: { posts: Post[] }, meta): any => {
        return postsSearchAdapter.addMany(
          postsSearchAdapter.getInitialState(),
          response.posts,
        );
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.search !== previousArg?.search
        );
      },
      serializeQueryArgs: ({ endpointName, ...args }) => {
        return endpointName + ":" + args.queryArgs.search;
      },

      merge: (currentState, incomingState) => {
        postsSearchAdapter.addMany(
          currentState,
          postsSearchSelector.selectAll(incomingState),
        );
      },
      providesTags: ["Posts"],
    }),
  }),

  overrideExisting: true,
});

export const {
  useUploadImageMutation,
  useGetCategoriesQuery,
  useCreatePostMutation,
  useGetPostByCategoryQuery,
  useGetAllPostsQuery,
  useGetUserPostsQuery,
  useUpdatePostMutation,
  useLikePostMutation,
  useCommentPostMutation,
  useGetPostByIdQuery,
  useGetPostSearchQuery,
} = postApi;
