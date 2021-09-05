import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import Header from "./components/Header";
import Posts from "./pages/Posts/posts";
import Comments from "./pages/Comments/Comments";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Header />
      <div className="container p-4 body">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Posts} />
            <Route path="/comments/:id" component={Comments} />
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
