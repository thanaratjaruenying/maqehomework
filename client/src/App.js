import React, { Component } from 'react';
import PostsComponent from './components/PostsComponent';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      authors: [],
    };
  }

  componentDidMount() {
    fetch('/posts')
      .then(res => res.json())
      .then(res => this.setState({posts: res}));
    fetch('/authors')
      .then(res => res.json())
      .then(res => this.setState({authors: res}));
  }

  render() {
    return (
      <div className="App">
        <h1>MAQE Forums</h1>
        <h2>Subtitle</h2>
        <h4>Posts</h4>
        <PostsComponent 
          {...this.state}
        />
      </div>
    );
  }
}

export default App;
