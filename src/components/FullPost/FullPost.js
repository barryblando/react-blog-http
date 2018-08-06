import React, { Component } from "react";
import axios from 'axios';

import classes from "./FullPost.css";

class FullPost extends Component {

  state = {
    loadedPost: null,
  }

  // componentDidUpdate is the right lifeCycle hook if you want to fetch data whenever you receive new props
  componentDidUpdate() {
    const { id } = this.props;
    if (id) {
      // PROBLEM: Stuck on loading & infinite loop requests
      // CAUSE: Updating the state from componentDidUpdate
      // EFFECT: Creates an infinite loop requests
      // HYPOTHESIS: Because when we call setState the component will be updated/re-rendered and componentDidUpdate will execute again
      // FIX & LOGIC: If loadedPost is null or(||) if do have one but the IDs are different, then make request
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== id)) {
        axios.get('/posts/' + id)
        .then(response => {
          this.setState({ loadedPost: response.data });
        })
      }
    }
  }

  deletePostHandler = () => {
    const { id } = this.props;
    axios.delete('/posts/' + id)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    const { id } = this.props;
    const { loadedPost } = this.state;

    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    // if id exist or receive new id
    if (id) {
      // Loading.. 'cause we selected a post but the data isn't there yet
      post = <p style={{ textAlign: 'center' }}>Loading...</p>;
    }

    // if loadedPost has been set then render this jsx code
    if (loadedPost) {
      post = (
        <div className={classes.FullPost}>
          <h1>{loadedPost.title}</h1>
          <p>{loadedPost.body}</p>
          <div className={classes.Edit}>
            <button onClick={this.deletePostHandler} className={classes.Delete}>Delete</button>
          </div>
        </div>
      );
    }
    return post;
  }
}

export default FullPost;
