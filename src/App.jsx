import { Routes, Route } from 'react-router-dom'
import LoginPage from './components/LoginPage'
import HomeRoute from './components/HomeRoute'
import BookShelvesRoute from './components/BookShelvesRoute'
import BookItemDetails from './components/BookItemDetails'
import PageNotFoundComponent from './components/PageNotFoundComponent'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomeRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/shelf"
        element={
          <ProtectedRoute>
            <BookShelvesRoute />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookItemDetails />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFoundComponent />} />
    </Routes>
  )
}

export default App
