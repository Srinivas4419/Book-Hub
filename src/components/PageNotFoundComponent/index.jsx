import { Link } from 'react-router-dom'
import './index.css'

const PageNotFoundComponent = () => {
  return (
    <div className="not-found-container">
      <img
        src="/assets/not-found.svg"
        alt="not found"
        className="not-found-image"
      />
      <h1 className="not-found-heading">Page Not Found</h1>
      <p className="not-found-description">
        we are sorry, the page you requested could not be found,Please go back to the homepage.
      </p>
      <Link to="/">
        <button type="button" className="not-found-button">
          Go Back to Home
        </button>
      </Link>
    </div>
  )
}

export default PageNotFoundComponent
