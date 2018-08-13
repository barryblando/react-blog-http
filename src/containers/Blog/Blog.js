import React , { Component } from "react";
import { Switch, NavLink, Route, Redirect } from 'react-router-dom';

// import axios from '../../axios';
import Posts from './Posts/Posts';
// import NewPost from './NewPost/NewPost';

import asyncComponent from '../../hoc/asyncComponent';

import classes from "./Blog.css";

const AsyncNewPost = asyncComponent(() => {
  return import('./NewPost/NewPost');
})

class Blog extends Component {
  state = {
    authenticated: true,
  };

  render() {
    return (
      <div className={classes.Blog}>
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName={classes.active}>Posts</NavLink>
              </li>
              <li>
                <NavLink to={{
                  pathname: '/new-post',
                  hash: '#submit',
                  search: '?quick-submit=true'
                }}>New Post</NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          { this.state.authenticated ? <Route path="/new-post" component={AsyncNewPost} /> : <Redirect from="/new-post" to="/posts" /> }
          <Route path="/posts" component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default Blog;
