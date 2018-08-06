import React from "react";

import classes from "./Post.css";

const post = ({ title, author, clicked }) => (
  <article className={classes.Post} onClick={clicked}>
    <h1>{title}</h1>
    <div className={classes.Info}>
      <div className={classes.Author}>{author}</div>
    </div>
  </article>
);

export default post;
