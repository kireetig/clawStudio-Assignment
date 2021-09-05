import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getComments, IComments } from "../../redux/actions/commentsAction";
import { IAppState } from "../../redux/reducers";

const Comments: React.FC<any> = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const { selectedPostComments, selectedPost, loading } = useSelector(
    (state: IAppState) => {
      return state?.comments;
    }
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(id));
    document.title = selectedPost?.title as string;
    if (!selectedPost) {
      history.push("/");
    }
  }, []);

  return (
    <div>
      <h4>Post</h4>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{selectedPost?.title}</h5>
          <p className="card-text">{selectedPost?.body}</p>
        </div>
      </div>
      <h4 className="mt-4">Comments</h4>
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading &&
        selectedPostComments?.map((comment: IComments) => (
          <div className="card mb-4">
            <div className="card-body">
              <div>{comment.body}</div>
              <div className="mt-3">
                <footer className="blockquote-footer text-end">
                  <span>{comment.name}</span>
                  <div>({comment.email})</div>
                </footer>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Comments;
