import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsFillStarFill } from 'react-icons/bs'
import { PulseLoader } from 'react-spinners'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookItemDetails = () => {
  const [bookDetails, setBookDetails] = useState({})
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)
  const { id } = useParams()

  const getBookDetails = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      if (response.ok === true) {
        const fetchedData = await response.json()
        const data = fetchedData.book_details
        const updatedData = {
          id: data.id,
          authorName: data.author_name,
          coverPic: data.cover_pic,
          aboutBook: data.about_book,
          rating: data.rating,
          readStatus: data.read_status,
          title: data.title,
          aboutAuthor: data.about_author,
        }
        setBookDetails(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getBookDetails()
  }, [id])

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <PulseLoader color="#0284c7" size={15} />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent onClickTryAgain={getBookDetails} />
  )

  const renderSuccessView = () => {
    const {
      authorName,
      coverPic,
      aboutBook,
      rating,
      readStatus,
      title,
      aboutAuthor,
    } = bookDetails

    return (
      <div className="book-details-card">
        <div className="book-details-top-section">
          <img src={coverPic} alt={title} className="book-details-cover-img" />
          <div className="book-details-info">
            <h1 className="book-details-title">{title}</h1>
            <p className="book-details-author">{authorName}</p>
            <div className="book-details-rating-container">
              <span className="book-details-avg-rating-text">Avg Rating</span>
              <BsFillStarFill className="book-details-star-icon" />
              <span className="book-details-rating-val">{rating}</span>
            </div>
            <p className="book-details-status-text">
              Status: <span className="book-details-status-highlight">{readStatus}</span>
            </p>
          </div>
        </div>

        <hr className="book-details-hr" />

        <div className="book-details-section">
          <h1 className="book-details-section-heading">About Author</h1>
          <p className="book-details-section-desc">{aboutAuthor}</p>
        </div>

        <div className="book-details-section">
          <h1 className="book-details-section-heading">About Book</h1>
          <p className="book-details-section-desc">{aboutBook}</p>
        </div>
      </div>
    )
  }

  const renderBookDetailsSection = () => {
    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return renderLoaderView()
      case apiStatusConstants.success:
        return renderSuccessView()
      case apiStatusConstants.failure:
        return renderFailureView()
      default:
        return null
    }
  }

  return (
    <div className="book-details-route-container">
      <HeaderComponent />
      <main className="book-details-main-content">
        <div className="book-details-responsive-container">
          {renderBookDetailsSection()}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BookItemDetails
