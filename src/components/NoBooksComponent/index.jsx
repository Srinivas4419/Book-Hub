import './index.css'

const NoBooksComponent = ({ searchText }) => {
  return (
    <div className="no-books-container">
      <img
        src="/assets/no-books.svg"
        alt="no books"
        className="no-books-image"
      />
      <h1 className="no-books-heading">
        Your search for {searchText} did not find any matches.
      </h1>
      <p className="no-books-description">
        Please try again with a different search term or check for typos.
      </p>
    </div>
  )
}

export default NoBooksComponent
