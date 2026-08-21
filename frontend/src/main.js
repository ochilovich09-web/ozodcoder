import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.js'
import { FavoritesProvider } from './context/FavoritesContext.js'
import { ProgressProvider } from './context/ProgressContext.js'
import { AuthProvider } from './context/AuthContext.js'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <FavoritesProvider>
          <ProgressProvider>
            <App />
          </ProgressProvider>
        </FavoritesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
