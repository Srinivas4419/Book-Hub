import { Link } from 'react-router-dom'
import { BsFillStarFill } from 'react-icons/bs'
import './index.css'

const SearchResultsComponent = ({ bookDetails }) => {
  const { id, title, read_status, rating, author_name, cover_pic } = bookDetails

  return (
    <li className="search-result-book-item" data-testid="bookItem">
      <Link to={`/books/${id}`} className="search-result-book-link">
        <img
          src={cover_pic}
          alt={title}
          className="search-result-book-cover"
        />
        <div className="search-result-book-info">
          <h1 className="search-result-book-title">{title}</h1>
          <p className="search-result-book-author">{author_name}</p>
          <div className="search-result-rating-container">
            <span className="search-result-avg-rating-text">Avg Rating</span>
            <BsFillStarFill className="search-result-star-icon" />
            <span className="search-result-rating-val">{rating}</span>
          </div>
          <p className="search-result-status-text">
            Status: <span className="search-result-status-highlight">{read_status}</span>
          </p>
        </div>
      </Link>
    </li>
  )
}

export default SearchResultsComponent
