import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { BsExclamationTriangleFill } from 'react-icons/bs'
import './index.css'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showSubmitError, setShowSubmitError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  const navigate = useNavigate()

  const token = Cookies.get('jwt_token')
  if (token !== undefined) {
    return <Navigate to="/" replace />
  }

  const onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, { expires: 30 })
    localStorage.setItem('user_name', username || 'Rahul')
    navigate('/', { replace: true })
  }

  const onSubmitFailure = error => {
    setShowSubmitError(true)
    setErrorMsg(error || 'Username/Password is Wrong')
  }

  const submitForm = async event => {
    event.preventDefault()
    if (username.trim() === '' || password.trim() === '') {
      onSubmitFailure('Username/Password is Wrong')
      return
    }

    const userDetails = { username, password }
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok === true) {
        onSubmitSuccess(data.jwt_token)
      } else {
        onSubmitFailure(data.error_msg || 'Username/Password is Wrong')
      }
    } catch (e) {
      onSubmitFailure('Username/Password is Wrong')
    }
  }

  return (
    <div className="login-page-container">
      {/* Mobile website login illustration */}
      <img
        src="/assets/login-img.svg"
        alt="website login"
        className="login-page-mobile-image"
      />
      {/* Desktop website login illustration */}
      <img
        src="/assets/login-img.svg"
        alt="website login"
        className="login-page-desktop-image"
      />

      <div className="login-form-wrapper">
        <form className="login-form" onSubmit={submitForm}>
          <div className="login-logo-container">
            <img
              src="/assets/website-logo.svg"
              alt="login website logo"
              className="login-website-logo"
            />
          </div>

          <div className="input-field-container">
            <label className="input-label" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input-field"
              value={username}
              onChange={e => {
                setUsername(e.target.value)
                if (showSubmitError) setShowSubmitError(false)
              }}
              placeholder="Username"
            />
          </div>

          <div className="input-field-container">
            <label className="input-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={e => {
                setPassword(e.target.value)
                if (showSubmitError) setShowSubmitError(false)
              }}
              placeholder="Password"
            />
          </div>

          {showSubmitError && (
            <div className="error-caution-container">
              <BsExclamationTriangleFill className="caution-icon" />
              <p className="error-message">*{errorMsg}</p>
            </div>
          )}

          <button type="submit" className="login-submit-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginPage
