import './index.css'

const CommentItem = props => {
  const {comments, OnChangeStatusLike, onDeleteCommentList} = props
  const {name, comment, initialColor, id, isLike} = comments
  const nameInitial = name.slice(0, 1)
  const imgClassName = isLike
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const buttonClassName = isLike ? 'likebutton' : 'nolikebutton'

  const onIsLike = () => {
    OnChangeStatusLike(id)
  }

  const deletingListItem = () => {
    onDeleteCommentList(id)
  }

  return (
    <li className="main-comments-container">
      <div className="comment-container">
        <p className={initialColor}>{nameInitial}</p>
        <div className="name-and-comment">
          <p className="name">
            {name} <span>Less than a minute ago</span>
          </p>
          <p className="comment">{comment}</p>
        </div>
      </div>
      <div className="like-delete-button">
        <div className="likes-button">
          <img src={imgClassName} alt="like" className={imgClassName} />
          <button type="button" onClick={onIsLike} className={buttonClassName}>
            Like
          </button>
        </div>
        <div>
          <button type="button" data-testid="delete" onClick={deletingListItem}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
              alt="delete"
            />
          </button>
        </div>
      </div>
    </li>
  )
}

export default CommentItem
