import React, { Component, Fragment } from 'react';
import { Route } from 'react-router-dom';


// ACCESS AXIOS INSTANCE for this Component Only
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';

import classes from './Posts.css';

class Posts extends Component {

  state = {
    posts: [],
    error: false,
  }

  // (MOUNTING PHASE)
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
        console.log(error);
        this.setState({ error: true });
      });
  }

  postSelectedHandler = id => {
    const { history, match } = this.props;

    history.push({ pathname: match.url + '/' + id });
  };

  render() {
    const { posts } = this.state;
    const { match } = this.props;

    let postsData = <p style={{ textAlign: 'center' }}>Something went wrong.</p>

    // if error is false, then...
    if (!this.state.error) {
      postsData = posts.map(post => {
        return (
            <Post
              key={post.id}
              title={post.title}
              author={post.author}
              clicked={() => this.postSelectedHandler(post.id)}
            />
        );
      });
    }

    return (
      <Fragment>
        <section className={classes.Posts}>
          {postsData}
        </section>
        {/* create dynamic nested route, render component under postsData */}
        <Route path={match.url + '/:id'} component={FullPost} exact />
      </Fragment>
    );
  }
}

export default Posts;