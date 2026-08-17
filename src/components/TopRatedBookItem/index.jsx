import { Link } from 'react-router-dom'
import './index.css'

const TopRatedBookItem = ({ bookData }) => {
  const { id, author_name, cover_pic, title } = bookData

  return (
    <div className="top-rated-book-card" data-testid="bookItem">
      <Link to={`/books/${id}`} className="top-rated-book-link">
        <img
          src={cover_pic}
          alt={title}
          className="top-rated-book-cover"
        />
        <h1 className="top-rated-book-title">{title}</h1>
        <p className="top-rated-book-author">{author_name}</p>
      </Link>
    </div>
  )
}

export default TopRatedBookItem
