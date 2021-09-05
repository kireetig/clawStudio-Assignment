import { combineReducers } from "redux";
import { ISelectedPostState, selectedPostReducer } from "./commentsReducer";
import { IPostsState, postsReducer } from "./postsReducer";

export interface IAppState {
  posts: IPostsState;
  comments: ISelectedPostState;
}

const rootReducer = combineReducers({
  posts: postsReducer,
  comments: selectedPostReducer,
});

export default rootReducer;
