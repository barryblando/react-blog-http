import React from "react";
// import { withRouter } from 'react-router-dom';

import classes from "./Post.css";

const post = props => {
  const { title, author, clicked } = props;
  // console.log(props);
  return (
    <article className={classes.Post} onClick={clicked}>
      <h1>{title}</h1>
      <div className={classes.Info}>
        <div className={classes.Author}>{author}</div>
      </div>
    </article>
  );
};

// accessing route props from Posts using withRouter HOC
// export default withRouter(post);

export default post;
