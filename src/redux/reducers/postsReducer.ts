import { IPosts } from "../actions/postsActions";
import { ActionTypes } from "../constants/action-types";

export interface IPostsState {
  allPosts: IPosts[];
  perSize: number;
  currentPage: number;
  currentPagePosts: IPosts[];
  totalPages: number;
  searchText: string;
  loading: boolean;
}

const postsintialState: IPostsState = {
  allPosts: [],
  perSize: 9,
  currentPage: 1,
  currentPagePosts: [],
  totalPages: 1,
  searchText: "",
  loading: true,
};

export const postsReducer = (
  state: IPostsState = postsintialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case ActionTypes.GET_POSTS:
      return { ...state, allPosts: payload };
    case ActionTypes.SET_PAGE:
      return {
        ...state,
        currentPagePosts: payload.posts,
        currentPage: payload.page,
        totalPages: payload.totalPages,
        searchText: payload.searchText,
        loading: false,
      };
    default:
      return state;
  }
};
