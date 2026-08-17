import { useState, useEffect } from 'react'
import Cookies from 'js-cookie'
import { BsSearch } from 'react-icons/bs'
import { PulseLoader } from 'react-spinners'

import HeaderComponent from '../HeaderComponent'
import Footer from '../Footer'
import SearchResultsComponent from '../SearchResultsComponent'
import SomethingWentWrongComponent from '../SomethingWentWrongComponent'
import NoBooksComponent from '../NoBooksComponent'
import './index.css'

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-6632c816b221',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: 'd1262d63-2643-4e0a-abb5-baa9de297387',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const BookShelvesRoute = () => {
  const [activeShelf, setActiveShelf] = useState(bookshelvesList[0].value)
  const [activeShelfLabel, setActiveShelfLabel] = useState(
    bookshelvesList[0].label
  )
  const [searchInput, setSearchInput] = useState('')
  const [searchText, setSearchText] = useState('')
  const [booksList, setBooksList] = useState([])
  const [apiStatus, setApiStatus] = useState(apiStatusConstants.initial)

  const getBooksList = async (shelf = activeShelf, search = searchText) => {
    setApiStatus(apiStatusConstants.inProgress)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${shelf}&search=${search}`
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
        setBooksList(fetchedData.books)
        setApiStatus(apiStatusConstants.success)
      } else {
        setApiStatus(apiStatusConstants.failure)
      }
    } catch (error) {
      setApiStatus(apiStatusConstants.failure)
    }
  }

  useEffect(() => {
    getBooksList(activeShelf, searchText)
  }, [activeShelf, searchText])

  const onClickShelfTab = shelfItem => {
    setActiveShelf(shelfItem.value)
    setActiveShelfLabel(shelfItem.label)
  }

  const onChangeSearchInput = event => {
    setSearchInput(event.target.value)
  }

  const onClickSearch = () => {
    setSearchText(searchInput)
  }

  const onKeyDownSearch = event => {
    if (event.key === 'Enter') {
      setSearchText(searchInput)
    }
  }

  const renderLoaderView = () => (
    <div className="loader-container" data-testid="loader">
      <PulseLoader color="#0284c7" size={15} />
    </div>
  )

  const renderFailureView = () => (
    <SomethingWentWrongComponent
      onClickTryAgain={() => getBooksList(activeShelf, searchText)}
    />
  )

  const renderSuccessView = () => {
    if (booksList.length === 0) {
      return <NoBooksComponent searchText={searchText} />
    }
    return (
      <ul className="books-list-container">
        {booksList.map(eachBook => (
          <SearchResultsComponent key={eachBook.id} bookDetails={eachBook} />
        ))}
      </ul>
    )
  }

  const renderBooksSection = () => {
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
    <div className="bookshelves-route-container">
      <HeaderComponent />
      <main className="bookshelves-main-content">
        <div className="bookshelves-responsive-container">
          {/* Mobile Search Bar */}
          <div className="mobile-search-bar-container">
            <input
              type="search"
              className="shelf-search-input"
              placeholder="Search"
              value={searchInput}
              onChange={onChangeSearchInput}
              onKeyDown={onKeyDownSearch}
            />
            <button
              type="button"
              className="shelf-search-btn"
              data-testid="searchButton"
              onClick={onClickSearch}
              aria-label="Search"
            >
              <BsSearch className="shelf-search-icon" />
            </button>
          </div>

          {/* Left Sidebar: Bookshelves */}
          <aside className="bookshelves-sidebar">
            <h1 className="bookshelves-sidebar-heading">Bookshelves</h1>
            <ul className="bookshelves-list">
              {bookshelvesList.map(eachShelf => {
                const isActive = activeShelf === eachShelf.value
                const activeBtnClass = isActive ? 'active-shelf-btn' : ''
                return (
                  <li key={eachShelf.id} className="shelf-item">
                    <button
                      type="button"
                      className={`shelf-btn ${activeBtnClass}`}
                      onClick={() => onClickShelfTab(eachShelf)}
                    >
                      {eachShelf.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Right Section: Content */}
          <section className="bookshelves-content-section">
            <div className="shelf-content-header">
              <h1 className="shelf-heading">{activeShelfLabel} Books</h1>
              {/* Desktop Search Bar */}
              <div className="desktop-search-bar-container">
                <input
                  type="search"
                  className="shelf-search-input"
                  placeholder="Search"
                  value={searchInput}
                  onChange={onChangeSearchInput}
                  onKeyDown={onKeyDownSearch}
                />
                <button
                  type="button"
                  className="shelf-search-btn"
                  data-testid="searchButton"
                  onClick={onClickSearch}
                  aria-label="Search"
                >
                  <BsSearch className="shelf-search-icon" />
                </button>
              </div>
            </div>

            <div className="bookshelves-results-container">
              {renderBooksSection()}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default BookShelvesRoute
