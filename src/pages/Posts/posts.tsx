import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import useDebounce from "../../customHooks/debounce.hook";
import { setSelectedPost } from "../../redux/actions/commentsAction";
import {
  getPosts,
  IPosts,
  setCurrentPage,
} from "../../redux/actions/postsActions";
import { IAppState } from "../../redux/reducers";
import style from "./posts.module.scss";

const Posts: React.FC<any> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    currentPagePosts,
    perSize,
    totalPages,
    currentPage,
    allPosts,
    searchText,
    loading,
  } = useSelector((state: IAppState) => state.posts);
  const history = useHistory();

  const dispatch = useDispatch();

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    dispatch(setCurrentPage(1, allPosts, perSize, debouncedSearchTerm));
  }, [debouncedSearchTerm]);

  const changePage = (page: number) => {
    dispatch(setCurrentPage(page, allPosts, perSize, searchText));
  };

  const handleClick = (post: IPosts) => {
    dispatch(setSelectedPost(post));
    history.push(`/comments/${post.id}`);
  };

  const getPages = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <li
          key={`map-${i}`}
          className={`page-item ${i + 1 === currentPage && "active"}`}
          onClick={() => changePage(i + 1)}
        >
          <a className="page-link">{i + 1}</a>
        </li>
      );
    }
    return pages;
  };

  useEffect(() => {
    dispatch(getPosts(perSize, searchText));
    dispatch(setCurrentPage(1, allPosts, perSize, searchText));
    document.title = "My Blog";
  }, []);

  return (
    <React.Fragment>
      <div className="d-flex justify-content-center align-items-center mb-3">
        <input
          type="text"
          className={style.search}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="search by title"
        />
      </div>
      {loading && (
        <div className="text-center">
          <div className="spinner-border text-info" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      {!loading && (
        <React.Fragment>
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {currentPagePosts.map((post) => (
              <div className="col" onClick={() => handleClick(post)}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-title">{post.title}</h5>
                    <p className="card-text">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav className="mt-4" aria-label="...">
            <ul className="pagination justify-content-center">
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => changePage(currentPage - 1)}
              >
                <span className="page-link">Previous</span>
              </li>
              {getPages()}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => changePage(currentPage + 1)}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </nav>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Posts;
