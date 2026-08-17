import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { IoMenu, IoClose } from 'react-icons/io5'
import './index.css'

const HeaderComponent = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = location.pathname
  const rawUserName = localStorage.getItem('user_name') || 'Rahul'
  const userName = rawUserName.charAt(0).toUpperCase() + rawUserName.slice(1)

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    localStorage.removeItem('user_name')
    navigate('/login', { replace: true })
  }

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState)
  }

  return (
    <nav className="header-navbar">
      <div className="header-container">
        <Link to="/" className="header-logo-link">
          <img
            src="/assets/website-logo.svg"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>

        {/* Desktop Nav Items */}
        <ul className="header-desktop-nav-items">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link ${currentPath === '/' ? 'active-nav-link' : ''}`}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/shelf"
              className={`nav-link ${
                currentPath === '/shelf' ? 'active-nav-link' : ''
              }`}
            >
              Bookshelves
            </Link>
          </li>
          <li className="nav-item">
            <button
              type="button"
              className="header-logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </li>
          <li className="nav-item">
            <div className="header-profile-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
                alt="profile"
                className="header-profile-pic"
              />
              <span className="header-profile-name">{userName}</span>
            </div>
          </li>
        </ul>

        {/* Mobile View Right Bar (Profile + Hamburger) */}
        <div className="header-mobile-right-container">
          <div className="header-profile-container mobile-profile">
            <img
              src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
              alt="profile"
              className="header-profile-pic"
            />
          </div>
          <button
            type="button"
            className="header-mobile-menu-btn"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <IoMenu className="header-menu-icon" />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="header-mobile-nav-container">
          <ul className="header-mobile-nav-items">
            <li className="mobile-nav-item mobile-user-info">
              <img
                src="https://assets.ccbp.in/frontend/react-js/male-avatar-img.png"
                alt="profile"
                className="header-profile-pic"
              />
              <span className="header-profile-name">{userName}</span>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/"
                className={`mobile-nav-link ${
                  currentPath === '/' ? 'active-nav-link' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="mobile-nav-item">
              <Link
                to="/shelf"
                className={`mobile-nav-link ${
                  currentPath === '/shelf' ? 'active-nav-link' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Bookshelves
              </Link>
            </li>
            <li className="mobile-nav-item">
              <button
                type="button"
                className="header-logout-btn"
                onClick={onClickLogout}
              >
                Logout
              </button>
            </li>
            <li className="mobile-nav-item close-item">
              <button
                type="button"
                className="header-mobile-close-btn"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Close Menu"
              >
                <IoClose className="header-close-icon" />
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  )
}

export default HeaderComponent
