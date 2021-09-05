import { IComments } from "../actions/commentsAction";
import { IPosts } from "../actions/postsActions";
import { CommentActionTypes } from "../constants/action-types";

export interface ISelectedPostState {
  selectedPostComments: IComments[];
  postId: string;
  selectedPost: IPosts | null;
  loading: boolean;
}

const selectedPostInitialState = {
  selectedPostComments: [],
  postId: "",
  selectedPost: null,
  loading: true,
};

export const selectedPostReducer = (
  state: ISelectedPostState = selectedPostInitialState,
  { type, payload }: { type: string; payload: any }
) => {
  switch (type) {
    case CommentActionTypes.SET_COMMENTS:
      return {
        ...state,
        selectedPostComments: payload.selectedPostComments,
        postId: payload.postId,
        loading: false,
      };
    case CommentActionTypes.SET_SELECTED_POST:
      return {
        ...state,
        postId: payload.id,
        selectedPost: payload,
        loading: true,
      };
    default:
      return state;
  }
};
