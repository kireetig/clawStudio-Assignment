import axios from "axios";
import { CommentActionTypes } from "../constants/action-types";
import { IPosts } from "./postsActions";

export interface IComments {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const getComments = (postId: string) => {
  return (dispatch: any) => {
    axios
      .get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
      .then((res: any) => {
        const selectedPostComments = res.data;
        console.log(selectedPostComments);
        dispatch(setComments(selectedPostComments, postId));
      });
  };
};

export const setComments = (selectedPostComments: any, postId: string) => {
  return {
    type: CommentActionTypes.SET_COMMENTS,
    payload: {
      postId,
      selectedPostComments,
    },
  };
};

export const setSelectedPost = (post: IPosts) => {
  return {
    type: CommentActionTypes.SET_SELECTED_POST,
    payload: post,
  };
};
