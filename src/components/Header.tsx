import React from "react";

const Header: React.FC<any> = (props) => {
  return (
    <nav className="navbar navbar-light fixed-top bg-primary">
      <div className="container-fluid">
        <span className="navbar-brand mb-0 h1">My Blogs</span>
      </div>
    </nav>
  );
};

export default Header;
