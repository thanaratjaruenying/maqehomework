import React, { Component } from 'react';
import './Posts.css';
import {Image, Pager} from 'react-bootstrap';
import moment from 'moment';

function chunkArray(myArray, chunk_size){
  const results = [];
  while (myArray.length) {
      results.push(myArray.splice(0, chunk_size));
  }
  return results;
}

class PostsComponent extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      newPosts: [],
      currentPosts: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    const {posts} = nextProps;

    if (posts.length > 0 && this.props !== nextProps) {
      const postsPerPage = 6;
      let newPosts = [...posts];
      newPosts = chunkArray(newPosts, postsPerPage);
      this.setState({
        newPosts,
        currentPosts: newPosts[this.state.page - 1]
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {page, newPosts} = this.state;
    if (page !== prevState.page) {
      this.setState({currentPosts: newPosts[page - 1]});
    }
  }

  _getPosts() {
    const {currentPosts} = this.state;
    const {authors} = this.props;
    if (currentPosts.length < 0) { return []; }

    return currentPosts.map(post => {
      const {id, author_id, body, created_at, image_url, title} = post;
      const time = moment(created_at).fromNow();
      const author = authors.find(a => a.id === author_id);
      let authorInfo;
      if (author) {
        const {avatar_url, name, place, role} = author;
        authorInfo = (
          <div key='author' className='authorInfo'>
            <Image src={avatar_url} circle responsive />
            <p>{name}</p>
            <p>{role}</p>
            <p>{place}</p>
          </div>
        );
      }
      
      return (
        <div key={id} className='Post'>
          <div key='imgInfo' className='imgInfo'>
            <Image src={image_url} responsive />
          </div>
          <div key='body' className='postInfo'>
            <p>{title}</p>
            <p>{body}</p>
            <p>{time}</p>
          </div>
          {authorInfo}
        </div>
      );
    });
  }

  _onNext() {
    const {page, newPosts} = this.state;
    const newPage = page + 1;
    if (newPage <= newPosts.length) {
      this.setState({page: newPage});
    }
  }

  _onPrev() {
    const {page} = this.state;
    const newPage = page - 1;
    if (newPage >= 1) {
      this.setState({page: newPage});
    }
  }

  render() {
    const {newPosts} = this.state;
    const postsList = this._getPosts();
    const pagers = newPosts.map((value, index) => {
      return (
        <Pager.Item key={`paper-${index}`} onClick={() => this.setState({page: index + 1})}>
          {index + 1}
        </Pager.Item>
      );
    });

    return (
      <div key='posts' className='MainPost'>
        {postsList}
        <Pager>
          <Pager.Item onClick={() => this._onPrev()}>Previous</Pager.Item>
          {pagers}
          <Pager.Item onClick={() => this._onNext()}>Next</Pager.Item>
        </Pager>
      </div>
    );
  }
}

export default PostsComponent;