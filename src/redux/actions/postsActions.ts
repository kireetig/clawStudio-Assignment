import axios from "axios";
import { ActionTypes } from "../constants/action-types";

export interface IPosts {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export const getPosts = (pageSize: number, searchText: string) => {
  return (dispatch: any) => {
    axios.get("https://jsonplaceholder.typicode.com/posts").then((res: any) => {
      const posts = res.data;
      dispatch(setPosts(posts));
      dispatch(setCurrentPage(1, posts, pageSize, searchText));
    });
  };
};

const setPosts = (posts: IPosts[]) => {
  return {
    type: ActionTypes.GET_POSTS,
    payload: posts,
  };
};

export const setCurrentPage = (
  pageNumber: number,
  posts: IPosts[],
  pageSize: number,
  searchText: string
) => {
  const filteredPosts = posts.filter((p) => p.title.includes(searchText));
  const currentPosts = filteredPosts.slice(
    (pageNumber - 1) * pageSize,
    pageNumber * pageSize
  );
  const totalPages = Math.ceil(filteredPosts.length / pageSize);
  return {
    type: ActionTypes.SET_PAGE,
    payload: {
      posts: currentPosts,
      page: pageNumber,
      totalPages: totalPages,
      searchText: searchText,
    },
  };
};
