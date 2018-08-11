import React, { Component } from "react";
import axios from 'axios';

import classes from "./FullPost.css";

class FullPost extends Component {

  state = {
    loadedPost: null,
  }

  // (CREATION HOOK) didMount 'cause FullPost Component has been separated from parent Blog Component,
  // it will be rendered by Route under Parent Posts
  componentDidMount() {
    this.loadData();
  }

  // (UPDATING HOOK) didUpdate if you want to fetch data whenever you receive new props
  // & component is rendered by parent component
  componentDidUpdate() {
    this.loadData();
  }

  loadData = () => {
    // destruct route params id
    const { match: { params: { id } } } = this.props;
    if (id) {
      // PROBLEM: Stuck on loading & infinite loop requests
      // CAUSE: Updating the state from componentDidUpdate
      // EFFECT: Creates an infinite loop requests
      // HYPOTHESIS: Because when we call setState the component will be updated/re-rendered and componentDidUpdate will execute again
      // FIX & LOGIC: If loadedPost is null or(||) if do have one but the IDs are different, then make request, convert id to int trick using '+'
      if (!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !== +id)) {
        axios.get('/posts/' + id)
        .then(response => {
          this.setState({ loadedPost: response.data });
        })
      }
    }
  }

  deletePostHandler = () => {
    const { match } = this.props;
    axios.delete('/posts/' + match.params.id)
      .then(response => {
        console.log(response);
      });
  }

  render() {
    console.log(this.props);
    const { match } = this.props;
    const { loadedPost } = this.state;

    let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;

    // if id exist or receive new id
    if (match.params.id) {
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
