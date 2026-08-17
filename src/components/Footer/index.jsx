import { FaGoogle, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa'
import './index.css'

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-icons-container">
        <button
          type="button"
          className="footer-icon-btn"
          aria-label="Google"
        >
          <FaGoogle className="footer-social-icon" />
        </button>
        <button
          type="button"
          className="footer-icon-btn"
          aria-label="Twitter"
        >
          <FaTwitter className="footer-social-icon" />
        </button>
        <button
          type="button"
          className="footer-icon-btn"
          aria-label="Instagram"
        >
          <FaInstagram className="footer-social-icon" />
        </button>
        <button
          type="button"
          className="footer-icon-btn"
          aria-label="Youtube"
        >
          <FaYoutube className="footer-social-icon" />
        </button>
      </div>
      <p className="footer-contact-us">Contact Us</p>
    </footer>
  )
}

export default Footer
