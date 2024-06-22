import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import CommentItem from '../CommentItem'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {
    comments: [],
    searchInput: '',
    commentInput: '',
    count: 0,
  }

  onGiveCommentName = event => {
    this.setState({searchInput: event.target.value})
  }

  onGiveCommentDt = event => {
    this.setState({commentInput: event.target.value})
  }

  onAddComment = event => {
    event.preventDefault()
    const {searchInput, commentInput} = this.state
    if (searchInput === '' || commentInput === '') {
      this.setState({
        errorMsg:
          searchInput === '' && commentInput === ''
            ? 'Please Enter Values'
            : '',
        nameErrorMsg: searchInput === '' ? 'Please Enter Your Name' : '',
        commentErrorMsg: commentInput === '' ? 'Please Enter Your Comment' : '',
      })
    } else {
      const randomNum = Math.ceil(
        Math.random() * (initialContainerBackgroundClassNames.length - 1),
      )
      const color = initialContainerBackgroundClassNames[randomNum]
      const newComment = {
        id: uuidv4(),
        name: searchInput,
        comment: commentInput,
        initialColor: color,
        isLike: false,
      }
      this.setState(prevState => ({
        errorMsg: '',
        nameErrorMsg: '',
        commentErrorMsg: '',
        count: prevState.count + 1,
        comments: [...prevState.comments, newComment],
        searchInput: '',
        commentInput: '',
      }))
    }
  }

  OnChangeStatusLike = id => {
    this.setState(prevState => ({
      comments: prevState.comments.map(eachObj => {
        if (eachObj.id === id) {
          return {...eachObj, isLike: !eachObj.isLike}
        }
        return eachObj
      }),
    }))
  }

  onDeleteCommentList = id => {
    this.setState(prevState => {
      const newCommetList = prevState.comments.filter(
        eachObj => eachObj.id !== id,
      )
      return {
        comments: newCommetList,
        count: prevState.count - 1,
      }
    })
  }

  render() {
    const {
      searchInput,
      commentInput,
      comments,
      count,
      errorMsg,
      nameErrorMsg,
      commentErrorMsg,
    } = this.state

    return (
      <div className="main-container">
        <h1>Comments</h1>
        <div className="content-container">
          <form className="input-container" onSubmit={this.onAddComment}>
            <p>Say Something about 4.0 Technologies</p>
            {nameErrorMsg && <p className="errormsg">{nameErrorMsg}</p>}
            <input
              id="commentInput"
              type="text"
              placeholder="Your Name"
              value={searchInput}
              onChange={this.onGiveCommentName}
            />
            {commentErrorMsg && <p className="errormsg">{commentErrorMsg}</p>}
            <textarea
              cols="30"
              rows="10"
              placeholder="Your Comment"
              value={commentInput}
              onChange={this.onGiveCommentDt}
            >
              textarea
            </textarea>
            <div>
              <button type="submit">Add Comment</button>
            </div>
            <div>{errorMsg && <p className="errormsg">{errorMsg}</p>}</div>
          </form>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
            />
          </div>
        </div>
        <hr />
        <p className="count">
          <span>{count}</span> Comments
        </p>
        <div>
          <ul>
            {comments.map(eachObj => (
              <CommentItem
                comments={eachObj}
                key={eachObj.id}
                OnChangeStatusLike={this.OnChangeStatusLike}
                onDeleteCommentList={this.onDeleteCommentList}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Comments
