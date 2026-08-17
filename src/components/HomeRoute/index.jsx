import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import { PulseLoader } from 'react-spinners'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import TopRatedBookItem from '../TopRatedBookItem'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const sliderSettings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const HomeRoute = () => {
  const [topRatedBooks, setTopRatedBooks] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getTopRatedBooks = async () => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
        const updatedData = fetchedData.books.map(eachBook => ({
          id: eachBook.id,
          authorName: eachBook.author_name,
          coverPic: eachBook.cover_pic,
          title: eachBook.title,
        }))
        setTopRatedBooks(updatedData)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getTopRatedBooks()
  }, [])

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <PulseLoader color="#0284c7" size={15} />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent onClickTryAgain={getTopRatedBooks} />
  )

  const renderSuccessView = () => (
    <div className="slider-wrapper">
      <Slider {...sliderSettings}>
        {topRatedBooks.map(book => (
          <TopRatedBookItem
            key={book.id}
            bookData={{
              id: book.id,
              author_name: book.authorName,
              cover_pic: book.coverPic,
              title: book.title,
            }}
          />
        ))}
      </Slider>
    </div>
  )

  const renderTopRatedBooksSection = () => {
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
    <div className="home-route-container">
      <HeaderComponent />
      <main className="home-main-content">
        <div className="home-responsive-container">
          <section className="home-hero-section">
            <h1 className="home-heading">Find Your Next Favorite Books?</h1>
            <p className="home-description">
              You are in the right place. Tell us what titles or genres you’ve
              enjoyed in the past, and we’ll give you surprisingly insightful
              recommendations.
            </p>
            <Link to="/shelf" className="home-find-books-mobile-link">
              <button type="button" className="find-books-btn">
                Find Books
              </button>
            </Link>
          </section>

          <section className="top-rated-books-section">
            <div className="top-rated-header">
              <h2 className="top-rated-heading">Top Rated Books</h2>
              <Link to="/shelf" className="home-find-books-desktop-link">
                <button type="button" className="find-books-btn">
                  Find Books
                </button>
              </Link>
            </div>
            <div className="top-rated-slider-container">
              {renderTopRatedBooksSection()}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default HomeRoute
