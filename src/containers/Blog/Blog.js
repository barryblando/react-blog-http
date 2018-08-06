import React, { Component } from "react";

// ACCESS AXIOS INSTANCE for Blog Component Only
import axios from '../../axios';

import Post from "../../components/Post/Post";
import FullPost from "../../components/FullPost/FullPost";
import NewPost from "../../components/NewPost/NewPost";
import classes from "./Blog.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  }

  componentDidMount() {
    axios.get('/posts')
      .then(response => {
        // fetch only 4 posts using slice
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max', // add new property
          }
        })
        this.setState({ posts: updatedPosts });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    this.setState({ selectedPostId: id });
  };

  render() {
    const { posts } = this.state;

    let postsData = <p style={{ textAlign: 'center' }}>Something went wrong.</p>

    // if error is false, then...
    if (!this.state.error) {
      postsData = posts.map(post => {
        return (<Post
                  key={post.id}
                  title={post.title}
                  author={post.author}
                  clicked={() => this.postSelectedHandler(post.id)}
                />);
      });
    }

    return (
      <div>
        <section className={classes.Posts}>
          {postsData}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId}/>
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
