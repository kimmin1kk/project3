import React from "react";
import { Link } from "react-router-dom";

function PageNotFound(props) {
  return (
    <div>
      <h1> 잘못된 접근입니다.</h1>
      <Link to="/">
        <span> 돌아가기 </span>
      </Link>
    </div>
  );
}

export default PageNotFound;
